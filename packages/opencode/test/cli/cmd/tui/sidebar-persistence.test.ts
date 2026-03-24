import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

describe("sidebar group folding persistence", () => {
  const sidebarPath = join(
    __dirname,
    "../../../../src/cli/cmd/tui/routes/session/sidebar.tsx",
  )

  test("sidebar.tsx must contain KV persistence code", () => {
    const content = readFileSync(sidebarPath, "utf-8")

    // Test 1: Must have setExpandedWithPersist function
    expect(content).toContain("setExpandedWithPersist")
    expect(content).toContain(
      '(key: "mcp" | "diff" | "todo" | "lsp", value: boolean)',
    )

    // Test 2: Must have createEffect that loads from KV
    expect(content).toContain("createEffect")
    expect(content).toContain("kv.ready")
    expect(content).toContain('kv.get("sidebar_expanded_mcp"')
    expect(content).toContain('kv.get("sidebar_expanded_diff"')
    expect(content).toContain('kv.get("sidebar_expanded_todo"')
    expect(content).toContain('kv.get("sidebar_expanded_lsp"')

    // Test 3: Must persist to KV when toggling
    expect(content).toContain('kv.set(`sidebar_expanded_${key}`')
  })

  test("sidebar.tsx must persist all four group types", () => {
    const content = readFileSync(sidebarPath, "utf-8")
    const groups = ["mcp", "diff", "todo", "lsp"]

    for (const group of groups) {
      expect(content).toContain(`sidebar_expanded_${group}`)
    }
  })

  test("sidebar.tsx must use createEffect import for KV loading", () => {
    const content = readFileSync(sidebarPath, "utf-8")

    // Must import createEffect from solid-js (not just createMemo, etc.)
    expect(content).toMatch(/import.*createEffect.*from\s+["']solid-js["']/)
  })
})
