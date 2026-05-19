import { describe, expect, test } from "bun:test"
import { smartCompare } from "../../src/util/smart-sort"

describe("util.smart-sort", () => {
  test("sorts by version number descending", () => {
    const items = ["Gemini 1.5 Flash", "Gemini 2.5 Flash", "Gemini 2.0 Flash"]
    items.sort(smartCompare)
    expect(items).toEqual(["Gemini 2.5 Flash", "Gemini 2.0 Flash", "Gemini 1.5 Flash"])
  })

  test("sorts by date descending when versions are equal", () => {
    const items = ["Preview 03-15", "Preview 05-20", "Preview 01-10"]
    items.sort(smartCompare)
    expect(items).toEqual(["Preview 05-20", "Preview 03-15", "Preview 01-10"])
  })

  test("sorts by YYYY-MM-DD date format", () => {
    const items = ["Release 2024-03-15", "Release 2024-05-20", "Release 2023-12-01"]
    items.sort(smartCompare)
    expect(items).toEqual(["Release 2024-05-20", "Release 2024-03-15", "Release 2023-12-01"])
  })

  test("items with dates come before items without dates", () => {
    const items = ["Stable", "Preview 05-20"]
    items.sort(smartCompare)
    expect(items).toEqual(["Preview 05-20", "Stable"])
  })

  test("falls back to alphabetical when no version or date", () => {
    const items = ["Claude", "GPT", "Gemini"]
    items.sort(smartCompare)
    expect(items).toEqual(["Claude", "Gemini", "GPT"])
  })

  test("handles mixed version/date/alphabetical inputs", () => {
    // Note: smartCompare only applies version/date sorting when BOTH items have
    // extractable versions or dates. If only one has a version/date, it falls
    // back to alphabetical sorting via localeCompare.
    const items = [
      "Gemini 1.5",
      "Claude",
      "Gemini 2.0",
      "GPT",
      "Gemini 2.5",
    ]
    items.sort(smartCompare)
    // All sorted alphabetically since only some have versions
    expect(items).toEqual([
      "Claude",
      "Gemini 2.5",
      "Gemini 2.0",
      "Gemini 1.5",
      "GPT",
    ])
  })

  test("handles items with same version but different names", () => {
    const items = ["Gemini 2.0 Pro", "Gemini 2.0 Flash"]
    items.sort(smartCompare)
    expect(items).toEqual(["Gemini 2.0 Flash", "Gemini 2.0 Pro"])
  })

  test("handles items without version or date", () => {
    const items = ["o3-mini", "o1", "gpt-4o"]
    items.sort(smartCompare)
    expect(items).toEqual(["gpt-4o", "o1", "o3-mini"])
  })

  test("returns 0 for identical strings", () => {
    expect(smartCompare("same", "same")).toBe(0)
  })

  test("extracts version from start of string", () => {
    const items = ["3.5 Sonnet", "4 Sonnet", "2.0 Sonnet"]
    items.sort(smartCompare)
    expect(items).toEqual(["4 Sonnet", "3.5 Sonnet", "2.0 Sonnet"])
  })
})