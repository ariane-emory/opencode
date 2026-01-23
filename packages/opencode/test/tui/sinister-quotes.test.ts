import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

/**
 * This test ensures that the sinister-quotes placeholder format is preserved.
 *
 * The sinister-quotes feature removes the "Ask anything..." prefix from placeholders,
 * showing only the quote itself. During merges, this change is frequently clobbered
 * by the old format being restored.
 *
 * CORRECT format: `${PLACEHOLDERS[store.placeholder]}`
 * WRONG format:   `Ask anything... "${PLACEHOLDERS[store.placeholder]}"`
 *
 * If this test fails after a merge, the sinister-quotes formatting was lost.
 * See AGENTS.md for merge instructions.
 */
describe("sinister-quotes placeholder format", () => {
  test("TUI prompt should NOT contain 'Ask anything' prefix in placeholder", () => {
    const path = join(
      import.meta.dir,
      "../../src/cli/cmd/tui/component/prompt/index.tsx",
    )
    const content = readFileSync(path, "utf-8")

    // The sinister-quotes feature removes the "Ask anything..." prefix
    // If this assertion fails, a merge clobbered the sinister-quotes formatting
    expect(content).not.toMatch(/placeholder=.*`Ask anything/)
    expect(content).not.toMatch(/placeholder=.*"\$\{PLACEHOLDERS/)
  })

  test("Web app prompt should NOT contain 'Ask anything' prefix", () => {
    const path = join(
      import.meta.dir,
      "../../../app/src/components/prompt-input.tsx",
    )
    const content = readFileSync(path, "utf-8")

    // Check that the placeholder doesn't use the old format in actual code
    // The regex matches the pattern in code, not in comments (which show WRONG example)
    // Look for: `Ask anything... followed by ${PLACEHOLDERS (actual usage pattern)
    expect(content).not.toMatch(/: `Ask anything\.\.\. "\$\{PLACEHOLDERS/)
  })

  test("Shared placeholders module should contain sinister quotes", () => {
    const sharedPath = join(
      import.meta.dir,
      "../../../ui/src/constants/placeholders.ts",
    )
    const sharedContent = readFileSync(sharedPath, "utf-8")

    // The shared module should contain sinister-themed placeholder quotes
    expect(sharedContent).toContain("The cake is a lie")
    expect(sharedContent).toContain("SINISTER_PLACEHOLDERS")
  })

  test("Both TUI and web app should import from shared module", () => {
    const tuiPath = join(
      import.meta.dir,
      "../../src/cli/cmd/tui/component/prompt/index.tsx",
    )
    const webPath = join(
      import.meta.dir,
      "../../../app/src/components/prompt-input.tsx",
    )

    const tuiContent = readFileSync(tuiPath, "utf-8")
    const webContent = readFileSync(webPath, "utf-8")

    // Both should import PLACEHOLDERS from the shared module
    expect(tuiContent).toContain("@opencode-ai/ui/constants/placeholders")
    expect(webContent).toContain("@opencode-ai/ui/constants/placeholders")
  })
})
