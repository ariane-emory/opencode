import { describe, expect, test } from "bun:test"
import { Database } from "@/storage/db"

describe("Database.getPath", () => {
  test("respects OPENCODE_DB env override", () => {
    expect(Database.getPath()).toBe(":memory:")
  })
})
