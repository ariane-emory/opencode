import { describe, test, expect } from "bun:test"

function isWordChar(ch: string): boolean {
  return /\w/.test(ch)
}

function getWordBoundariesForTransformation(text: string, cursorOffset: number): { start: number; end: number } | null {
  if (text.length === 0) return null

  const effectiveOffset = Math.min(cursorOffset, text.length)
  if (effectiveOffset < text.length && isWordChar(text[effectiveOffset])) {
    let end = effectiveOffset
    while (end < text.length && isWordChar(text[end])) end++

    return { start: effectiveOffset, end }
  }

  let end = effectiveOffset
  while (end < text.length && !isWordChar(text[end])) end++

  let nextEnd = end
  while (nextEnd < text.length && isWordChar(text[nextEnd])) nextEnd++

  if (nextEnd > end) {
    return { start: end, end: nextEnd }
  }

  let start = effectiveOffset
  while (start > 0 && !isWordChar(text[start - 1])) start--

  let wordStart = start
  while (wordStart > 0 && isWordChar(text[wordStart - 1])) wordStart--

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

  test("should find word when cursor is at end of text", () => {
    const result = getWordBoundariesForTransformation("hello world", 11)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should handle cursor past end of text on whitespace", () => {
    const result = getWordBoundariesForTransformation("hello world ", 12)
    expect(result).toEqual({ start: 6, end: 11 })
  })

  test("should treat period as word boundary", () => {
    const result = getWordBoundariesForTransformation("foo.bar", 4)
    expect(result).toEqual({ start: 4, end: 7 })
  })

  test("should treat hyphen as word boundary", () => {
    const result = getWordBoundariesForTransformation("foo-bar", 4)
    expect(result).toEqual({ start: 4, end: 7 })
  })

  test("should handle punctuation in filename", () => {
    const result = getWordBoundariesForTransformation("branches.md", 8)
    expect(result).toEqual({ start: 9, end: 11 })
  })

  test("should find word before period when cursor on period", () => {
    const result = getWordBoundariesForTransformation("foo.bar", 3)
    expect(result).toEqual({ start: 4, end: 7 })
  })

  test("should handle mixed punctuation and words", () => {
    const result = getWordBoundariesForTransformation("MERGED-branches.md", 6)
    expect(result).toEqual({ start: 7, end: 15 })
  })

  test("underscore is a word character (not a boundary)", () => {
    const result = getWordBoundariesForTransformation("foo_bar", 0)
    expect(result).toEqual({ start: 0, end: 7 })
  })

  test("cursor on hyphen in merged-branches.md finds 'merged' only", () => {
    const result = getWordBoundariesForTransformation("merged-branches.md", 0)
    expect(result).toEqual({ start: 0, end: 6 })
  })

  test("cursor after 'MERGED-' in merged-branches.md finds 'branches' only", () => {
    const result = getWordBoundariesForTransformation("MERGED-branches.md", 6)
    expect(result).toEqual({ start: 7, end: 15 })
  })

  test("cursor on dot in MERGED-BRANCHES.md finds 'md'", () => {
    const result = getWordBoundariesForTransformation("MERGED-BRANCHES.md", 15)
    expect(result).toEqual({ start: 16, end: 18 })
  })

  test("cursor past end after trailing punctuation falls back to previous word", () => {
    const result = getWordBoundariesForTransformation("MERGED-BRANCHES.", 16)
    expect(result).toEqual({ start: 7, end: 15 })
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
