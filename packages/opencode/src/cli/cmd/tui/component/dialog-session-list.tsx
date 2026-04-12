import { useDialog } from "@tui/ui/dialog"
import { DialogSelect, type DialogSelectRef } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useSync } from "@tui/context/sync"
import { createEffect, createMemo, createResource, createSignal, onMount } from "solid-js"
import { Locale } from "@/util/locale"
import { useProject } from "@tui/context/project"
import { useKeybind } from "../context/keybind"
import { useTheme } from "../context/theme"
import { useSDK } from "../context/sdk"
import { Flag } from "@/flag/flag"
import { DialogSessionRename } from "./dialog-session-rename"
import { Keybind } from "@/util/keybind"
import { createDebouncedSignal } from "../util/signal"
import { useToast } from "../ui/toast"
import { DialogWorkspaceCreate, openWorkspaceSession } from "./dialog-workspace-create"
import { Spinner } from "./spinner"
import { useKV } from "../context/kv"

export function DialogSessionList() {
  const dialog = useDialog()
  const route = useRoute()
  const sync = useSync()
  const project = useProject()
  const keybind = useKeybind()
  const { theme } = useTheme()
  const sdk = useSDK()
  const toast = useToast()
  const kv = useKV()
  const [toDelete, setToDelete] = createSignal<string>()
  const [search, setSearch] = createDebouncedSignal("", 150)
  const [selectRef, setSelectRef] = createSignal<DialogSelectRef<string>>()

  const [searchResults] = createResource(search, async (query) => {
    if (!query) return undefined
    const result = await sdk.client.session.list({ search: query, limit: 30 })
    return result.data ?? []
  })

  const pinKeybind = "ctrl+b"
  const currentSessionID = createMemo(() => (route.data.type === "session" ? route.data.sessionID : undefined))

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

  function createWorkspace() {
    dialog.replace(() => (
      <DialogWorkspaceCreate
        onSelect={(workspaceID) =>
          openWorkspaceSession({
            dialog,
            route,
            sdk,
            sync,
            toast,
            workspaceID,
          })
        }
      />
    ))
  }

  const options = createMemo(() => {
    const today = new Date().toDateString()
    const all = sessions().filter((x) => x.parentID === undefined)
    const pinned = all.filter((x) => x.time.pinned !== undefined).toSorted((a, b) => (b.time.pinned ?? 0) - (a.time.pinned ?? 0))
    const unpinned = all.filter((x) => x.time.pinned === undefined).toSorted((a, b) => b.time.updated - a.time.updated)

    const foot = (session: (typeof all)[number], showDate: boolean) => {
      if (Flag.OPENCODE_EXPERIMENTAL_WORKSPACES && session.workspaceID) {
        const workspace = project.workspace.get(session.workspaceID)
        const status = project.workspace.status(session.workspaceID) || "error"
        const desc = workspace ? `${workspace.type}: ${workspace.name}` : "unknown"
        return (
          <>
            {desc}{" "}
            <span
              style={{
                fg: status === "error" ? theme.error : status === "disconnected" ? theme.textMuted : theme.success,
              }}
            >
              ■
            </span>
          </>
        )
      }

      return showDate ? Locale.shortDateTime(session.time.updated) : Locale.time(session.time.updated)
    }

    const item = (session: (typeof all)[number], category: string, showDate: boolean) => {
      const deleting = toDelete() === session.id
      const status = sync.data.session_status?.[session.id]
      return {
        title: deleting ? `Press ${keybind.print("session_delete")} again to confirm` : session.title,
        bg: deleting ? theme.error : undefined,
        value: session.id,
        category,
        footer: foot(session, showDate),
        gutter: status?.type === "busy" ? <Spinner /> : undefined,
      }
    }

    return [
      ...pinned.map((x) => item(x, "Bookmarks:", true)),
      ...unpinned.map((x) => {
        const date = new Date(x.time.updated)
        return item(x, date.toDateString() === today ? "Today" : date.toDateString(), false)
      }),
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
      keybind={[
        {
          keybind: keybind.all.session_delete?.[0],
          title: "delete",
          onTrigger: async (option) => {
            if (toDelete() === option.value) {
              sdk.client.session.delete({
                sessionID: option.value,
              })
              setToDelete(undefined)
              return
            }
            setToDelete(option.value)
          },
        },
        {
          keybind: keybind.all.session_rename?.[0],
          title: "rename",
          onTrigger: async (option) => {
            dialog.replace(() => <DialogSessionRename session={option.value} />)
          },
        },
        {
          keybind: Keybind.parse(pinKeybind)[0],
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
        {
          keybind: Keybind.parse("ctrl+w")[0],
          title: "new workspace",
          side: "right",
          disabled: !Flag.OPENCODE_EXPERIMENTAL_WORKSPACES,
          onTrigger: () => {
            createWorkspace()
          },
        },
      ]}
    />
  )
}
