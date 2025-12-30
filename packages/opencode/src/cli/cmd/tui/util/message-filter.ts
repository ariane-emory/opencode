import type { Part, TextPart } from "@opencode-ai/sdk/v2"

/**
 * Returns true if a part is a visible text part (not synthetic and not ignored).
 */
export function isVisibleTextPart(part: Part): part is TextPart {
  return part.type === "text" && !part.synthetic && !part.ignored
}

/**
 * Returns the first visible text part from an array of parts.
 * A visible text part is one that is not synthetic and not ignored.
 */
export function getVisibleTextPart(parts: Part[]): TextPart | undefined {
  return parts.find(isVisibleTextPart)
}
