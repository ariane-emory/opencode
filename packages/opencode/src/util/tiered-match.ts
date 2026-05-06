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
  return smartCompare(a, b)
}
