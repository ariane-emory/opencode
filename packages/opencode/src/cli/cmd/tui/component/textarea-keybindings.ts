import { createMemo } from "solid-js"
import type { KeyBinding } from "@opentui/core"
import { useKeybind } from "../context/keybind"
import { Keybind } from "@/util/keybind"

const TEXTAREA_ACTIONS = [
  "submit",
  "newline",
  "move-left",
  "move-right",
  "move-up",
  "move-down",
  "select-left",
  "select-right",
  "select-up",
  "select-down",
  "line-home",
  "line-end",
  "select-line-home",
  "select-line-end",
  "visual-line-home",
  "visual-line-end",
  "select-visual-line-home",
  "select-visual-line-end",
  "buffer-home",
  "buffer-end",
  "select-buffer-home",
  "select-buffer-end",
  "delete-line",
  "delete-to-line-end",
  "delete-to-line-start",
  "backspace",
  "delete",
  "undo",
  "redo",
  "word-forward",
  "word-backward",
  "select-word-forward",
  "select-word-backward",
  "delete-word-forward",
  "delete-word-backward",
] as const

function mapTextareaKeybindings(
  keybinds: Record<string, Keybind.Info[]>,
  action: (typeof TEXTAREA_ACTIONS)[number],
): KeyBinding[] {
  const configKey = `input_${action.replace(/-/g, "_")}`
  const bindings = keybinds[configKey]
  if (!bindings) return []
  return bindings.map((binding) => ({
    name: binding.name,
    ctrl: binding.ctrl || undefined,
    meta: binding.meta || undefined,
    shift: binding.shift || undefined,
    super: binding.super || undefined,
    action,
  }))
}

export function useTextareaKeybindings() {
  const keybind = useKeybind()

  return createMemo(() => {
    const keybinds = keybind.all

    // Get user-defined bindings first
    const userBindings = TEXTAREA_ACTIONS.flatMap((action) =>
      mapTextareaKeybindings(keybinds, action),
    )

    // Check if user has configured each action
    const hasSubmitBinding = userBindings.some((b) => b.action === "submit")
    const hasNewlineBinding = userBindings.some((b) => b.action === "newline")

    // Build defaults array, only adding defaults for unconfigured actions
    const defaults: KeyBinding[] = []
    if (!hasSubmitBinding) {
      defaults.push({ name: "return", action: "submit" })
    }
    if (!hasNewlineBinding) {
      defaults.push({ name: "return", meta: true, action: "newline" })
    }

    // User bindings come first so they take precedence over defaults
    return [...userBindings, ...defaults] satisfies KeyBinding[]
  })
}
