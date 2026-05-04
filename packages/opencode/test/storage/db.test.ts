import { describe, expect, test } from "bun:test"
import { Database } from "@/storage/db"

describe("Database.Path", () => {
  test("respects OPENCODE_DB env override", () => {
    expect(Database.Path).toBe(":memory:")
  })
})
