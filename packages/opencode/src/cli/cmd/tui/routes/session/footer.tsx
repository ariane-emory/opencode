import { createMemo, Match, Show, Switch } from "solid-js"
import { useTheme } from "../../context/theme"
import { useSync } from "../../context/sync"
import { useDirectory } from "../../context/directory"
import { useRoute } from "../../context/route"

export function Footer() {
  const { theme } = useTheme()
  const sync = useSync()
  const route = useRoute()
  const mcp = createMemo(() => Object.keys(sync.data.mcp))
  const mcpError = createMemo(() => Object.values(sync.data.mcp).some((x) => x.status === "failed"))
  const lsp = createMemo(() => Object.keys(sync.data.lsp))
  const permissions = createMemo(() => {
    if (route.data.type !== "session") return []
    return sync.data.permission[route.data.sessionID] ?? []
  })
  const directory = useDirectory()
  return (
    <box flexDirection="row" justifyContent="space-between" gap={1} flexShrink={0}>
      <text fg={theme.textMuted}>{directory()}</text>
      <box gap={2} flexDirection="row" flexShrink={0}>
        <Show when={permissions().length > 0}>
          <text fg={theme.warning}>
            <span style={{ fg: theme.warning }}>◉</span> {permissions().length} Permission
            {permissions().length > 1 ? "s" : ""}
          </text>
        </Show>
        <text fg={theme.text}>
          <span style={{ fg: theme.success }}>•</span> {lsp().length} LSP
        </text>
        <Show when={mcp().length}>
          <text fg={theme.text}>
            <Switch>
              <Match when={mcpError()}>
                <span style={{ fg: theme.error }}>⊙ </span>
              </Match>
              <Match when={true}>
                <span style={{ fg: theme.success }}>⊙ </span>
              </Match>
            </Switch>
            {mcp().length} MCP
          </text>
        </Show>
        <text fg={theme.textMuted}>/status</text>
      </box>
    </box>
  )
}
