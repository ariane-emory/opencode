import { describe, expect, test } from "bun:test"
import { tieredMatch } from "../../src/util/tiered-match"

describe("util.tiered-match", () => {
  test("returns all items when needle is empty", () => {
    const items = [
      { title: "Alpha", category: "Group A" },
      { title: "Beta", category: "Group B" },
    ]
    expect(tieredMatch(items, "")).toEqual(items)
  })

  test("places prefix matches in tier 1", () => {
    const items = [
      { title: "Gamma", category: "Group A" },
      { title: "Alpha", category: "Group B" },
    ]
    const result = tieredMatch(items, "al")
    expect(result[0].title).toBe("Alpha")
    expect(result.length).toBe(1)
  })

  test("places substring title matches in tier 2", () => {
    const items = [
      { title: "Gamma", category: "Group A" },
      { title: "Alphabet", category: "Group B" },
    ]
    const result = tieredMatch(items, "pha")
    expect(result[0].title).toBe("Alphabet")
  })

  test("places category prefix matches in tier 2", () => {
    const items = [
      { title: "X", category: "Alpha Group" },
      { title: "Y", category: "Beta Group" },
    ]
    const result = tieredMatch(items, "alp")
    expect(result[0].title).toBe("X")
  })

  test("places category substring matches in tier 3", () => {
    const items = [
      { title: "X", category: "Gamma Group" },
      { title: "Y", category: "Alpha Group" },
    ]
    const result = tieredMatch(items, "group")
    expect(result.length).toBe(2)
    // Should be sorted alphabetically by title
    expect(result[0].title).toBe("X")
    expect(result[1].title).toBe("Y")
  })

  test("places description matches in tier 3", () => {
    const items = [
      { title: "X", category: "A", description: "Beta feature" },
      { title: "Y", category: "B", description: "Alpha feature" },
    ]
    const result = tieredMatch(items, "feat")
    expect(result.length).toBe(2)
    expect(result[0].title).toBe("X")
    expect(result[1].title).toBe("Y")
  })

  test("tiers are ordered correctly: prefix before substring before description", () => {
    const items = [
      { title: "Alphabet", category: "Group A", description: "Zeta" },
      { title: "Alpha", category: "Group B", description: "Beta" },
      { title: "Beta", category: "Alpha Group", description: "Gamma" },
    ]
    const result = tieredMatch(items, "alp")
    // Tier 1: title starts with "alp" -> "Alphabet", "Alpha"
    // Tier 2: category starts with "alp" -> "Beta" (category "Alpha Group")
    expect(result[0].title).toBe("Alpha")
    expect(result[1].title).toBe("Alphabet")
    expect(result[2].title).toBe("Beta")
  })

  test("sorts within each tier alphabetically", () => {
    const items = [
      { title: "Charlie" },
      { title: "Alpha" },
      { title: "Bravo" },
    ]
    const result = tieredMatch(items, "a")
    // All start with "a" (after lowercasing), so all in tier 1
    expect(result.map((x) => x.title)).toEqual(["Alpha", "Bravo", "Charlie"])
  })

  test("is case insensitive", () => {
    const items = [
      { title: "UPPER", category: "GROUP" },
      { title: "lower", category: "group" },
    ]
    const result = tieredMatch(items, "UP")
    expect(result[0].title).toBe("UPPER")
    const result2 = tieredMatch(items, "up")
    expect(result2[0].title).toBe("UPPER")
  })

  test("handles items with no category or description", () => {
    const items = [
      { title: "Alpha" },
      { title: "Beta" },
    ]
    const result = tieredMatch(items, "alp")
    expect(result[0].title).toBe("Alpha")
  })

  test("filters out non-matching items", () => {
    const items = [
      { title: "Alpha", category: "Group A" },
      { title: "Beta", category: "Group B" },
    ]
    const result = tieredMatch(items, "zzz")
    expect(result.length).toBe(0)
  })

  test("uses smartCompare for sorting within tiers", () => {
    const items = [
      { title: "Gemini 1.5" },
      { title: "Gemini 2.0" },
      { title: "Gemini 1.0" },
    ]
    const result = tieredMatch(items, "gemini")
    // All in tier 2 (substring match), sorted by version descending
    expect(result.map((x) => x.title)).toEqual(["Gemini 2.0", "Gemini 1.5", "Gemini 1.0"])
  })
})