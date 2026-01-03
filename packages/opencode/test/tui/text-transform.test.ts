import { describe, test, expect } from "bun:test"

function getWordBoundariesForTransformation(text: string, cursorOffset: number): { start: number; end: number } | null {
  if (text.length === 0) return null

  const effectiveOffset = Math.min(cursorOffset, text.length)
  if (effectiveOffset < text.length && !/\s/.test(text[effectiveOffset])) {
    // Inside a word - transform from cursor to end of word (Emacs-style behavior)
    let end = effectiveOffset
    while (end < text.length && !/\s/.test(text[end])) end++

    return { start: effectiveOffset, end }
  }

  let end = effectiveOffset
  while (end < text.length && /\s/.test(text[end])) end++

  let nextEnd = end
  while (nextEnd < text.length && !/\s/.test(text[nextEnd])) nextEnd++

  if (nextEnd > end) {
    return { start: end, end: nextEnd }
  }

  let start = effectiveOffset
  while (start > 0 && /\s/.test(text[start - 1])) start--

  let wordStart = start
  while (wordStart > 0 && !/\s/.test(text[wordStart - 1])) wordStart--

  return { start: wordStart, end: start }
}

function lowercaseWord(text: string, start: number, end: number): string {
  return text.slice(0, start) + text.slice(start, end).toLowerCase() + text.slice(end)
}

function uppercaseWord(text: string, start: number, end: number): string {
  return text.slice(0, start) + text.slice(start, end).toUpperCase() + text.slice(end)
}

function capitalizeWord(text: string, start: number, end: number): string {
  const segment = text.slice(start, end)
  const capitalized = segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
  return text.slice(0, start) + capitalized + text.slice(end)
}

describe("getWordBoundariesForTransformation", () => {
  test("should transform from cursor to end of word when cursor is inside a word", () => {
    const result = getWordBoundariesForTransformation("hello world", 3)
    expect(result).toEqual({ start: 3, end: 5 })
  })

  test("should find word boundaries when cursor is at start of word", () => {
    const result = getWordBoundariesForTransformation("hello world", 6)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should find next word when cursor is on whitespace", () => {
    const result = getWordBoundariesForTransformation("hello world", 5)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should find next word when cursor is on multiple spaces", () => {
    const result = getWordBoundariesForTransformation("hello   world", 5)
    expect(result).toEqual({ start: 8, end: 13 })
  })

  test("should find previous word when cursor is after last word", () => {
    const result = getWordBoundariesForTransformation("hello world", 12)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should return null for empty string", () => {
    const result = getWordBoundariesForTransformation("", 0)
    expect(result).toEqual(null)
  })

  test("should handle cursor at start of empty buffer", () => {
    const result = getWordBoundariesForTransformation("", 0)
    expect(result).toEqual(null)
  })

  test("should find word when cursor is at end of text", () => {
    const result = getWordBoundariesForTransformation("hello world", 11)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should handle cursor past end of text on whitespace", () => {
    const result = getWordBoundariesForTransformation("hello world ", 12)
    expect(result).toEqual({ start: 6, end: 11 })
  })
})

describe("lowercaseWord", () => {
  test("should lowercase word in middle of text", () => {
    const result = lowercaseWord("HELLO world", 0, 5)
    expect(result).toBe("hello world")
  })

  test("should lowercase partial word", () => {
    const result = lowercaseWord("HELLO world", 2, 5)
    expect(result).toBe("HEllo world")
  })

  test("should handle empty range", () => {
    const result = lowercaseWord("hello world", 3, 3)
    expect(result).toBe("hello world")
  })
})

describe("uppercaseWord", () => {
  test("should uppercase word in middle of text", () => {
    const result = uppercaseWord("hello WORLD", 6, 11)
    expect(result).toBe("hello WORLD")
  })

  test("should uppercase partial word", () => {
    const result = uppercaseWord("hello world", 6, 9)
    expect(result).toBe("hello WORld")
  })
})

describe("capitalizeWord", () => {
  test("should capitalize word in middle of text", () => {
    const result = capitalizeWord("hello WORLD", 6, 11)
    expect(result).toBe("hello World")
  })

  test("should capitalize word with mixed case", () => {
    const result = capitalizeWord("hello hElLo", 6, 11)
    expect(result).toBe("hello Hello")
  })

  test("should only uppercase first letter", () => {
    const result = capitalizeWord("hello WORLD", 0, 5)
    expect(result).toBe("Hello WORLD")
  })
})
