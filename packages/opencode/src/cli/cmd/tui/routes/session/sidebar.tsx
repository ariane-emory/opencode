import { useSync } from "@tui/context/sync"
import { createMemo, Show } from "solid-js"
import { useTheme } from "../../context/theme"
import { TuiPluginRuntime } from "../../plugin"
import { useTuiConfig } from "../../context/tui-config"
import { getScrollAcceleration } from "../../util/scroll"
import { parseSessionTitleParts } from "@tui/util/session-title"

export function Sidebar(props: { sessionID: string; overlay?: boolean; showScrollbar?: boolean }) {
  const sync = useSync()
  const { theme } = useTheme()
  const tuiConfig = useTuiConfig()
  const session = createMemo(() => sync.session.get(props.sessionID)!)
  const scrollAcceleration = createMemo(() => getScrollAcceleration(tuiConfig))

  const titleParts = createMemo(() => parseSessionTitleParts(session()?.title ?? ""))
  const permissions = createMemo(() => sync.data.permission[props.sessionID] ?? [])

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
        position="relative"
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
            <TuiPluginRuntime.Slot name="sidebar_title" mode="single_winner" session_id={props.sessionID} title={session().title} share_url={session().share?.url}>
              <box paddingRight={1}>
                <text fg={theme.sessionTitle}>
                  <Show when={titleParts().group} fallback={<b>{titleParts().rest}</b>}>
                    <b>{titleParts().group}</b> {titleParts().rest}
                  </Show>
                </text>
                <Show when={session().share?.url}>
                  <text fg={theme.textMuted}>{session().share!.url}</text>
                </Show>
              </box>
            </TuiPluginRuntime.Slot>
            <TuiPluginRuntime.Slot name="sidebar_content" session_id={props.sessionID} />
          </box>
        </scrollbox>

        <box flexShrink={0} gap={1} paddingTop={1}>
          <Show when={permissions().length > 0}>
            <text fg={theme.warning}>
              <span style={{ fg: theme.warning }}>◉</span> {permissions().length} Permission
              {permissions().length > 1 ? "s" : ""}
            </text>
          </Show>
          <TuiPluginRuntime.Slot name="sidebar_footer" mode="single_winner" session_id={props.sessionID} />
        </box>
      </box>
    </Show>
  )
}
