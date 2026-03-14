import { useDialog } from "@tui/ui/dialog"
import { DialogSelect, type DialogSelectRef } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useSync } from "@tui/context/sync"
import { createMemo, createSignal, createResource, onMount, createEffect } from "solid-js"
import { Locale } from "@/util/locale"
import { useKeybind } from "../context/keybind"
import { Keybind } from "@/util/keybind"
import { useTheme } from "../context/theme"
import { useSDK } from "../context/sdk"
import { DialogSessionRename } from "./dialog-session-rename"
import { useKV } from "../context/kv"
import { createDebouncedSignal } from "../util/signal"
import { Spinner } from "./spinner"

export function DialogSessionList(props: { initialSessionID?: string } = {}) {
  const dialog = useDialog()
  const route = useRoute()
  const sync = useSync()
  const keybind = useKeybind()
  const { theme } = useTheme()
  const sdk = useSDK()
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
    if (!results) return sync.data.session
    return results.map((result) => {
      const live = sync.data.session.find((s) => s.id === result.id)
      return live ?? result
    })
  })

  const defaultSessionID = createMemo(() => {
    const lastSessionID = kv.getEphemeral("last_session_id")

    // First try last session we were in (ephemeral, per-process)
    if (lastSessionID) {
      const session = sessions().find((s) => s.id === lastSessionID)
      if (session) return session.id
    }

    // Fallback to most recently updated non-bookmarked session
    const allSessions = sessions().filter((x) => x.parentID === undefined)
    const unpinned = allSessions.filter((x) => x.time.pinned === undefined)
    const sorted = unpinned.toSorted((a, b) => b.time.updated - a.time.updated)
    // Fall back to bookmarked sessions only if no non-bookmarked sessions exist
    return sorted[0]?.id ?? allSessions.toSorted((a, b) => b.time.updated - a.time.updated)[0]?.id
  })

  function parseSessionTitle(title: string): { group?: string; displayTitle: string } {
    const pipeIndex = title.indexOf("|")
    if (pipeIndex === -1) {
      return { displayTitle: title }
    }

    const group = title.slice(0, pipeIndex).trim()
    const displayTitle = title.slice(pipeIndex + 1).trim()

    if (!group) {
      return { displayTitle }
    }

    const capitalized = group.charAt(0).toUpperCase() + group.slice(1)
    return { group: capitalized + ":", displayTitle }
  }

  const options = createMemo(() => {
    if (!sync.ready) return []
    const today = new Date().toDateString()
    const sessionsListLimit = sync.data.config.experimental?.session_list_limit
    const limit = sessionsListLimit === "none" ? undefined : sessionsListLimit ?? 150

    const allSessions = sessions().filter((x) => x.parentID === undefined)

    // Separate into pinned and unpinned
    const pinned = allSessions
      .filter((x) => x.time.pinned !== undefined)
      .toSorted((a, b) => (b.time.pinned ?? 0) - (a.time.pinned ?? 0))

    const unpinned = allSessions
      .filter((x) => x.time.pinned === undefined)

    // Separate unpinned into grouped and ungrouped
    const grouped: typeof unpinned = []
    const ungrouped: typeof unpinned = []

    for (const session of unpinned) {
      const parsed = parseSessionTitle(session.title)
      if (parsed.group) {
        grouped.push(session)
      } else {
        ungrouped.push(session)
      }
    }

    // Sort grouped by group name ASC, then updated DESC
    grouped.sort((a, b) => {
      const aParsed = parseSessionTitle(a.title)
      const bParsed = parseSessionTitle(b.title)
      const groupCompare = (aParsed.group ?? "").localeCompare(bParsed.group ?? "")
      if (groupCompare !== 0) return groupCompare
      return b.time.updated - a.time.updated
    })

    // Sort ungrouped by updated DESC
    ungrouped.sort((a, b) => b.time.updated - a.time.updated)

    const mapSession = (session: typeof allSessions[number], category: string, showDate: boolean, useDisplayTitle = false) => {
      const parsed = parseSessionTitle(session.title)
      const isDeleting = toDelete() === session.id
      const status = sync.data.session_status?.[session.id]
      const isWorking = status?.type === "busy"
      return {
        title: isDeleting ? `Press ${keybind.print("session_delete")} again to confirm` : (useDisplayTitle ? parsed.displayTitle : session.title),
        bg: isDeleting ? theme.error : undefined,
        value: session.id,
        category,
        footer: showDate ? Locale.shortDateTime(session.time.updated) : Locale.time(session.time.updated),
        gutter: isWorking ? <Spinner /> : undefined,
      }
    }

    // Map pinned sessions
    const pinnedOptions = pinned.map((x) => mapSession(x, "Bookmarks", true))

    // Map grouped sessions
    const groupedOptions = grouped.map((session) => {
      const parsed = parseSessionTitle(session.title)
      return mapSession(session, parsed.group ?? "", false, true)
    })

    // Map ungrouped sessions
    const ungroupedOptions = ungrouped.map((session) => {
      const date = new Date(session.time.updated)
      const category = date.toDateString() === today ? "Today" : date.toDateString()
      return mapSession(session, category, false)
    })

    return [...pinnedOptions, ...groupedOptions, ...ungroupedOptions].slice(0, limit)
  })

  createEffect(() => {
    console.log("session count", sync.data.session.length)
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
            const isPinned = session.time.pinned !== undefined
            await sdk.client.session.update({
              sessionID: option.value,
              time: { pinned: isPinned ? null : Date.now() },
            })
            setTimeout(() => selectRef()?.scrollToValue(option.value, true), 0)
          },
        },
      ]}
    />
  )
}
