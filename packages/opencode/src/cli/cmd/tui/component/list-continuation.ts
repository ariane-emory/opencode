/**
 * Hook for automatic list continuation in textarea inputs.
 *
 * When pressing newline on a numbered list line:
 * - If line has content (e.g., "1. foo"), inserts next number on new line
 * - If line is empty (e.g., "1. "), clears the list marker instead
 */

// Matches a numbered list line with content after the marker
// Examples: "1. foo", "12. bar", "3.  baz"
const NUMBERED_LIST_WITH_CONTENT = /^(\d+)\.\s+\S/

// Matches a numbered list line with only whitespace after the marker (or nothing)
// Examples: "1. ", "2.  ", "3."
const NUMBERED_LIST_EMPTY = /^(\d+)\.\s*$/

export type ListContinuationAction =
  | {
      type: "continue";
      insertText: string;
      renumber?: {
        start: number;
        end: number;
        newText: string;
      };
    }
  | { type: "clear"; deleteRange: { start: number; end: number }; cursorPosition: number }

export type LineInfo = {
  start: number
  end: number
  text: string
}

/**
 * Gets information about the line containing the cursor.
 */
export function getCurrentLine(text: string, cursorOffset: number): LineInfo {
  // Find line start by looking backward for newline
  let start = cursorOffset
  while (start > 0 && text[start - 1] !== "\n") {
    start--
  }

  // Find line end by looking forward for newline
  let end = cursorOffset
  while (end < text.length && text[end] !== "\n") {
    end++
  }

  return {
    start,
    end,
    text: text.slice(start, end),
  }
}

export type ParsedListItem = {
  number: number
  hasContent: boolean
}

/**
 * Parses a line to determine if it's a numbered list item.
 */
export function parseNumberedListItem(lineText: string): ParsedListItem | null {
  // Check for numbered list with content
  const withContent = lineText.match(NUMBERED_LIST_WITH_CONTENT)
  if (withContent) {
    return {
      number: parseInt(withContent[1], 10),
      hasContent: true,
    }
  }

  // Check for numbered list without content (empty item)
  const empty = lineText.match(NUMBERED_LIST_EMPTY)
  if (empty) {
    return {
      number: parseInt(empty[1], 10),
      hasContent: false,
    }
  }

  return null
}

export type SubsequentListItem = {
  start: number
  end: number
  number: number
  text: string
}

/**
 * Finds all subsequent numbered list items starting from a given position.
 * Stops when it encounters a non-list line or end of text.
 */
export function findSubsequentListItems(text: string, startOffset: number): SubsequentListItem[] {
  const items: SubsequentListItem[] = []
  let offset = startOffset

  while (offset < text.length) {
    // Find the end of the current line
    let lineEnd = offset
    while (lineEnd < text.length && text[lineEnd] !== "\n") {
      lineEnd++
    }

    const lineText = text.slice(offset, lineEnd)
    const parsed = parseNumberedListItem(lineText)

    if (!parsed) {
      // Stop when we hit a non-list line
      break
    }

    items.push({
      start: offset,
      end: lineEnd,
      number: parsed.number,
      text: lineText,
    })

    // Move to next line (skip the newline)
    offset = lineEnd + 1
  }

  return items
}

/**
 * Determines what action to take when newline is pressed.
 *
 * @param text - The full text content
 * @param cursorOffset - The current cursor position
 * @returns Action to perform, or null to use default newline behavior
 */
export function handleNewline(text: string, cursorOffset: number): ListContinuationAction | null {
  const line = getCurrentLine(text, cursorOffset)
  const parsed = parseNumberedListItem(line.text)

  // Not a numbered list - use default behavior
  if (!parsed) {
    return null
  }

  // Only apply list continuation when cursor is at end of line
  if (cursorOffset !== line.end) {
    return null
  }

  if (parsed.hasContent) {
    // Line has content - continue the list with next number
    let nextNum = parsed.number + 1
    const insertText = `\n${nextNum}. `

    // Check for subsequent list items that need renumbering
    // Start searching after the current line (including the newline we'll insert)
    const searchStart = line.end + 1
    const subsequentItems = findSubsequentListItems(text, searchStart)

    if (subsequentItems.length > 0) {
      // Build renumbered text
      let renumberOffset = searchStart
      let renumberText = ""

      for (const item of subsequentItems) {
        // Add any content between the previous item and this one
        if (item.start > renumberOffset) {
          renumberText += text.slice(renumberOffset, item.start)
        }

        // Replace the number in this list item
        nextNum++
        const newLineText = item.text.replace(/^\d+\./, `${nextNum}.`)
        renumberText += newLineText
        renumberOffset = item.end
      }

      // Include any trailing content after the last list item
      const lastItem = subsequentItems[subsequentItems.length - 1]
      const renumberEnd = lastItem.end

      return {
        type: "continue",
        insertText,
        renumber: {
          start: searchStart,
          end: renumberEnd,
          newText: renumberText,
        },
      }
    }

    return {
      type: "continue",
      insertText,
    }
  }

  // Line is empty (just the list marker) - clear the line
  return {
    type: "clear",
    deleteRange: { start: line.start, end: line.end },
    cursorPosition: line.start,
  }
}

/**
 * Removes trailing empty list items from text before submission.
 * For example, "1. foo\n2. " becomes "1. foo"
 *
 * @param text - The full text content
 * @returns Cleaned text with trailing empty list items removed
 */
export function cleanupForSubmit(text: string): string {
  const lines = text.split("\n")
  
  // Work backwards, removing trailing empty list items
  while (lines.length > 0) {
    const last = lines[lines.length - 1]
    const parsed = parseNumberedListItem(last)
    
    // If last line is an empty list item, remove it
    if (parsed && !parsed.hasContent) {
      lines.pop()
      continue
    }
    
    break
  }
  
  return lines.join("\n")
}

/**
 * Hook that provides list continuation functionality for textarea inputs.
 */
export function useListContinuation() {
  return {
    handleNewline,
    cleanupForSubmit,
  }
}
