import { describe, expect, test } from "bun:test"
import { Database } from "../../src/storage"

describe("Database.Path", () => {
  test("respects OPENCODE_DB env override", () => {
    expect(Database.Path).toBe(":memory:")
  })
})
