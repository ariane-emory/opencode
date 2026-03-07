const placeholderRegex = /\$(\d+)/g
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
  const placeholders = template.match(placeholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []

  const hasPlaceholders = placeholders.length > 0 || defaultPlaceholders.length > 0 || rangeWithDefaultPlaceholders.length > 0

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

  result = result.replaceAll(defaultPlaceholderRegex, (expr, position, defaultVal) => {
    const pos = Number(position)
    const argIndex = pos - 1
    if (argIndex < args.length) {
      const arg = args[argIndex]
      if (arg.trim() !== "") {
        return arg
      }
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  result = result.replaceAll(placeholderRegex, (_, index) => {
    const argIndex = Number(index) - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  result = result.replaceAll("$ARGUMENTS", args.join(" "))

  return { result, hasPlaceholders }
}
