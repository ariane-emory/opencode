import { TextAttributes } from "@opentui/core"
import { useTheme } from "../context/theme"
import { useDialog, type DialogContext } from "./dialog"
import { useBindings } from "../keymap"

export type DialogConfirmProps = {
  title: string
  message: string
  onConfirm?: () => void
  onCancel?: () => void
  label?: string
}

export type DialogConfirmResult = boolean | undefined

export function DialogConfirm(props: DialogConfirmProps) {
  const dialog = useDialog()
  const { theme } = useTheme()

  useBindings(() => ({
    bindings: [
      {
        key: "return",
        desc: "Confirm",
        group: "Dialog",
        cmd: () => {
          props.onConfirm?.()
          dialog.clear()
        },
      },
    ],
  }))
  return (
    <box paddingLeft={2} paddingRight={2} gap={1}>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          {props.title}
        </text>
        <box flexDirection="row" gap={2}>
          <text onMouseUp={() => { props.onConfirm?.(); dialog.clear() }}>
            <span style={{ fg: theme.text }}>
              <b>confirm</b>{" "}
            </span>
            <span style={{ fg: theme.textMuted }}>enter</span>
          </text>
          <text onMouseUp={() => dialog.clear()}>
            <span style={{ fg: theme.text }}>
              <b>cancel</b>{" "}
            </span>
            <span style={{ fg: theme.textMuted }}>esc</span>
          </text>
        </box>
      </box>
      <box paddingBottom={1} gap={1} flexDirection="column">
        {props.message.split("\n").map((line, i) => (
          <text
            fg={i === 0 ? theme.text : theme.textMuted}
            attributes={i === 0 ? TextAttributes.BOLD : undefined}
          >
            {line}
          </text>
        ))}
      </box>
    </box>
  )
}

DialogConfirm.show = (dialog: DialogContext, title: string, message: string, label?: string) => {
  return new Promise<DialogConfirmResult>((resolve) => {
    dialog.replace(
      () => (
        <DialogConfirm
          title={title}
          message={message}
          onConfirm={() => resolve(true)}
          onCancel={() => resolve(false)}
          label={label}
        />
      ),
      () => resolve(undefined),
    )
  })
}
