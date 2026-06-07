import { useDialog } from "@tui/ui/dialog"
import { DialogSelect, type DialogSelectRef } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useSync } from "@tui/context/sync"
import { createEffect, createMemo, createResource, createSignal, onMount, type JSX } from "solid-js"
import { Locale } from "@/util/locale"
import { useProject } from "@tui/context/project"
import { useTheme } from "../context/theme"
import { useSDK } from "../context/sdk"
import { useLocal } from "../context/local"
import { Flag } from "@opencode-ai/core/flag/flag"
import { DialogSessionRename } from "./dialog-session-rename"
import { createDebouncedSignal } from "../util/signal"
import { useToast } from "../ui/toast"
import { openWorkspaceSelect, type WorkspaceSelection, warpWorkspaceSession } from "./dialog-workspace-create"
import { Spinner } from "./spinner"
import { errorMessage } from "@/util/error"
import { DialogSessionDeleteFailed } from "./dialog-session-delete-failed"
import { WorkspaceLabel } from "./workspace-label"
import { useCommandShortcut } from "../keymap"
import { useKV } from "../context/kv"

export function DialogSessionList(props: { initialSessionID?: string } = {}) {
  const dialog = useDialog()
  const route = useRoute()
  const sync = useSync()
  const project = useProject()
  const { theme } = useTheme()
  const sdk = useSDK()
  const local = useLocal()
  const toast = useToast()
  const kv = useKV()
  const [toDelete, setToDelete] = createSignal<string>()
  const [search, setSearch] = createDebouncedSignal("", 150)
  const [selectRef, setSelectRef] = createSignal<DialogSelectRef<string>>()
  const deleteHint = useCommandShortcut("session.delete")
  const quickSwitch1 = useCommandShortcut("session.quick_switch.1")
  const quickSwitch9 = useCommandShortcut("session.quick_switch.9")

  const [searchResults, { refetch }] = createResource(
    () => ({ query: search(), filter: sync.session.query() }),
    async (input) => {
      if (!input.query) return undefined
      const result = await sdk.client.session.list({ search: input.query, limit: 30, ...input.filter })
      return result.data ?? []
    },
  )

  const currentSessionID = createMemo(() => props.initialSessionID ?? (route.data.type === "session" ? route.data.sessionID : undefined))

  const sessions = createMemo(() => {
    const results = searchResults()
    if (results === undefined) return sync.data.session
    return results.map((result) => sync.data.session.find((s) => s.id === result.id) ?? result)
  })

  const defaultSessionID = createMemo(() => {
    const last = kv.getEphemeral("last_session_id")
    if (last) {
      const session = sessions().find((s) => s.id === last)
      if (session) return session.id
    }

    const all = sessions().filter((x) => x.parentID === undefined)
    const sorted = all.filter((x) => x.time.pinned === undefined).toSorted((a, b) => b.time.updated - a.time.updated)
    return sorted[0]?.id ?? all.toSorted((a, b) => b.time.updated - a.time.updated)[0]?.id
  })

  function recover(session: NonNullable<ReturnType<typeof sessions>[number]>) {
    const workspace = project.workspace.get(session.workspaceID!)
    const list = () => dialog.replace(() => <DialogSessionList />)
    const warp = async (selection: WorkspaceSelection) => {
      const workspaceID = await (async () => {
        if (selection.type === "none") return null
        if (selection.type === "existing") return selection.workspaceID
        let result
        try {
          result = await sdk.client.experimental.workspace.create({ type: selection.workspaceType, branch: null })
        } catch (err) {
          toast.show({
            title: "Failed to create workspace",
            message: errorMessage(err),
            variant: "error",
          })
          return
        }
        const workspace = result?.data
        if (!workspace) {
          toast.show({
            title: "Failed to create workspace",
            message: errorMessage(result?.error ?? "no response"),
            variant: "error",
          })
          return
        }
        await project.workspace.sync()
        return workspace.id
      })()
      if (workspaceID === undefined) return
      await warpWorkspaceSession({
        dialog,
        sdk,
        sync,
        project,
        toast,
        sourceWorkspaceID: session.workspaceID,
        workspaceID,
        sessionID: session.id,
        copyChanges: false,
        done: list,
      })
    }
    dialog.replace(() => (
      <DialogSessionDeleteFailed
        session={session.title}
        workspace={workspace?.name ?? session.workspaceID!}
        onDone={list}
        onDelete={async () => {
          const current = currentSessionID()
          const info = current ? sync.data.session.find((item) => item.id === current) : undefined
          const result = await sdk.client.experimental.workspace.remove({ id: session.workspaceID! })
          if (result.error) {
            toast.show({
              variant: "error",
              title: "Failed to delete workspace",
              message: errorMessage(result.error),
            })
            return false
          }
          await project.workspace.sync()
          await sync.session.refresh()
          if (search()) await refetch()
          if (info?.workspaceID === session.workspaceID) {
            route.navigate({ type: "home" })
          }
          return true
        }}
        onRestore={() => {
          void openWorkspaceSelect({
            dialog,
            sdk,
            sync,
            project,
            toast,
            onSelect: (selection) => {
              void warp(selection)
            },
          })
          return false
        }}
      />
    ))
  }

  function orderByRecency(sessionsList: NonNullable<ReturnType<typeof sessions>>) {
    return sessionsList
      .filter((x) => x.parentID === undefined)
      .toSorted((a, b) => b.time.updated - a.time.updated)
      .map((x) => x.id)
  }

  const [browseOrder] = createSignal<string[]>(orderByRecency(sync.data.session))

  const quickSwitchHint = createMemo(() => {
    const first = quickSwitch1()
    const last = quickSwitch9()
    if (!first || !last) return undefined
    return quickSwitchRange(first, last)
  })
  const quickSwitchFooterHints = createMemo(() => {
    const hint = quickSwitchHint()
    return hint && local.session.slots().length > 0 ? [{ title: "switch", label: hint }] : []
  })

  const options = createMemo(() => {
    if (!sync.ready) return []
    const today = new Date().toDateString()

    function parseSessionTitle(title: string): { group?: string; displayTitle: string } {
      const pipeIndex = title.indexOf("|")
      if (pipeIndex === -1) return { displayTitle: title }
      const group = title.slice(0, pipeIndex).trim()
      const displayTitle = title.slice(pipeIndex + 1).trim()
      if (!group) return { displayTitle }
      const capitalized = group.charAt(0).toUpperCase() + group.slice(1)
      return { group: capitalized + ":", displayTitle }
    }

    const all = sessions().filter((x) => x.parentID === undefined)
    const pinned = all.filter((x) => x.time.pinned !== undefined).toSorted((a, b) => (b.time.pinned ?? 0) - (a.time.pinned ?? 0))
    const sessionsListLimit = sync.data.config.experimental?.session_list_limit
    const limit = sessionsListLimit === "none" ? undefined : sessionsListLimit ?? 150

    const sessionMap = new Map(all.map((x) => [x.id, x]))

    const searchResult = searchResults()
    const unpinnedOrder = searchResult ? orderByRecency(searchResult) : browseOrder()

    const unpinned = unpinnedOrder
      .map((id) => sessionMap.get(id))
      .filter((x): x is (typeof all)[number] => x !== undefined && x.time.pinned === undefined)

    const slotByID = new Map<string, number>(local.session.slots().map((id, i) => [id, i + 1]))

    const foot = (session: (typeof all)[number], showDate: boolean): JSX.Element | string => {
      if (Flag.OPENCODE_EXPERIMENTAL_WORKSPACES && session.workspaceID) {
        const workspace = project.workspace.get(session.workspaceID)
        const status = project.workspace.status(session.workspaceID) || "error"
        if (workspace) {
          return (
            <WorkspaceLabel
              type={workspace.type}
              name={workspace.name}
              status={status}
            />
          )
        }
        return <WorkspaceLabel type="unknown" name={session.workspaceID} status="error" />
      }

      return showDate ? Locale.shortDateTime(session.time.updated) : Locale.time(session.time.updated)
    }

    const item = (session: (typeof all)[number], category: string, showDate: boolean) => {
      const deleting = toDelete() === session.id
      const status = sync.data.session_status?.[session.id]
      const isWorking = status?.type === "busy" || status?.type === "retry"
      const slot = slotByID.get(session.id)
      const gutter = isWorking
        ? () => <Spinner />
        : slot !== undefined
          ? () => <text fg={theme.accent}>{slot}</text>
          : undefined
      const parsed = parseSessionTitle(session.title)
      return {
        title: deleting ? `Press ${deleteHint()} again to confirm` : (parsed.displayTitle || session.title),
        bg: deleting ? theme.error : undefined,
        value: session.id,
        category,
        footer: foot(session, showDate),
        gutter,
      }
    }

    const grouped = unpinned
      .toSorted((a, b) => {
        const aParsed = parseSessionTitle(a.title)
        const bParsed = parseSessionTitle(b.title)
        if (aParsed.group && !bParsed.group) return -1
        if (!aParsed.group && bParsed.group) return 1
        if (aParsed.group && bParsed.group) {
          const groupCompare = aParsed.group.localeCompare(bParsed.group)
          if (groupCompare !== 0) return groupCompare
          return b.time.updated - a.time.updated
        }
        return 0
      })
      .map((x) => {
        const parsed = parseSessionTitle(x.title)
        const date = new Date(x.time.updated)
        return item(x, parsed.group ?? (date.toDateString() === today ? "Today" : date.toDateString()), false)
      })
      .filter((x) => x !== undefined)
      .slice(0, limit)

    return [
      ...pinned.map((x) => item(x, "Bookmarks:", true)),
      ...grouped,
    ]
  })

  createEffect(() => {
    const id = currentSessionID() ?? defaultSessionID()
    if (!id) return
    options()
    setTimeout(() => {
      selectRef()?.scrollToValue(id, true)
    }, 0)
  })

  onMount(() => {
    dialog.setSize("large")
  })

  return (
    <DialogSelect
      ref={setSelectRef}
      title="Sessions"
      options={options()}
      skipFilter={true}
      current={currentSessionID() ?? defaultSessionID()}
      onFilter={setSearch}
      onMove={() => {
        setToDelete(undefined)
      }}
      onSelect={(option) => {
        route.navigate({
          type: "session",
          sessionID: option.value,
        })
        dialog.clear()
      }}
      actions={[
        {
          command: "session.pin.toggle",
          title: "pin/unpin",
          onTrigger: (option: { value: string }) => {
            local.session.togglePin(option.value)
          },
        },
        {
          command: "session.delete",
          title: "delete",
          onTrigger: async (option) => {
            if (toDelete() === option.value) {
              const session = sessions().find((item) => item.id === option.value)
              const status = session?.workspaceID ? project.workspace.status(session.workspaceID) : undefined

              try {
                const result = await sdk.client.session.delete({
                  sessionID: option.value,
                })
                if (result.error) {
                  if (session?.workspaceID) {
                    recover(session)
                  } else {
                    toast.show({
                      variant: "error",
                      title: "Failed to delete session",
                      message: errorMessage(result.error),
                    })
                  }
                  setToDelete(undefined)
                  return
                }
              } catch (err) {
                if (session?.workspaceID) {
                  recover(session)
                } else {
                  toast.show({
                    variant: "error",
                    title: "Failed to delete session",
                    message: errorMessage(err),
                  })
                }
                setToDelete(undefined)
                return
              }
              if (status && status !== "connected") {
                await sync.session.refresh()
              }
              if (search()) await refetch()
              setToDelete(undefined)
              return
            }
            setToDelete(option.value)
          },
        },
        {
          command: "session.rename",
          title: "rename",
          onTrigger: async (option) => {
            const back = () => dialog.replace(() => <DialogSessionList initialSessionID={option.value} />)
            dialog.replace(() => <DialogSessionRename session={option.value} onSuccess={back} onCancel={back} />)
          },
        },
        {
          command: "session.bookmark",
          title: "bookmark",
          onTrigger: async (option) => {
            const session = sessions().find((s) => s.id === option.value)
            if (!session) return
            await sdk.client.session.update({
              sessionID: option.value,
              time: { pinned: session.time.pinned === undefined ? Date.now() : null },
            })
            setTimeout(() => selectRef()?.scrollToValue(option.value, true), 0)
          },
        },
      ]}
      footerHints={quickSwitchFooterHints()}
    />
  )
}

function quickSwitchRange(first: string, last: string) {
  const prefix = first.slice(0, -1)
  if (first.endsWith("1") && last === `${prefix}9`) return `${prefix}1-9`
  return `${first} through ${last}`
}
