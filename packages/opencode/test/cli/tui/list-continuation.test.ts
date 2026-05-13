import { describe, expect, test } from "bun:test"
import {
  getCurrentLine,
  parseNumberedListItem,
  handleNewline,
  cleanupForSubmit,
  type LineInfo,
  type ParsedListItem,
  type ListContinuationAction,
} from "../../../src/cli/cmd/tui/component/list-continuation"

describe("list-continuation", () => {
  describe("getCurrentLine", () => {
    test("returns correct line info for single line text", () => {
      const text = "hello world"
      const result = getCurrentLine(text, 5)
      expect(result).toEqual({ start: 0, end: 11, text: "hello world" })
    })

    test("returns correct line info when cursor at start", () => {
      const text = "hello world"
      const result = getCurrentLine(text, 0)
      expect(result).toEqual({ start: 0, end: 11, text: "hello world" })
    })

    test("returns correct line info when cursor at end", () => {
      const text = "hello world"
      const result = getCurrentLine(text, 11)
      expect(result).toEqual({ start: 0, end: 11, text: "hello world" })
    })

    test("returns correct line for first line of multi-line text", () => {
      const text = "first\nsecond\nthird"
      const result = getCurrentLine(text, 3)
      expect(result).toEqual({ start: 0, end: 5, text: "first" })
    })

    test("returns correct line for middle line of multi-line text", () => {
      const text = "first\nsecond\nthird"
      const result = getCurrentLine(text, 8) // cursor in "second"
      expect(result).toEqual({ start: 6, end: 12, text: "second" })
    })

    test("returns correct line for last line of multi-line text", () => {
      const text = "first\nsecond\nthird"
      const result = getCurrentLine(text, 15) // cursor in "third"
      expect(result).toEqual({ start: 13, end: 18, text: "third" })
    })

    test("handles cursor right after newline", () => {
      const text = "first\nsecond"
      const result = getCurrentLine(text, 6) // cursor at start of "second"
      expect(result).toEqual({ start: 6, end: 12, text: "second" })
    })

    test("handles empty text", () => {
      const text = ""
      const result = getCurrentLine(text, 0)
      expect(result).toEqual({ start: 0, end: 0, text: "" })
    })

    test("handles empty line between content", () => {
      const text = "first\n\nthird"
      const result = getCurrentLine(text, 6) // cursor on empty line
      expect(result).toEqual({ start: 6, end: 6, text: "" })
    })
  })

  describe("parseNumberedListItem", () => {
    test("parses numbered list with content", () => {
      expect(parseNumberedListItem("1. foo")).toEqual({ number: 1, hasContent: true })
    })

    test("parses multi-digit numbered list with content", () => {
      expect(parseNumberedListItem("12. bar")).toEqual({ number: 12, hasContent: true })
      expect(parseNumberedListItem("100. baz")).toEqual({ number: 100, hasContent: true })
    })

    test("parses numbered list with multiple spaces", () => {
      expect(parseNumberedListItem("1.  foo")).toEqual({ number: 1, hasContent: true })
      expect(parseNumberedListItem("1.   foo")).toEqual({ number: 1, hasContent: true })
    })

    test("parses empty numbered list with space", () => {
      expect(parseNumberedListItem("1. ")).toEqual({ number: 1, hasContent: false })
    })

    test("parses empty numbered list with multiple spaces", () => {
      expect(parseNumberedListItem("1.  ")).toEqual({ number: 1, hasContent: false })
      expect(parseNumberedListItem("2.   ")).toEqual({ number: 2, hasContent: false })
    })

    test("parses numbered list with no space after period", () => {
      expect(parseNumberedListItem("1.")).toEqual({ number: 1, hasContent: false })
    })

    test("returns null for non-list text", () => {
      expect(parseNumberedListItem("foo bar")).toBeNull()
      expect(parseNumberedListItem("hello world")).toBeNull()
    })

    test("returns null for text without space after period", () => {
      // "1.foo" has no space, so the content regex won't match
      // and the empty regex won't match because there's non-whitespace after
      expect(parseNumberedListItem("1.foo")).toBeNull()
    })

    test("returns null for bullet lists", () => {
      expect(parseNumberedListItem("- item")).toBeNull()
      expect(parseNumberedListItem("* item")).toBeNull()
      expect(parseNumberedListItem("+ item")).toBeNull()
    })

    test("returns null for lines starting with non-digit", () => {
      expect(parseNumberedListItem("a. item")).toBeNull()
      expect(parseNumberedListItem(". item")).toBeNull()
    })
  })

  describe("handleNewline", () => {
    test("returns continue action for numbered list with content at end", () => {
      const text = "1. foo"
      const result = handleNewline(text, 6)
      expect(result).toEqual({ type: "continue", insertText: "\n2. " })
    })

    test("increments multi-digit numbers correctly", () => {
      const text = "99. item"
      const result = handleNewline(text, 8)
      expect(result).toEqual({ type: "continue", insertText: "\n100. " })
    })

    test("returns clear action for empty numbered list", () => {
      const text = "1. "
      const result = handleNewline(text, 3)
      expect(result).toEqual({
        type: "clear",
        deleteRange: { start: 0, end: 3 },
        cursorPosition: 0,
      })
    })

    test("returns clear action for numbered list with only period", () => {
      const text = "1."
      const result = handleNewline(text, 2)
      expect(result).toEqual({
        type: "clear",
        deleteRange: { start: 0, end: 2 },
        cursorPosition: 0,
      })
    })

    test("returns null for non-list text", () => {
      const text = "hello world"
      const result = handleNewline(text, 11)
      expect(result).toBeNull()
    })

    test("returns null when cursor is not at end of line", () => {
      const text = "1. foo"
      const result = handleNewline(text, 3) // cursor after "1. "
      expect(result).toBeNull()
    })

    test("handles numbered list in multi-line text", () => {
      const text = "some text\n2. second item"
      const result = handleNewline(text, 24) // cursor at end of "2. second item"
      expect(result).toEqual({ type: "continue", insertText: "\n3. " })
    })

    test("handles empty numbered list in multi-line text", () => {
      const text = "1. first\n2. "
      const result = handleNewline(text, 12) // cursor at end of "2. "
      expect(result).toEqual({
        type: "clear",
        deleteRange: { start: 9, end: 12 },
        cursorPosition: 9,
      })
    })

    test("returns null for first line that is not a list in multi-line", () => {
      const text = "hello\n1. item"
      const result = handleNewline(text, 5) // cursor at end of "hello"
      expect(result).toBeNull()
    })

    test("handles single digit to double digit transition", () => {
      const text = "9. ninth"
      const result = handleNewline(text, 8)
      expect(result).toEqual({ type: "continue", insertText: "\n10. " })
    })

    test("renumbers single subsequent list item", () => {
      const text = "1. red\n2. blue"
      const result = handleNewline(text, 6) // cursor at end of "1. red"
      expect(result).toEqual({
        type: "continue",
        insertText: "\n2. ",
        renumber: {
          start: 7, // after the newline following "1. red"
          end: 14,  // end of "2. blue"
          newText: "3. blue",
        },
      })
    })

    test("renumbers multiple subsequent list items", () => {
      const text = "1. red\n2. blue\n3. green"
      const result = handleNewline(text, 6) // cursor at end of "1. red"
      expect(result).toEqual({
        type: "continue",
        insertText: "\n2. ",
        renumber: {
          start: 7, // after the newline following "1. red"
          end: 23,  // end of "3. green" (exclusive)
          newText: "3. blue\n4. green",
        },
      })
    })

    test("stops renumbering at non-list line", () => {
      const text = "1. red\nnot a list\n3. blue"
      const result = handleNewline(text, 6) // cursor at end of "1. red"
      expect(result).toEqual({ type: "continue", insertText: "\n2. " })
    })

    test("renumbers with multi-digit numbers", () => {
      const text = "9. item\n10. next"
      const result = handleNewline(text, 7) // cursor at end of "9. item"
      expect(result).toEqual({
        type: "continue",
        insertText: "\n10. ",
        renumber: {
          start: 8,
          end: 16,
          newText: "11. next",
        },
      })
    })
  })

  describe("cleanupForSubmit", () => {
    test("removes trailing empty list item", () => {
      const text = "1. foo\n2. "
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo")
    })

    test("removes trailing empty list item with no space", () => {
      const text = "1. foo\n2."
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo")
    })

    test("removes multiple trailing empty list items", () => {
      const text = "1. foo\n2. \n3. "
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo")
    })

    test("does not remove list items with content", () => {
      const text = "1. foo\n2. bar"
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo\n2. bar")
    })

    test("returns empty string when only empty list item", () => {
      const text = "1. "
      const result = cleanupForSubmit(text)
      expect(result).toBe("")
    })

    test("does not modify text without list items", () => {
      const text = "hello world"
      const result = cleanupForSubmit(text)
      expect(result).toBe("hello world")
    })

    test("preserves non-list trailing lines", () => {
      const text = "1. foo\nsome text"
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo\nsome text")
    })

    test("handles text with only whitespace after marker", () => {
      const text = "1. foo\n2.   "
      const result = cleanupForSubmit(text)
      expect(result).toBe("1. foo")
    })
  })
})
