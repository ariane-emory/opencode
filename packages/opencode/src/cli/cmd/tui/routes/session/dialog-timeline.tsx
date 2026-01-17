import { createMemo, onMount } from "solid-js"
import { useSync } from "@tui/context/sync"
import { DialogSelect, type DialogSelectOption } from "@tui/ui/dialog-select"
import type { TextPart } from "@opencode-ai/sdk/v2"
import { Locale } from "@/util/locale"
import { Keybind } from "@/util/keybind"
import { DialogMessage } from "./dialog-message"
import { useDialog } from "../../ui/dialog"
import type { PromptInfo } from "../../component/prompt/history"

export function DialogTimeline(props: {
  sessionID: string
  onMove: (messageID: string) => void
  setPrompt?: (prompt: PromptInfo) => void
}) {
  const sync = useSync()
  const dialog = useDialog()

  onMount(() => {
    dialog.setSize("large")
  })

  const keybinds = createMemo(() => {
    if (!props.setPrompt) return []
    return [
      {
        keybind: Keybind.parse("r")[0],
        title: "repeat",
        onTrigger: (option: DialogSelectOption<string>) => {
          const messageID = option.value
          const allParts = sync.data.part[messageID] ?? []
          const relevantParts = allParts
          const textPart = relevantParts.find((x) => x.type === "text" && !x.synthetic && !x.ignored) as TextPart | undefined
          const input = textPart?.text ?? ""
          const parts = relevantParts.filter((x) => x.type === "file" || x.type === "agent")
          props.setPrompt!({ input, parts })
          dialog.clear()
        },
      },
    ]
  })

  const options = createMemo((): DialogSelectOption<string>[] => {
    const messages = sync.data.message[props.sessionID] ?? []
    const result = [] as DialogSelectOption<string>[]
    for (const message of messages) {
      if (message.role !== "user") continue
      const part = (sync.data.part[message.id] ?? []).find(
        (x) => x.type === "text" && !x.synthetic && !x.ignored,
      ) as TextPart | undefined
      if (!part) continue
      result.push({
        title: part.text.replace(/\n/g, " "),
        value: message.id,
        footer: Locale.time(message.time.created),
        onSelect: (dialog) => {
          dialog.replace(() => (
            <DialogMessage messageID={message.id} sessionID={props.sessionID} setPrompt={props.setPrompt} />
          ))
        },
      })
    }
    result.reverse()
    return result
  })

  return (
    <DialogSelect
      onMove={(option) => props.onMove(option.value)}
      title="Timeline"
      options={options()}
      keybind={keybinds()}
    />
  )
}
