import { describe, expect, test } from "bun:test"
import type { KeyEvent } from "@opentui/core"
import { accept } from "../../../src/cli/cmd/tui/component/prompt/autocomplete"
import { Keybind } from "../../../src/util/keybind"

function match(cfg: string) {
  return (key: string, evt: KeyEvent) => {
    if (key !== "input_submit") return false
    const info = Keybind.fromParsedKey(evt)
    return Keybind.parse(cfg).some((item) => Keybind.match(item, info))
  }
}

function key(evt: Partial<KeyEvent>): KeyEvent {
  return {
    name: evt.name ?? "return",
    ctrl: evt.ctrl ?? false,
    meta: evt.meta ?? false,
    shift: evt.shift ?? false,
    super: evt.super ?? false,
    sequence: evt.sequence ?? "",
    code: evt.code,
    option: evt.option,
    raw: evt.raw,
    capsLock: evt.capsLock,
    numLock: evt.numLock,
  } as KeyEvent
}

describe("autocomplete accept", () => {
  test("uses configured submit binding", () => {
    expect(accept(match("ctrl+return,alt+return,shift+return"), key({ ctrl: true }))).toBe(true)
    expect(accept(match("ctrl+return,alt+return,shift+return"), key({}))).toBe(false)
  })

  test("allows plain return when configured", () => {
    expect(accept(match("return"), key({}))).toBe(true)
    expect(accept(match("return"), key({ ctrl: true }))).toBe(false)
  })
})
