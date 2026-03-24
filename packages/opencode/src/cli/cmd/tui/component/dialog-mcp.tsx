import { createMemo, createSignal } from "solid-js"
import { useLocal } from "@tui/context/local"
import { useSync } from "@tui/context/sync"
import { map, pipe, entries, sortBy } from "remeda"
import { DialogSelect, type DialogSelectRef, type DialogSelectOption } from "@tui/ui/dialog-select"
import { useTheme } from "../context/theme"
import { Keybind } from "@/util/keybind"
import { TextAttributes } from "@opentui/core"
import { useSDK } from "@tui/context/sdk"

function Status(props: { enabled: boolean; loading: boolean }) {
  const { theme } = useTheme()
  if (props.loading) {
    return <span style={{ fg: theme.textMuted }}>⋯ Loading</span>
  }
  if (props.enabled) {
    return <span style={{ fg: theme.success, attributes: TextAttributes.BOLD }}>✓ Enabled</span>
  }
  return <span style={{ fg: theme.textMuted }}>○ Disabled</span>
}

export function DialogMcp() {
  const local = useLocal()
  const sync = useSync()
  const sdk = useSDK()
  const [, setRef] = createSignal<DialogSelectRef<unknown>>()
  const [loading, setLoading] = createSignal<string | null>(null)

  async function toggle(name: string) {
    if (loading() !== null) return
    setLoading(name)
    try {
      await local.mcp.toggle(name)
      const status = await sdk.client.mcp.status()
      if (status.data) sync.set("mcp", status.data)
    } catch (error) {
      console.error("Failed to toggle MCP:", error)
    } finally {
      setLoading(null)
    }
  }

  const options = createMemo(() => {
    // Track sync data and loading state to trigger re-render when they change
    const mcpData = sync.data.mcp
    const loadingMcp = loading()

    return pipe(
      mcpData ?? {},
      entries(),
      sortBy(([name]) => name),
      map(([name, status]) => ({
        value: name,
        title: name,
        description: loadingMcp === name ? "loading..." : status.status === "failed" ? "failed" : status.status,
        footer: <Status enabled={local.mcp.isEnabled(name)} loading={loadingMcp === name} />,
        category: undefined,
        onSelect: () => toggle(name),
      })),
    )
  })

  const keybinds = createMemo(() => [
    {
      keybind: Keybind.parse("space")[0],
      title: "toggle",
      onTrigger: async (option: DialogSelectOption<string>) => {
        await toggle(option.value)
      },
    },
  ])

  return (
    <DialogSelect
      ref={setRef}
      title="MCPs"
      options={options()}
      keybind={keybinds()}
      onSelect={(option) => {
        // Don't close on select, only on escape
      }}
    />
  )
}
