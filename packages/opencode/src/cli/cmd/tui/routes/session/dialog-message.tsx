import { createMemo } from "solid-js"
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

  function buildMessagePreview(messageID: string): string {
    const parts = sync.data.part[messageID]
    const text = parts.reduce((agg, part) => {
      if (part.type === "text" && !part.synthetic) {
        agg += part.text
      }
      return agg
    }, "")
    const lines = text.split("\n").filter((line) => line.length > 0)
    const previewLines = lines.slice(0, 10)
    const suffix = lines.length > 10 ? "\n..." : ""
    return ["Are you sure you want to rewind to this message?", "", ...previewLines, suffix]
      .filter((line) => line !== undefined)
      .join("\n")
  }

  return (
    <DialogSelect
      sort={true}
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
              buildMessagePreview(msg.id),
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
