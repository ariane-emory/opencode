import { describe, expect, test } from "bun:test"
import { SessionPrompt } from "../../src/session/prompt"

describe("SessionPrompt.substituteArguments", () => {
  test("${1} should return single argument (no swallowing)", () => {
    const result = SessionPrompt.substituteArguments("Hello ${1}", ["foo", "bar", "baz"])
    expect(result.result).toBe("Hello foo")
    expect(result.hasPlaceholders).toBe(true)
  })

  test("${2} should return single argument (no swallowing)", () => {
    const result = SessionPrompt.substituteArguments("Hello ${2}", ["foo", "bar", "baz"])
    expect(result.result).toBe("Hello bar")
  })

  test("${2:3} should return 2nd and 3rd arguments joined by space", () => {
    const result = SessionPrompt.substituteArguments("Hello ${2:3}", ["foo", "bar", "baz", "qux"])
    expect(result.result).toBe("Hello bar baz")
  })

  test("${:3} should return 1st through 3rd arguments joined by space", () => {
    const result = SessionPrompt.substituteArguments("Hello ${:3}", ["foo", "bar", "baz", "qux"])
    expect(result.result).toBe("Hello foo bar baz")
  })

  test("${2:} should return 2nd through last arguments joined by space", () => {
    const result = SessionPrompt.substituteArguments("Hello ${2:}", ["foo", "bar", "baz", "qux"])
    expect(result.result).toBe("Hello bar baz qux")
  })

  test("${:} should return all arguments joined by space", () => {
    const result = SessionPrompt.substituteArguments("Hello ${:}", ["foo", "bar", "baz", "qux"])
    expect(result.result).toBe("Hello foo bar baz qux")
  })

  test("should skip empty arguments when joining slices", () => {
    const result = SessionPrompt.substituteArguments("Hello ${:}", ["foo", "", "bar", "", "baz"])
    expect(result.result).toBe("Hello foo bar baz")
  })

  test("$1 should swallow remaining args (backward compatibility)", () => {
    const result = SessionPrompt.substituteArguments("Hello $1", ["foo", "bar", "baz"])
    expect(result.result).toBe("Hello foo bar baz")
  })

  test("$2 should swallow remaining args (backward compatibility)", () => {
    const result = SessionPrompt.substituteArguments("Hello $2", ["foo", "bar", "baz"])
    expect(result.result).toBe("Hello bar baz")
  })

  test("${1} should NOT swallow - different from $1", () => {
    const extended = SessionPrompt.substituteArguments("Hello ${1}", ["foo", "bar"])
    const simple = SessionPrompt.substituteArguments("Hello $1", ["foo", "bar"])
    expect(extended.result).toBe("Hello foo")
    expect(simple.result).toBe("Hello foo bar")
    expect(extended.result).not.toBe(simple.result)
  })

  test("mixed syntax should work together", () => {
    const result = SessionPrompt.substituteArguments("First: ${1}, Second: $2, Rest: ${3:}", [
      "a",
      "b",
      "c",
      "d",
    ])
    expect(result.result).toBe("First: a, Second: b c d, Rest: c d")
  })

  test("out of bounds should return empty string", () => {
    const result = SessionPrompt.substituteArguments("Hello ${5}", ["foo", "bar"])
    expect(result.result).toBe("Hello ")
  })

  test("empty input should return empty for all placeholders", () => {
    const result = SessionPrompt.substituteArguments("Hello ${1} and ${2:}", [])
    expect(result.result).toBe("Hello  and ")
  })

  test("$N syntax: last placeholder should swallow remaining arguments", () => {
    const result = SessionPrompt.substituteArguments("First: $1, Rest: $2", ["a", "b", "c", "d"])
    expect(result.result).toBe("First: a, Rest: b c d")
  })

  test("${N:} syntax: open end should include remaining arguments", () => {
    const result = SessionPrompt.substituteArguments("First: ${1}, Rest: ${2:}", ["a", "b", "c", "d"])
    expect(result.result).toBe("First: a, Rest: b c d")
  })

  test("${2:3} with insufficient args should return what is available", () => {
    const result = SessionPrompt.substituteArguments("Hello ${2:3}", ["foo"])
    expect(result.result).toBe("Hello ")
  })

  test("${:3} with insufficient args should return what is available", () => {
    const result = SessionPrompt.substituteArguments("Hello ${:3}", ["foo", "bar"])
    expect(result.result).toBe("Hello foo bar")
  })

  test("${2:} with single arg should return empty", () => {
    const result = SessionPrompt.substituteArguments("Hello ${2:}", ["foo"])
    expect(result.result).toBe("Hello ")
  })

  test("should handle whitespace-only args as empty", () => {
    const result = SessionPrompt.substituteArguments("Hello ${:}", ["foo", "   ", "bar"])
    expect(result.result).toBe("Hello foo bar")
  })

  test("hasPlaceholders should be false when no placeholders", () => {
    const result = SessionPrompt.substituteArguments("Hello world", ["foo", "bar"])
    expect(result.hasPlaceholders).toBe(false)
  })

  test("hasPlaceholders should be true with $N syntax", () => {
    const result = SessionPrompt.substituteArguments("Hello $1", ["foo"])
    expect(result.hasPlaceholders).toBe(true)
  })

  test("hasPlaceholders should be true with ${...} syntax", () => {
    const result = SessionPrompt.substituteArguments("Hello ${1}", ["foo"])
    expect(result.hasPlaceholders).toBe(true)
  })
})
