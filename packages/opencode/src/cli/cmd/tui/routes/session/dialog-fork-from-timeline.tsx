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
            
            if (!result.data || !result.data.id) {
              toast.show({
                title: "Fork Failed",
                message: `Invalid API response: ${JSON.stringify(result)}`,
                variant: "error",
                duration: 5000,
              })
              dialog.clear()
              return
            }
            
            route.navigate({
              sessionID: result.data.id,
              type: "session",
            })
            dialog.clear()
          } catch (error) {
            toast.show({
              title: "Fork Failed",
              message: error instanceof Error ? error.message : String(error),
              variant: "error",
              duration: 5000,
            })
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
