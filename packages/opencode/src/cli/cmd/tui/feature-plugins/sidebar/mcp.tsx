import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createEffect, createMemo, createSignal, For, Match, Show, Switch } from "solid-js"

const id = "internal:sidebar-mcp"

function View(props: { api: TuiPluginApi }) {
  const [open, setOpen] = createSignal(true)

  createEffect(() => {
    if (props.api.kv.ready) {
      setOpen(props.api.kv.get("sidebar_expanded_mcp", true))
    }
  })

  const toggle = () => {
    if (list().length <= 2) return
    const next = !open()
    setOpen(next)
    props.api.kv.set("sidebar_expanded_mcp", next)
  }
  const [loading, setLoading] = createSignal<string | null>(null)
  const theme = () => props.api.theme.current
  const list = createMemo(() => props.api.state.mcp())
  const on = createMemo(() => list().filter((item) => item.status === "connected").length)
  const bad = createMemo(
    () =>
      list().filter(
        (item) =>
          item.status === "failed" || item.status === "needs_auth" || item.status === "needs_client_registration",
      ).length,
  )

  const dot = (status: string) => {
    if (status === "connected") return theme().success
    if (status === "failed") return theme().error
    if (status === "disabled") return theme().textMuted
    if (status === "needs_auth") return theme().warning
    if (status === "needs_client_registration") return theme().error
    return theme().textMuted
  }

  async function handleToggle(name: string) {
    if (loading() !== null) return
    setLoading(name)
    try {
      const item = list().find((m) => m.name === name)
      if (item?.status === "connected") {
        await props.api.client.mcp.disconnect({ name })
      } else {
        await props.api.client.mcp.connect({ name })
      }
    } catch {
      // silently ignore toggle errors
    } finally {
      setLoading(null)
    }
  }

  return (
    <Show when={list().length > 0}>
      <box>
        <box flexDirection="row" gap={1} onMouseDown={toggle}>
          <Show when={list().length > 2}>
            <text fg={theme().text}>{open() ? "▼" : "▶"}</text>
          </Show>
          <text fg={theme().text}>
            <b>MCP</b>
            <Show when={!open()}>
              <span style={{ fg: theme().textMuted }}>
                {" "}
                ({on()} active{bad() > 0 ? `, ${bad()} error${bad() > 1 ? "s" : ""}` : ""})
              </span>
            </Show>
          </text>
        </box>
        <Show when={list().length <= 2 || open()}>
          <For each={list()}>
            {(item) => (
              <box flexDirection="row" gap={1} onMouseDown={() => handleToggle(item.name)}>
                <text
                  flexShrink={0}
                  style={{
                    fg: dot(item.status),
                  }}
                >
                  •
                </text>
                <text fg={loading() === item.name ? theme().textMuted : theme().text} wrapMode="word">
                  {item.name}{" "}
                  <span style={{ fg: theme().textMuted }}>
                    <Switch fallback={item.status}>
                      <Match when={loading() === item.name}>
                        <i>Loading…</i>
                      </Match>
                      <Match when={item.status === "connected"}>Connected</Match>
                      <Match when={item.status === "failed"}>
                        <i>{item.error}</i>
                      </Match>
                      <Match when={item.status === "disabled"}>Disabled</Match>
                      <Match when={item.status === "needs_auth"}>Needs auth</Match>
                      <Match when={item.status === "needs_client_registration"}>Needs client ID</Match>
                    </Switch>
                  </span>
                </text>
              </box>
            )}
          </For>
        </Show>
      </box>
    </Show>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 200,
    slots: {
      sidebar_content() {
        return <View api={api} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
