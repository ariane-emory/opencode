const placeholderRegex = /\$(\d+)/g

// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
// Group 1: start index (optional), Group 2: dots+end (e.g., "..3" or ".." or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g

const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
const rangeWithDefaultRegex = /\$\{(\d*)(\.\.\d*):([^}]*)\}/g

// AGENTS: When merging with feat/argument-range-syntax, maintain this processing order:
// AGENTS: 1. rangeWithDefaultRegex (most specific - requires .. and :)
// AGENTS: 2. defaultPlaceholderRegex (has : but no ..)
// AGENTS: 3. extendedPlaceholderRegex from argument-range-syntax (has .. but no :)
// AGENTS: 4. placeholderRegex ($N syntax)
// AGENTS: These regexes are mutually exclusive by syntax, so order doesn't affect correctness,
// AGENTS: but processing most-specific-first improves clarity and maintainability.
// AGENTS: Insert extendedPlaceholderRegex processing between defaultPlaceholderRegex and placeholderRegex.

function resolveChainedDefault(expr: string, defaultVal: string, args: string[]): string {
  const parts = defaultVal.split(":")
  for (const part of parts) {
    if (part === "") return expr
    const match = part.match(/^\$(\d+)$/)
    if (match) {
      const argIndex = Number(match[1]) - 1
      if (argIndex < args.length) {
        const arg = args[argIndex]
        if (arg.trim() !== "") return arg
      }
    } else {
      return part
    }
  }
  return ""
}

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  // Find all placeholders ($N, ${N}, ${N..M}, ${N:default}, ${N..M:default})
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []

  // Calculate last position for swallowing behavior
  let last = 0
  for (const item of simplePlaceholders) {
    const value = Number(item.slice(1))
    if (value > last) last = value
  }
  for (const item of defaultPlaceholders) {
    const match = item.match(/\$\{(\d+):/)
    if (match) {
      const value = Number(match[1])
      if (value > last) last = value
    }
  }
  for (const item of rangeWithDefaultPlaceholders) {
    const match = item.match(/\$\{(\d*)\.\./)
    if (match && match[1]) {
      const value = Number(match[1])
      if (value > last) last = value
    }
  }

  // Process in order: rangeWithDefault -> defaultPlaceholder -> extendedPlaceholder -> simplePlaceholder
  // 1. Process rangeWithDefaultRegex: ${N..M:default} syntax
  let result = template.replaceAll(rangeWithDefaultRegex, (expr, start, dotsAndEnd, defaultVal) => {
    const startIndex = start ? Number(start) : 1
    const endIndex = dotsAndEnd && dotsAndEnd.length > 2 ? Number(dotsAndEnd.slice(2)) : undefined
    const argStart = startIndex - 1
    if (argStart < args.length) {
      const slice = endIndex !== undefined 
        ? args.slice(argStart, endIndex) 
        : args.slice(argStart)
      const nonEmpty = slice.filter(arg => arg.trim() !== "")
      if (nonEmpty.length > 0) return nonEmpty.join(" ")
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 2. Process defaultPlaceholderRegex: ${N:default} syntax
  result = result.replaceAll(defaultPlaceholderRegex, (expr, position, defaultVal) => {
    const pos = Number(position)
    const argIndex = pos - 1
    if (argIndex < args.length) {
      const arg = args[argIndex]
      if (arg.trim() !== "") {
        if (pos === last) return args.slice(argIndex).join(" ")
        return arg
      }
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 3. Process extendedPlaceholderRegex: ${N}, ${N..M}, ${..M}, ${N..} syntax
  result = result.replaceAll(extendedPlaceholderRegex, (_, start, dotsAndEnd) => {
    const startIndex = start ? Number(start) : 1
    // dotsAndEnd is either undefined (for ${N}), ".." (for ${N..}), "..3" (for ${N..3} or ${..3})
    const hasDots = dotsAndEnd !== undefined
    const endIndex = hasDots
      ? dotsAndEnd.length > 2
        ? Number(dotsAndEnd.slice(2))
        : undefined
      : undefined
    const argStart = startIndex - 1
    if (argStart >= args.length) return ""
    // ${N} without dots: single argument only
    // ${N..} with dots but no end: slice to end (open-ended)
    // ${N..M} with both: slice from N to M
    const actualEndIndex = hasDots ? endIndex : startIndex
    const slice = args.slice(argStart, actualEndIndex)
    const nonEmpty = slice.filter((arg) => arg.trim() !== "")
    return nonEmpty.join(" ")
  })

  // 4. Process simple $N placeholders - no swallowing, just return the specific arg
  result = result.replaceAll(placeholderRegex, (_, index) => {
    const position = Number(index)
    const argIndex = position - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  // Handle $ARGUMENTS placeholder
  result = result.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 || extendedPlaceholders.length > 0 || defaultPlaceholders.length > 0 || rangeWithDefaultPlaceholders.length > 0 || template.includes("$ARGUMENTS")

  return { result, hasPlaceholders }
}
