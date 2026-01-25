import { TextAttributes, ScrollBoxRenderable } from "@opentui/core"
import { useKeyboard } from "@opentui/solid"
import { useDialog } from "../../ui/dialog"
import { useTheme } from "@tui/context/theme"
import type { Part, AssistantMessage } from "@opencode-ai/sdk/v2"
import { Clipboard } from "../../util/clipboard"
import { useToast } from "../../ui/toast"
import { createSignal, Show } from "solid-js"

interface DialogInspectProps {
  message: AssistantMessage
  parts: Part[]
}

function toYaml(obj: any, indent = 0): string {
  if (obj === null) return "null"
  if (obj === undefined) return "undefined"
  if (typeof obj !== "object") return String(obj)

  const spaces = " ".repeat(indent)

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]"
    return obj
      .map((item) => {
        if (typeof item === "object" && item !== null) {
          return `\n${spaces}- ${toYaml(item, indent + 2).trimStart()}`
        }
        return `\n${spaces}- ${String(item)}`
      })
      .join("")
  }

  const keys = Object.keys(obj)
  if (keys.length === 0) return "{}"

  return keys
    .map((key) => {
      const value = obj[key]
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value) && value.length === 0) return `\n${spaces}${key}: []`
        if (Object.keys(value).length === 0) return `\n${spaces}${key}: {}`
        return `\n${spaces}${key}:${toYaml(value, indent + 2)}`
      }
      if (typeof value === "string" && value.includes("\n")) {
        return `\n${spaces}${key}: |\n${value
          .split("\n")
          .map((l) => spaces + "  " + l)
          .join("\n")}`
      }
      return `\n${spaces}${key}: ${String(value)}`
    })
    .join("")
}

function PartView(props: { part: Part; theme: any; syntax: any }) {
  const { part, theme, syntax } = props

  if (part.type === "text") {
    return (
      <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
        <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
          Text
        </text>
        <text fg={theme.text}>{part.text}</text>
      </box>
    )
  }

  if (part.type === "patch") {
    return (
      <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
        <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
          Patch ({part.hash.substring(0, 7)})
        </text>
        <text fg={theme.text}>Updated files:</text>
        <box flexDirection="column" marginLeft={2}>
          {part.files.map((f) => (
            <text fg={theme.text}>- {f}</text>
          ))}
        </box>
      </box>
    )
  }

  if (part.type === "tool") {
    return (
      <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
        <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
          Tool Use: {part.tool} ({part.state.status})
        </text>
        <box marginTop={1}>
          <text fg={theme.textMuted}>Input:</text>
          <text fg={theme.text}>{toYaml(part.state.input).trim()}</text>
        </box>
        <Show when={part.state.status === "completed" && (part.state as any).output}>
          <box marginTop={1}>
            <text fg={theme.textMuted}>Output:</text>
            <text fg={theme.text}>{(part.state as any).output}</text>
          </box>
        </Show>
        <Show when={part.state.status === "error" && (part.state as any).error}>
          <box marginTop={1}>
            <text fg={theme.error}>Error:</text>
            <text fg={theme.error}>{(part.state as any).error}</text>
          </box>
        </Show>
      </box>
    )
  }

  if (part.type === "reasoning") {
    return (
      <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
        <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
          Reasoning
        </text>
        <text fg={theme.text}>{part.text}</text>
      </box>
    )
  }

  if (part.type === "file") {
    return (
      <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
        <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
          File Attachment
        </text>
        <text fg={theme.text}>Name: {part.filename || "Unknown"}</text>
        <text fg={theme.textMuted}>Mime: {part.mime}</text>
        <text fg={theme.textMuted}>URL: {part.url}</text>
      </box>
    )
  }

  return (
    <box flexDirection="column" borderColor={theme.borderSubtle} borderStyle="single" padding={1}>
      <text attributes={TextAttributes.BOLD} fg={theme.textMuted}>
        {part.type}
      </text>
      <code
        filetype="json"
        content={JSON.stringify(part, null, 2)}
        syntaxStyle={syntax()}
        drawUnstyledText={true}
        fg={theme.text}
      />
    </box>
  )
}

