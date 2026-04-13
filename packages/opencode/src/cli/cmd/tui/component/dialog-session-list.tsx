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
import { parseSessionTitleParts } from "@tui/util/session-title"
import { useKV } from "../context/kv"

type WorkspaceStatus = "connected" | "connecting" | "disconnected" | "error"

export function DialogSessionList(props: { initialSessionID?: string } = {}) {
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
    if (!sync.ready) return []
    const today = new Date().toDateString()
    const all = sessions().filter((x) => x.parentID === undefined)
    const pinned = all.filter((x) => x.time.pinned !== undefined).toSorted((a, b) => (b.time.pinned ?? 0) - (a.time.pinned ?? 0))
    const unpinned = all.filter((x) => x.time.pinned === undefined)
    const grouped = unpinned.filter((x) => parseSessionTitleParts(x.title).group)
    const plain = unpinned.filter((x) => !parseSessionTitleParts(x.title).group)

    const footer = (x: (typeof all)[number], grouped: boolean, showDate: boolean) => {
      if (Flag.OPENCODE_EXPERIMENTAL_WORKSPACES && x.workspaceID) {
        const workspace = project.workspace.get(x.workspaceID)
        const status = (project.workspace.status(x.workspaceID) || "error") as WorkspaceStatus
        const desc = workspace ? `: ` : "unknown"
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
      return grouped ? Locale.todayTimeOrDateTime(x.time.updated) : (showDate ? Locale.shortDateTime(x.time.updated) : Locale.time(x.time.updated))
    }

    const sessionsListLimit = sync.data.config.experimental?.session_list_limit
    const limit = sessionsListLimit === "none" ? undefined : sessionsListLimit ?? 150

    grouped.sort((a, b) => {
      const ag = parseSessionTitleParts(a.title).group ?? ""
      const bg = parseSessionTitleParts(b.title).group ?? ""
      const cmp = ag.localeCompare(bg)
      if (cmp !== 0) return cmp
      return b.time.updated - a.time.updated
    })
    plain.sort((a, b) => b.time.updated - a.time.updated)

    return [
      ...pinned.map((x) => {
        const deleting = toDelete() === x.id
        const status = sync.data.session_status?.[x.id]
        return {
          title: deleting ? `Press ${keybind.print("session_delete")} again to confirm` : x.title,
          bg: deleting ? theme.error : undefined,
          value: x.id,
          category: "Bookmarks:",
          footer: footer(x, false, true),
          gutter: status?.type === "busy" ? <Spinner /> : undefined,
        }
      }),
      ...grouped.map((x) => {
        const parts = parseSessionTitleParts(x.title)
        const status = sync.data.session_status?.[x.id]
        const deleting = toDelete() === x.id
        return {
          title: deleting ? `Press ${keybind.print("session_delete")} again to confirm` : parts.rest,
          bg: deleting ? theme.error : undefined,
          value: x.id,
          category: parts.group,
          footer: footer(x, true, true),
          gutter: status?.type === "busy" ? <Spinner /> : undefined,
        }
      }),
      ...plain.map((x) => {
        const date = new Date(x.time.updated)
        const status = sync.data.session_status?.[x.id]
        const deleting = toDelete() === x.id
        return {
          title: deleting ? `Press ${keybind.print("session_delete")} again to confirm` : x.title,
          bg: deleting ? theme.error : undefined,
          value: x.id,
          category: date.toDateString() === today ? "Today" : date.toDateString(),
          footer: footer(x, false, false),
          gutter: status?.type === "busy" ? <Spinner /> : undefined,
        }
      }),
    ]
      .slice(0, limit)
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
              // Find current index before deletion
              const ref = selectRef()
              const currentIndex = ref?.filtered.findIndex((opt) => opt.value === option.value) ?? -1

              sdk.client.session.delete({
                sessionID: option.value,
              })
              setToDelete(undefined)

              // Move to adjacent item after deletion
              if (ref && currentIndex >= 0) {
                setTimeout(() => {
                  // Try to stay at same index (which will be next item after deletion)
                  // Or go to previous if we were at the end
                  const newIndex = Math.min(currentIndex, ref.filtered.length - 1)
                  if (newIndex >= 0) {
                    ref.moveTo(newIndex, true)
                  }
                }, 50)
              }
              return
            }
            setToDelete(option.value)
          },
        },
        {
          keybind: keybind.all.session_rename?.[0],
          title: "rename",
          onTrigger: async (option) => {
            const back = () => dialog.replace(() => <DialogSessionList initialSessionID={option.value} />)
            dialog.replace(() => <DialogSessionRename session={option.value} onSuccess={back} onCancel={back} />)
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
