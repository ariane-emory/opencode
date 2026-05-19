import { describe, expect, test } from "bun:test"
import { readFileSync } from "fs"
import { join } from "path"

describe("build script version format", () => {
  const scriptPath = join(
    __dirname,
    "../../../script/src/index.ts",
  )

  test("script must contain integration branch regex pattern", () => {
    const content = readFileSync(scriptPath, "utf-8")
    expect(content).toContain('/^integration\\/(\\d{4}-\\d{2}-\\d{2}-\\d{2}-\\d{2})$/')
  })

  test("script must check for integration match and return short version", () => {
    const content = readFileSync(scriptPath, "utf-8")
    expect(content).toContain('const integrationMatch = CHANNEL.match')
    expect(content).toContain('if (integrationMatch)')
    expect(content).toContain('return integrationMatch[1]')
  })

  test("script must fall back to old preview format for non-integration branches", () => {
    const content = readFileSync(scriptPath, "utf-8")
    expect(content).toContain('0.0.0-${CHANNEL}')
  })
})
