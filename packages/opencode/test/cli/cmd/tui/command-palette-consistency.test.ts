import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

describe("command palette consistency", () => {
  const sessionPath = join(
    __dirname,
    "../../../../../../packages/tui/src/routes/session/index.tsx",
  )
  const appPath = join(
    __dirname,
    "../../../../../../packages/tui/src/app.tsx",
  )

  test("session/index.tsx should not have session.toggle.* or session.sidebar.toggle commands", () => {
    const content = readFileSync(sessionPath, "utf-8")

    // These patterns should NOT exist in session/index.tsx.
    // They live in app.tsx as System-category commands instead.
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

  test("app.tsx should have corresponding System-category toggle commands", () => {
    const content = readFileSync(appPath, "utf-8")

    // These toggles persist across sessions, so they belong in the System
    // category. Their names are unchanged from the original Session versions.
    const expectedPatterns = [
      'name: "session.toggle.timestamps"',
      'name: "session.toggle.thinking"',
      'name: "session.toggle.actions"',
      'name: "session.toggle.scrollbar"',
      'name: "session.toggle.generic_tool_output"',
      'name: "session.sidebar.toggle"',
    ]

    for (const pattern of expectedPatterns) {
      expect(content).toContain(pattern)
    }
  })
})
