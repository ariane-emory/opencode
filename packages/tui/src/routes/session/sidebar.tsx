import { useProject } from "../../context/project"
import { useSync } from "../../context/sync"
import { createMemo, Show, createSignal, onMount, onCleanup } from "solid-js"
import { useTheme } from "../../context/theme"
import { useTuiConfig } from "../../config"
import { InstallationVersion } from "@opencode-ai/core/installation/version"
import { usePluginRuntime } from "../../plugin/runtime"
import { useKV } from "../../context/kv"

import { getScrollAcceleration } from "../../util/scroll"
import { parseSessionTitleParts } from "../../util/session-title"
import { WorkspaceLabel } from "../../component/workspace-label"

export function Sidebar(props: { sessionID: string; overlay?: boolean; showScrollbar?: boolean }) {
  const pluginRuntime = usePluginRuntime()
  const project = useProject()
  const sync = useSync()
  const { theme } = useTheme()
  const tuiConfig = useTuiConfig()
  const session = createMemo(() => sync.session.get(props.sessionID))
  const titleParts = createMemo(() => parseSessionTitleParts(session()?.title ?? ""))
  const workspace = () => {
    const workspaceID = session()?.workspaceID
    if (!workspaceID) return
    return project.workspace.get(workspaceID)
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

  const showSessionID = createMemo(() => kv.get("sidebar_session_id_visible", false))

  return (
    <Show when={session()}>
      <box
        backgroundColor={theme.backgroundPanel}
        width={42}
        height="100%"
        paddingTop={1}
        paddingLeft={2}
        paddingRight={2}
        position={props.overlay ? "absolute" : "relative"}
      >
        <scrollbox
          flexGrow={1}
          scrollAcceleration={scrollAcceleration()}
          verticalScrollbarOptions={{
            visible: props.showScrollbar,
            trackOptions: {
              backgroundColor: theme.background,
              foregroundColor: theme.borderActive,
            },
          }}
        >
          <box flexShrink={0} gap={1} paddingRight={1}>
            <pluginRuntime.Slot
              name="sidebar_title"
              mode="single_winner"
              session_id={props.sessionID}
              title={session()!.title}
              share_url={session()!.share?.url}
            >
              <box paddingRight={1}>
                <text fg={theme.sessionTitle}>
                  <Show when={titleParts().group} fallback={<b>{titleParts().rest}</b>}>
                    <b>{titleParts().group}</b> {titleParts().rest}
                  </Show>
                </text>
                <Show when={showSessionID()}>
                  <text fg={theme.textMuted}>{props.sessionID}</text>
                </Show>
                <Show when={session()!.workspaceID}>
                  <text fg={theme.textMuted}>
                    <Show
                      when={workspace()}
                      fallback={<WorkspaceLabel type="unknown" name={session()!.workspaceID!} status="error" icon />}
                    >
                      {(item) => (
                        <WorkspaceLabel
                          type={item().type}
                          name={item().name}
                          status={project.workspace.status(item().id) ?? "error"}
                          icon
                        />
                      )}
                    </Show>
                  </text>
                </Show>
                <Show when={session()!.share?.url}>
                  <text fg={theme.textMuted}>{session()!.share!.url}</text>
                </Show>
              </box>
            </pluginRuntime.Slot>
            <pluginRuntime.Slot name="sidebar_content" session_id={props.sessionID} />
          </box>
        </scrollbox>

        <box flexShrink={0} gap={1} paddingTop={1}>
          <pluginRuntime.Slot name="sidebar_footer" mode="single_winner" session_id={props.sessionID}>
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
          </pluginRuntime.Slot>
        </box>
      </box>
    </Show>
  )
}
