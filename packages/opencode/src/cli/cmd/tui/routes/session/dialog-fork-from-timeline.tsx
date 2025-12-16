import { createMemo, onMount } from "solid-js"
import { useSync } from "@tui/context/sync"
import { DialogSelect, type DialogSelectOption } from "@tui/ui/dialog-select"
import type { TextPart } from "@opencode-ai/sdk/v2"
import { Locale } from "@/util/locale"
import { useSDK } from "@tui/context/sdk"
import { useRoute } from "@tui/context/route"
import { useDialog } from "../../ui/dialog"
import { useToast } from "../../ui/toast"

export function DialogForkFromTimeline(props: {
  sessionID: string
  onMove: (messageID: string) => void
}) {
  const sync = useSync()
  const dialog = useDialog()
  const sdk = useSDK()
  const route = useRoute()
  const toast = useToast()

  onMount(() => {
    dialog.setSize("large")
  })

  const options = createMemo((): DialogSelectOption<string>[] => {
    const messages = sync.data.message[props.sessionID] ?? []
    const result = [] as DialogSelectOption<string>[]
    for (const message of messages) {
      if (message.role !== "user") continue
      const part = (sync.data.part[message.id] ?? []).find((x) => x.type === "text" && !x.synthetic) as TextPart
      if (!part) continue
      result.push({
        title: part.text.replace(/\n/g, " "),
        value: message.id,
        footer: Locale.time(message.time.created),
        onSelect: async (dialog) => {
          try {
            const result = await sdk.client.session.fork({
              sessionID: props.sessionID,
              messageID: message.id,
            })
            
            console.log("Fork result:", JSON.stringify(result, null, 2))
            
            if (!result.data || !result.data.id) {
              console.error("Invalid fork result:", result)
              dialog.clear()
              return
            }
            
            route.navigate({
              sessionID: result.data.id,
              type: "session",
            })
            toast.show({
              message: "Session forked.",
              variant: "info",
              duration: 3000,
            })
            dialog.clear()
          } catch (error) {
            console.error("Fork failed:", error)
            dialog.clear()
          }
        },
      })
    }
    result.reverse()
    return result
  })

  return <DialogSelect onMove={(option) => props.onMove(option.value)} title="Fork from message" options={options()} />
}
