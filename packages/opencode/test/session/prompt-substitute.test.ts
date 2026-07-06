import { describe, expect, test } from "bun:test"
import { SessionPrompt } from "../../src/session/prompt"

describe("SessionPrompt.parseCommandArguments", () => {
  test("preserves quoted multi-word arguments as a single argument", () => {
    const result = SessionPrompt.parseCommandArguments('"sync|Syncing dev with upstream/dev"')
    expect(result).toEqual(["sync|Syncing dev with upstream/dev"])
  })

  test("splits remaining unquoted arguments normally", () => {
    const result = SessionPrompt.parseCommandArguments('"sync|Syncing dev with upstream/dev" tail one')
    expect(result).toEqual(["sync|Syncing dev with upstream/dev", "tail", "one"])
  })
})
