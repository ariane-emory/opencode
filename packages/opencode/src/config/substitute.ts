const placeholderRegex = /\$(\d+)/g
// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
// Group 1: start index (optional), Group 2: dots+end (e.g., "..3" or ".." or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g
const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
const rangeWithDefaultRegex = /\$\{(\d*)(\.\.\d*):([^}]*)\}/g

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
  // Find all placeholders to determine hasPlaceholders and lastSimpleIndex
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []

  let lastSimpleIndex = 0
  for (const item of simplePlaceholders) {
    const value = Number(item.slice(1))
    if (value > lastSimpleIndex) lastSimpleIndex = value
  }

  let lastDefaultIndex = 0
  for (const item of defaultPlaceholders) {
    const match = item.match(/\$\{(\d+):/)
    if (match) {
      const value = Number(match[1])
      if (value > lastDefaultIndex) lastDefaultIndex = value
    }
  }

  // 1. Process rangeWithDefaultRegex (most specific - requires .. and :)
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

  // 2. Process defaultPlaceholderRegex (has : but no ..)
  result = result.replaceAll(defaultPlaceholderRegex, (expr, position, defaultVal) => {
    const pos = Number(position)
    const argIndex = pos - 1
    if (argIndex < args.length) {
      if (pos === lastDefaultIndex) {
        const slice = args.slice(argIndex)
        const nonEmpty = slice.filter(arg => arg.trim() !== "")
        if (nonEmpty.length > 0) return nonEmpty.join(" ")
      } else {
        const arg = args[argIndex]
        if (arg.trim() !== "") return arg
      }
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 3. Process extended placeholders ${...} (has .. but no :)
  // ${N} syntax NEVER swallows - use ${N..} for open-ended slice
  result = result.replaceAll(extendedPlaceholderRegex, (_, start, dotsAndEnd) => {
    const startIndex = start ? Number(start) : 1
    const hasDots = dotsAndEnd !== undefined
    const endIndex = hasDots
      ? dotsAndEnd.length > 2
        ? Number(dotsAndEnd.slice(2))
        : undefined
      : undefined
    const argStart = startIndex - 1
    if (argStart >= args.length) return ""
    const actualEndIndex = hasDots ? endIndex : startIndex
    const slice = args.slice(argStart, actualEndIndex)
    const nonEmpty = slice.filter((arg) => arg.trim() !== "")
    return nonEmpty.join(" ")
  })

  // 4. Process simple $N placeholders
  // The last placeholder swallows remaining arguments (backward compatibility)
  result = result.replaceAll(placeholderRegex, (_, index) => {
    const position = Number(index)
    const argIndex = position - 1
    if (argIndex >= args.length) return ""
    if (position === lastSimpleIndex) return args.slice(argIndex).join(" ")
    return args[argIndex]
  })

  // Handle $ARGUMENTS placeholder
  result = result.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 ||
    extendedPlaceholders.length > 0 ||
    defaultPlaceholders.length > 0 ||
    rangeWithDefaultPlaceholders.length > 0 ||
    template.includes("$ARGUMENTS")

  return { result, hasPlaceholders }
}
