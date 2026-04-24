import { useProject } from "@tui/context/project"
import { useSync } from "@tui/context/sync"
import { createMemo, Show, createSignal, onMount, onCleanup } from "solid-js"
import { useTheme } from "../../context/theme"
import { useTuiConfig } from "../../context/tui-config"
import { InstallationChannel, InstallationVersion } from "@/installation/version"
import { TuiPluginRuntime } from "../../plugin"
import { useKV } from "../../context/kv"

import { getScrollAcceleration } from "../../util/scroll"
import { parseSessionTitleParts } from "../../util/session-title"

export function Sidebar(props: { sessionID: string; overlay?: boolean }) {
  const project = useProject()
  const sync = useSync()
  const { theme } = useTheme()
  const tuiConfig = useTuiConfig()
  const session = createMemo(() => sync.session.get(props.sessionID))
  const titleParts = createMemo(() => parseSessionTitleParts(session()?.title ?? ""))
  const workspaceStatus = () => {
    const workspaceID = session()?.workspaceID
    if (!workspaceID) return "error"
    return project.workspace.status(workspaceID) ?? "error"
  }
  const workspaceLabel = () => {
    const workspaceID = session()?.workspaceID
    if (!workspaceID) return "unknown"
    const info = project.workspace.get(workspaceID)
    if (!info) return "unknown"
    return `${info.type}: ${info.name}`
  }
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
                  <Show when={titleParts().group} fallback={<b>{titleParts().rest}</b>}>
                    <b>{titleParts().group}</b> {titleParts().rest}
                  </Show>
                </text>
                <Show when={InstallationChannel !== "latest"}>
                  <text fg={theme.textMuted}>{props.sessionID}</text>
                </Show>
                <Show when={session()!.workspaceID}>
                  <text fg={theme.textMuted}>
                    <span style={{ fg: workspaceStatus() === "connected" ? theme.success : theme.error }}>●</span>{" "}
                    {workspaceLabel()}
                  </text>
                </Show>
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
                <span style={{ fg: theme.success }}>•</span> <b>Base</b>
                <span style={{ fg: theme.text }}>
                  <b>One</b>
                </span>{" "}
                <span>{InstallationVersion}</span>
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
