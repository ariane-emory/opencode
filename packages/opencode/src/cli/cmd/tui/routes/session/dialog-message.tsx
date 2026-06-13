import { createMemo, type JSX } from "solid-js"
import { useSync } from "@tui/context/sync"
import { DialogSelect } from "@tui/ui/dialog-select"
import { useSDK } from "@tui/context/sdk"
import { useRoute } from "@tui/context/route"
import { useToast } from "@tui/ui/toast"
import * as Clipboard from "@tui/util/clipboard"
import type { PromptInfo } from "@tui/component/prompt/history"
import { strip } from "@tui/component/prompt/part"
import { errorMessage } from "@/util/error"
import { DialogConfirm } from "@tui/ui/dialog-confirm"
import { useTheme } from "@tui/context/theme"
import { TextAttributes } from "@opentui/core"

export function DialogMessage(props: {
  messageID: string
  sessionID: string
  setPrompt?: (prompt: PromptInfo) => void
}) {
  const sync = useSync()
  const sdk = useSDK()
  const toast = useToast()
  const { theme } = useTheme()
  const message = createMemo(() => sync.data.message[props.sessionID]?.find((x) => x.id === props.messageID))
  const route = useRoute()

  function buildMessagePreview(messageID: string): { text: string; truncated: boolean } {
    const parts = sync.data.part[messageID]
    const text = parts.reduce((agg, part) => {
      if (part.type === "text" && !part.synthetic) {
        agg += part.text
      }
      return agg
    }, "")
    const lines = text.split("\n")
    const previewLines = lines.slice(0, 10)
    return { text: previewLines.join("\n"), truncated: lines.length > 10 }
  }

  function rewindConfirmDescription(messageID: string): JSX.Element {
    const preview = buildMessagePreview(messageID)
    const lines = preview.text.split("\n").filter((line) => line.length > 0)
    return (
      <box gap={1} flexDirection="column" paddingBottom={1}>
        <text fg={theme.textMuted}>Are you sure you want to rewind to this message?</text>
        <box flexDirection="column" gap={0}>
          {lines.map((line) => (
            <text fg={theme.text} wrapMode="none">
              {line}
            </text>
          ))}
          {preview.truncated && (
            <text fg={theme.textMuted} attributes={TextAttributes.ITALIC}>
              ...
            </text>
          )}
        </box>
      </box>
    )
  }

  return (
    <DialogSelect
      title="Message Actions"
      options={[
        {
          title: "Revert",
          value: "session.revert",
          description: "undo messages and file changes",
          onSelect: (dialog) => {
            const msg = message()
            if (!msg) return

            void sdk.client.session.revert({
              sessionID: props.sessionID,
              messageID: msg.id,
            })

            if (props.setPrompt) {
              const parts = sync.data.part[msg.id]
              const promptInfo = parts.reduce(
                (agg, part) => {
                  if (part.type === "text") {
                    if (!part.synthetic) agg.input += part.text
                  }
                  if (part.type === "file") agg.parts.push(strip(part))
                  return agg
                },
                { input: "", parts: [] as PromptInfo["parts"] },
              )
              props.setPrompt(promptInfo)
            }

            dialog.clear()
          },
        },
        {
          title: "Copy",
          value: "message.copy",
          description: "message text to clipboard",
          onSelect: async (dialog) => {
            const msg = message()
            if (!msg) return

            const parts = sync.data.part[msg.id]
            const text = parts.reduce((agg, part) => {
              if (part.type === "text" && !part.synthetic) {
                agg += part.text
              }
              return agg
            }, "")

            await Clipboard.copy(text)
            dialog.clear()
          },
        },
        {
          title: "Rewind",
          value: "session.rewind",
          description: "remove selected and later messages",
          onSelect: async (dialog) => {
            const msg = message()
            if (!msg) return

            const confirmed = await DialogConfirm.show(
              dialog,
              "Rewind to Message?",
              rewindConfirmDescription(msg.id),
            )
            if (!confirmed) return

            const promptInfo = props.setPrompt
              ? sync.data.part[msg.id].reduce(
                  (agg, part) => {
                    if (part.type === "text") {
                      if (!part.synthetic) agg.input += part.text
                    }
                    if (part.type === "file") agg.parts.push(part)
                    return agg
                  },
                  { input: "", parts: [] as PromptInfo["parts"] },
                )
              : undefined

            try {
              await sdk.client.session.rewind({
                sessionID: props.sessionID,
                messageID: msg.id,
              })

              await sync.session.forceSync(props.sessionID)

              if (promptInfo) props.setPrompt?.(promptInfo)
              dialog.clear()
            } catch (error) {
              toast.show({
                title: "Rewind failed",
                message: errorMessage(error),
                variant: "error",
              })
            }
          },
        },
        {
          title: "Fork",
          value: "session.fork",
          description: "create a new session",
          onSelect: async (dialog) => {
            const result = await sdk.client.session.fork({
              sessionID: props.sessionID,
              messageID: props.messageID,
            })
            const msg = message()
            const prompt = msg
              ? sync.data.part[msg.id].reduce(
                  (agg, part) => {
                    if (part.type === "text") {
                      if (!part.synthetic) agg.input += part.text
                    }
                    if (part.type === "file") agg.parts.push(part)
                    return agg
                  },
                  { input: "", parts: [] as PromptInfo["parts"] },
                )
              : undefined
            route.navigate({
              sessionID: result.data!.id,
              type: "session",
              prompt,
            })
            dialog.clear()
          },
        },
      ]}
    />
  )
}