export function DialogInspect(props: DialogInspectProps) {
  const { theme, syntax } = useTheme()
  const dialog = useDialog()
  const toast = useToast()

  // State for raw mode
  const [showRaw, setShowRaw] = createSignal(false)

  // Set dialog size to large
  dialog.setSize("xlarge")

  // Ref to scrollbox for keyboard scrolling
  let scrollRef: ScrollBoxRenderable | undefined

  const handleCopy = () => {
    Clipboard.copy(JSON.stringify(props.parts, null, 2))
      .then(() => toast.show({ message: "Message copied to clipboard", variant: "success" }))
      .catch(() => toast.show({ message: "Failed to copy message", variant: "error" }))
  }

  const handleToggleRaw = () => {
    setShowRaw((prev) => !prev)
  }

  // Keyboard shortcuts
  useKeyboard((evt) => {
    // C - Copy
    if (evt.name === "c" && !evt.ctrl && !evt.meta) {
      evt.preventDefault()
      handleCopy()
    }

    // S - Toggle raw/parsed
    if (evt.name === "s" && !evt.ctrl && !evt.meta) {
      evt.preventDefault()
      handleToggleRaw()
    }

    // Arrow keys - scroll 1 line
    if (evt.name === "down") {
      evt.preventDefault()
      scrollRef?.scrollBy(1)
    }

    if (evt.name === "up") {
      evt.preventDefault()
      scrollRef?.scrollBy(-1)
    }

    // Page keys - scroll page
    if (evt.name === "pagedown") {
      evt.preventDefault()
      if (scrollRef) {
        scrollRef.scrollBy(scrollRef.height)
      }
    }

    if (evt.name === "pageup") {
      evt.preventDefault()
      if (scrollRef) {
        scrollRef.scrollBy(-scrollRef.height)
      }
    }
  })

  return (
    <box paddingLeft={2} paddingRight={2} gap={1} height="100%">
      <box flexDirection="row" justifyContent="space-between" flexShrink={0}>
        <text attributes={TextAttributes.BOLD} fg={theme.text}>
          Message Inspection ({props.message.id})
        </text>
        <box onMouseUp={() => dialog.clear()}>
          <text fg={theme.textMuted}>[esc]</text>
        </box>
      </box>

      <scrollbox
        ref={(r: ScrollBoxRenderable) => {
          scrollRef = r
        }}
        flexGrow={1}
        border={["bottom", "top"]}
        borderColor={theme.borderSubtle}
      >
        <Show
          when={!showRaw()}
          fallback={
            <code
              filetype="json"
              content={JSON.stringify(props.parts, null, 2)}
              syntaxStyle={syntax()}
              drawUnstyledText={true}
              fg={theme.text}
            />
          }
        >
          <box flexDirection="column" gap={1}>
            {props.parts
              .filter((p) => !["step-start", "step-finish", "reasoning"].includes(p.type))
              .map((part) => (
                <PartView part={part} theme={theme} syntax={syntax} />
              ))}
          </box>
        </Show>
      </scrollbox>

      <box flexDirection="row" justifyContent="space-between" paddingBottom={1} flexShrink={0} gap={1}>
        <box flexDirection="row" gap={2}>
          <text fg={theme.textMuted}>↑↓ scroll</text>
          <text fg={theme.textMuted}>PgUp/PgDn page</text>
          <text fg={theme.textMuted}>S toggle</text>
          <text fg={theme.textMuted}>C copy</text>
        </box>
        <box flexDirection="row" gap={1}>
          <box
            paddingLeft={2}
            paddingRight={2}
            borderStyle="single"
            borderColor={theme.borderSubtle}
            onMouseUp={handleToggleRaw}
          >
            <text fg={theme.text}>{showRaw() ? "Show Parsed" : "Show Raw"}</text>
          </box>
          <box paddingLeft={2} paddingRight={2} borderStyle="single" borderColor={theme.border} onMouseUp={handleCopy}>
            <text fg={theme.text}>Copy</text>
          </box>
        </box>
      </box>
    </box>
  )
}
