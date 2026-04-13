import { useDialog } from "@tui/ui/dialog"
import { DialogSelect } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useSync } from "@tui/context/sync"
import { createMemo, createResource, createSignal, onMount } from "solid-js"
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

type WorkspaceStatus = "connected" | "connecting" | "disconnected" | "error"

export function DialogSessionList() {
  const dialog = useDialog()
  const route = useRoute()
  const sync = useSync()
  const project = useProject()
  const keybind = useKeybind()
  const { theme } = useTheme()
  const sdk = useSDK()
  const toast = useToast()
  const [toDelete, setToDelete] = createSignal<string>()
  const [search, setSearch] = createDebouncedSignal("", 150)

  const [searchResults] = createResource(search, async (query) => {
    if (!query) return undefined
    const result = await sdk.client.session.list({ search: query, limit: 30 })
    return result.data ?? []
  })

  const currentSessionID = createMemo(() => (route.data.type === "session" ? route.data.sessionID : undefined))
  const sessions = createMemo(() => searchResults() ?? sync.data.session)

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
    const grouped = all.filter((x) => parseSessionTitleParts(x.title).group)
    const plain = all.filter((x) => !parseSessionTitleParts(x.title).group)

    const footer = (x: (typeof all)[number], grouped: boolean) => {
      if (!Flag.OPENCODE_EXPERIMENTAL_WORKSPACES || !x.workspaceID) {
        return grouped ? Locale.todayTimeOrDateTime(x.time.updated) : Locale.time(x.time.updated)
      }

      const workspace = project.workspace.get(x.workspaceID)
      const status = (project.workspace.status(x.workspaceID) || "error") as WorkspaceStatus
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

    grouped.sort((a, b) => {
      const ag = parseSessionTitleParts(a.title).group ?? ""
      const bg = parseSessionTitleParts(b.title).group ?? ""
      const cmp = ag.localeCompare(bg)
      if (cmp !== 0) return cmp
      return b.time.updated - a.time.updated
    })
    plain.sort((a, b) => b.time.updated - a.time.updated)

    return [
      ...grouped.map((x) => {
        const parts = parseSessionTitleParts(x.title)
        const status = sync.data.session_status?.[x.id]
        const deleting = toDelete() === x.id
        return {
          title: deleting ? `Press ${keybind.print("session_delete")} again to confirm` : parts.rest,
          bg: deleting ? theme.error : undefined,
          value: x.id,
          category: parts.group,
          footer: footer(x, true),
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
          footer: footer(x, false),
          gutter: status?.type === "busy" ? <Spinner /> : undefined,
        }
      }),
    ]
  })

  onMount(() => {
    dialog.setSize("large")
  })

  return (
    <DialogSelect
      title="Sessions"
      options={options()}
      skipFilter={true}
      current={currentSessionID()}
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
