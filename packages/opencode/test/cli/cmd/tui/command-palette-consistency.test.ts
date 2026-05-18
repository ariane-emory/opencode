import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

describe("command palette consistency", () => {
  const sessionPath = join(
    __dirname,
    "../../../../src/cli/cmd/tui/routes/session/index.tsx",
  )
  const appPath = join(
    __dirname,
    "../../../../src/cli/cmd/tui/app.tsx",
  )

  test("session/index.tsx should not have session.toggle.* or session.sidebar.toggle commands", () => {
    const content = readFileSync(sessionPath, "utf-8")

    // These patterns should NOT exist in session/index.tsx
    // They should be in app.tsx as app.toggle.*
    const forbiddenPatterns = [
      'value: "session.toggle.timestamps"',
      'value: "session.toggle.thinking"',
      'value: "session.toggle.actions"',
      'value: "session.toggle.scrollbar"',
      'value: "session.toggle.generic_tool_output"',
      'value: "session.sidebar.toggle"',
    ]

    for (const pattern of forbiddenPatterns) {
      expect(content).not.toContain(pattern)
    }
  })

  test("app.tsx should have corresponding app.toggle.* commands", () => {
    const content = readFileSync(appPath, "utf-8")

    // These patterns should exist in app.tsx
    const expectedPatterns = [
      'name: "app.toggle.timestamps"',
      'name: "app.toggle.thinking"',
      'name: "app.toggle.tooldetails"',
      'name: "app.toggle.scrollbar"',
      'name: "app.toggle.generic_tool_output"',
      'name: "app.toggle.sidebar"',
    ]

    for (const pattern of expectedPatterns) {
      expect(content).toContain(pattern)
    }
  })
})
