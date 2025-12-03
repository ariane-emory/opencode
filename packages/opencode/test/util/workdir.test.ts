import { describe, test, expect, afterEach } from "bun:test"
import { getWorkingDirectory } from "@/util/workdir"

describe("getWorkingDirectory", () => {
  const originalEnv = process.env.OPENCODE_ORIGINAL_CWD

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.OPENCODE_ORIGINAL_CWD
    } else {
      process.env.OPENCODE_ORIGINAL_CWD = originalEnv
    }
  })

  test("returns OPENCODE_ORIGINAL_CWD when set", () => {
    process.env.OPENCODE_ORIGINAL_CWD = "/test/directory"
    expect(getWorkingDirectory()).toBe("/test/directory")
  })

  test("falls back to process.cwd() when not set", () => {
    delete process.env.OPENCODE_ORIGINAL_CWD
    expect(getWorkingDirectory()).toBe(process.cwd())
  })
})
