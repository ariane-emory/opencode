import { smartCompare } from "./smart-sort"

export interface TieredMatchable {
  title: string
  category?: string
  description?: string
}

/**
 * Filters and sorts items using tiered matching.
 * 
 * **CRITICAL**: This tiered matching logic is the core feature of fix/modal-menus-filtered-order.
 * It ensures prefix matches appear first, then substring matches, then description/category matches.
 * Each tier is sorted using smartCompare. DO NOT replace with fuzzysort or frecency sorting!
 * 
 * Tier 1: title starts with needle
 * Tier 2: title includes needle OR category starts with needle
 * Tier 3: category includes needle OR description includes needle
 */
export function tieredMatch<T extends TieredMatchable>(items: T[], needle: string): T[] {
  const lowerNeedle = needle.toLowerCase().trim()
  if (!lowerNeedle) return items

  const tier1: T[] = []
  const tier2: T[] = []
  const tier3: T[] = []

  for (const item of items) {
    const title = item.title.toLowerCase()
    const category = item.category?.toLowerCase() ?? ""
    const description = item.description?.toLowerCase() ?? ""

    if (title.startsWith(lowerNeedle)) {
      tier1.push(item)
    } else if (title.includes(lowerNeedle) || category.startsWith(lowerNeedle)) {
      tier2.push(item)
    } else if (category.includes(lowerNeedle) || description.includes(lowerNeedle)) {
      tier3.push(item)
    }
  }

  const sortByTitle = (a: T, b: T) => compareTieredTitles(a.title, b.title, lowerNeedle)

  return [...tier1.sort(sortByTitle), ...tier2.sort(sortByTitle), ...tier3.sort(sortByTitle)]
}

export function compareTieredTitles(a: string, b: string, needle: string) {
  const aIndex = a.toLowerCase().indexOf(needle)
  const bIndex = b.toLowerCase().indexOf(needle)
  if (aIndex !== bIndex) return aIndex - bIndex
  const continuationCompare = compareContinuation(a, b, aIndex + needle.length)
  if (continuationCompare !== 0) return continuationCompare
  return smartCompare(a, b)
}

function compareContinuation(a: string, b: string, offset: number) {
  const aContinuation = readContinuation(a, offset)
  const bContinuation = readContinuation(b, offset)
  if (aContinuation.kind !== bContinuation.kind) {
    if (aContinuation.kind === "numeric") return -1
    if (bContinuation.kind === "numeric") return 1
  }
  if (aContinuation.kind === "numeric" && bContinuation.kind === "numeric") {
    const limit = Math.max(aContinuation.tokens.length, bContinuation.tokens.length)
    for (let index = 0; index < limit; index++) {
      const aToken = aContinuation.tokens[index]
      const bToken = bContinuation.tokens[index]
      if (aToken === undefined || bToken === undefined) {
        if (aToken === undefined && bToken === undefined) return 0
        return aToken === undefined ? 1 : -1
      }
      if (aToken !== bToken) return bToken - aToken
    }
  }
  return 0
}

function readContinuation(value: string, offset: number) {
  const continuation = value.slice(offset).trimStart().replace(/^[-_\s]+/, "")
  const match = continuation.match(/^(\d+(?:\.\d+)*)/)
  if (!match) return { kind: "other" as const, tokens: [] as number[] }
  return {
    kind: "numeric" as const,
    tokens: match[1]
      .split(".")
      .map(Number)
      .filter((token) => !Number.isNaN(token)),
  }
}
