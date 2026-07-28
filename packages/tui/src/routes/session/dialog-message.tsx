import { createMemo } from "solid-js"
import { useSync } from "../../context/sync"
import { DialogSelect } from "../../ui/dialog-select"
import { useSDK } from "../../context/sdk"
import { useRoute } from "../../context/route"
import { useToast } from "../../ui/toast"
import { useClipboard } from "../../context/clipboard"
import type { PromptInfo } from "../../component/prompt/history"
import { stripPromptPartIDs as strip } from "../../prompt/part"
import { errorMessage } from "../../util/error"
import { DialogConfirm } from "../../ui/dialog-confirm"

export function DialogMessage(props: {
  messageID: string
  sessionID: string
  setPrompt?: (prompt: PromptInfo) => void
}) {
  const sync = useSync()
  const sdk = useSDK()
  const toast = useToast()
  const message = createMemo(() => sync.data.message[props.sessionID]?.find((x) => x.id === props.messageID))
  const route = useRoute()
  const clipboard = useClipboard()

  function buildMessagePreview(messageID: string): string {
    const parts = sync.data.part[messageID] ?? []
    const text = parts.reduce((agg, part) => {
      if (part.type === "text" && !part.synthetic) agg += part.text
      return agg
    }, "")
    const lines = text.split("\n")
    const maxContentLines = 10
    const maxContentChars = 500
    const previewLines: string[] = []
    let chars = 0
    let truncated = false
    for (const line of lines) {
      if (previewLines.length >= maxContentLines) {
        truncated = true
        break
      }
      if (chars + line.length > maxContentChars && previewLines.length > 0) {
        truncated = true
        break
      }
      previewLines.push(line)
      chars += line.length + 1
    }
    while (previewLines.length > 0 && previewLines.at(-1)!.trim().length === 0) {
      previewLines.pop()
    }
    const preview = ["Are you sure you want to rewind to this message?", "", ...previewLines]
    if (truncated) preview.push("...")
    return preview.join("\n")
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

            await clipboard.write?.(text)
            dialog.clear()
          },
        },
        {
          title: "Rewind",
          value: "session.rewind",
          description: "remove selected and later messages",
          onSelect: (dialog) => {
            const msg = message()
            if (!msg) return

            setTimeout(async () => {
              let confirmed: boolean | undefined
              try {
                confirmed = await DialogConfirm.show(
                  dialog,
                  "Rewind to Message?",
                  buildMessagePreview(msg.id),
                )
              } catch (error) {
                toast.show({
                  title: "Rewind failed",
                  message: errorMessage(error),
                  variant: "error",
                })
                return
              }
              if (!confirmed) return

              const promptInfo = props.setPrompt
                ? (sync.data.part[msg.id] ?? []).reduce(
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
            }, 0)
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
