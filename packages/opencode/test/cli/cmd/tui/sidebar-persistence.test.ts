import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

const pluginDir = join(
  __dirname,
  "../../../../src/cli/cmd/tui/feature-plugins/sidebar",
)

const plugins = [
  { file: "mcp.tsx", key: "mcp" },
  { file: "lsp.tsx", key: "lsp" },
  { file: "todo.tsx", key: "todo" },
  { file: "files.tsx", key: "diff" },
]

describe("sidebar group folding persistence", () => {
  for (const { file, key } of plugins) {
    test(`${file} must persist ${key} expansion state via KV`, () => {
      const content = readFileSync(join(pluginDir, file), "utf-8")

      expect(content).toContain("createEffect")
      expect(content).toContain("kv.ready")
      expect(content).toContain(`kv.get("sidebar_expanded_${key}"`)
      expect(content).toContain(`kv.set("sidebar_expanded_${key}"`)
      expect(content).toMatch(/import.*createEffect.*from\s+["']solid-js["']/)
    })
  }
})
