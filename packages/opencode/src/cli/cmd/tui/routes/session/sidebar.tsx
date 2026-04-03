import { useSync } from "@tui/context/sync"
import { createMemo, Show, createSignal, onMount, onCleanup } from "solid-js"
import { useTheme } from "../../context/theme"
import { useTuiConfig } from "../../context/tui-config"
import { Installation } from "@/installation"
import { TuiPluginRuntime } from "../../plugin"
import { useKV } from "../../context/kv"

import { getScrollAcceleration } from "../../util/scroll"

export function Sidebar(props: { sessionID: string; overlay?: boolean }) {
  const sync = useSync()
  const { theme } = useTheme()
  const tuiConfig = useTuiConfig()
  const session = createMemo(() => sync.session.get(props.sessionID))
  const scrollAcceleration = createMemo(() => getScrollAcceleration(tuiConfig))

  const kv = useKV()
  const showSidebarClock = createMemo(() => kv.get("sidebar_clock_visible", true))

  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const [clockTime, setClockTime] = createSignal(formatTime())

  onMount(() => {
    const interval = setInterval(() => setClockTime(formatTime()), 10000)
    onCleanup(() => clearInterval(interval))
  })

  return (
    <Show when={session()}>
      <box
        backgroundColor={theme.backgroundPanel}
        width={42}
        height="100%"
        paddingTop={1}
        paddingBottom={1}
        paddingLeft={2}
        paddingRight={2}
        position={props.overlay ? "absolute" : "relative"}
      >
        <scrollbox
          flexGrow={1}
          scrollAcceleration={scrollAcceleration()}
          verticalScrollbarOptions={{
            trackOptions: {
              backgroundColor: theme.background,
              foregroundColor: theme.borderActive,
            },
          }}
        >
          <box flexShrink={0} gap={1} paddingRight={1}>
            <TuiPluginRuntime.Slot
              name="sidebar_title"
              mode="single_winner"
              session_id={props.sessionID}
              title={session()!.title}
              share_url={session()!.share?.url}
            >
              <box paddingRight={1}>
                <text fg={theme.text}>
                  <b>{session()!.title}</b>
                </text>
                <Show when={session()!.share?.url}>
                  <text fg={theme.textMuted}>{session()!.share!.url}</text>
                </Show>
              </box>
            </TuiPluginRuntime.Slot>
            <TuiPluginRuntime.Slot name="sidebar_content" session_id={props.sessionID} />
          </box>
        </scrollbox>

        <box flexShrink={0} gap={1} paddingTop={1}>
          <TuiPluginRuntime.Slot name="sidebar_footer" mode="single_winner" session_id={props.sessionID}>
            <box flexDirection="row" justifyContent="space-between">
              <text fg={theme.textMuted}>
                <span style={{ fg: theme.success }}>•</span> <b>Open</b>
                <span style={{ fg: theme.text }}>
                  <b>Code</b>
                </span>{" "}
                <span>{Installation.VERSION}</span>
              </text>
              <Show when={showSidebarClock()}>
                <text fg={theme.accent}>🐈 {clockTime()}</text>
              </Show>
            </box>
          </TuiPluginRuntime.Slot>
        </box>
      </box>
    </Show>
  )
}
