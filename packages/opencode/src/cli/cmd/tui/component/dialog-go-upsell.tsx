import { RGBA, TextAttributes } from "@opentui/core"
import { useKeyboard } from "@opentui/solid"
import open from "open"
import { createSignal } from "solid-js"
import { selectedForeground, useTheme } from "@tui/context/theme"
import { useDialog, type DialogContext } from "@tui/ui/dialog"
import { Link } from "@tui/ui/link"
import { GoLogo } from "./logo"

const GO_URL = "https://opencode.ai/go"
const PAD_X = 3

export type DialogGoUpsellProps = {
  onClose?: (dontShowAgain?: boolean) => void
}

function subscribe(props: DialogGoUpsellProps, dialog: ReturnType<typeof useDialog>) {
  open(GO_URL).catch(() => {})
  props.onClose?.()
  dialog.clear()
}

function dismiss(props: DialogGoUpsellProps, dialog: ReturnType<typeof useDialog>) {
  props.onClose?.(true)
  dialog.clear()
}

export function DialogGoUpsell(props: DialogGoUpsellProps) {
  const dialog = useDialog()
  const { theme } = useTheme()
  const fg = selectedForeground(theme)
  const [selected, setSelected] = createSignal<"dismiss" | "subscribe">("subscribe")

  useKeyboard((evt) => {
    if (evt.name === "left" || evt.name === "right" || evt.name === "tab") {
      setSelected((s) => (s === "subscribe" ? "dismiss" : "subscribe"))
      return
    }
    if (evt.name === "return") {
      evt.preventDefault()
      evt.stopPropagation()
      if (selected() === "subscribe") subscribe(props, dialog)
      else dismiss(props, dialog)
    }
  })

  return (
    <box paddingLeft={PAD_X} paddingRight={PAD_X} paddingBottom={1} gap={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          Free limit reached
        </text>
        <text fg={theme.textMuted} onMouseUp={() => dialog.clear()}>
          esc
        </text>
      </box>
      <box gap={0}>
        <box flexDirection="row">
          <text fg={theme.textMuted}>Subscribe to </text>
          <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
            OpenCode Go
          </text>
          <text fg={theme.textMuted}> for reliable access to the</text>
        </box>
        <text fg={theme.textMuted}>best open-source models, starting at $5/month.</text>
      </box>
      <box alignItems="center" gap={1} paddingBottom={1}>
        <box>
          <GoLogo />
        </box>
        <Link href={GO_URL} fg={theme.primary} />
      </box>
      <box flexDirection="row" justifyContent="space-between">
        <box
          paddingLeft={2}
          paddingRight={2}
          backgroundColor={selected() === "dismiss" ? theme.primary : RGBA.fromInts(0, 0, 0, 0)}
          onMouseOver={() => setSelected("dismiss")}
          onMouseUp={() => dismiss(props, dialog)}
        >
          <text
            fg={selected() === "dismiss" ? fg : theme.textMuted}
            attributes={selected() === "dismiss" ? TextAttributes.BOLD : undefined}
          >
            don't show again
          </text>
        </box>
        <box
          paddingLeft={2}
          paddingRight={2}
          backgroundColor={selected() === "subscribe" ? theme.primary : RGBA.fromInts(0, 0, 0, 0)}
          onMouseOver={() => setSelected("subscribe")}
          onMouseUp={() => subscribe(props, dialog)}
        >
          <text
            fg={selected() === "subscribe" ? fg : theme.text}
            attributes={selected() === "subscribe" ? TextAttributes.BOLD : undefined}
          >
            subscribe
          </text>
        </box>
      </box>
    </box>
  )
}

DialogGoUpsell.show = (dialog: DialogContext) => {
  return new Promise<boolean>((resolve) => {
    dialog.replace(
      () => <DialogGoUpsell onClose={(dontShow) => resolve(dontShow ?? false)} />,
      () => resolve(false),
    )
  })
}
