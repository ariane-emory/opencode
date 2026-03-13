const placeholderRegex = /\$(\d+)/g
// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g
// Matches: ${N:default}, ${N:$2:default}
const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
// Matches: ${N..M:default}, ${..M:default}, ${N..:default}
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
  // Find all placeholders
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []

  // Process in order: most specific to least specific
  // 1. Range with defaults: ${N..M:default}
  let withArgs = template.replaceAll(rangeWithDefaultRegex, (expr, start, dotsAndEnd, defaultVal) => {
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

  // 2. Defaults: ${N:default}
  withArgs = withArgs.replaceAll(defaultPlaceholderRegex, (expr, position, defaultVal) => {
    const argIndex = Number(position) - 1
    if (argIndex < args.length) {
      const arg = args[argIndex]
      if (arg.trim() !== "") return arg
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 3. Extended ranges: ${N..M}
  withArgs = withArgs.replaceAll(extendedPlaceholderRegex, (_, start, dotsAndEnd) => {
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

  // 4. Simple placeholders: $N
  withArgs = withArgs.replaceAll(placeholderRegex, (_, index) => {
    const argIndex = Number(index) - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  // Handle $ARGUMENTS placeholder
  withArgs = withArgs.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 || 
    extendedPlaceholders.length > 0 || 
    defaultPlaceholders.length > 0 || 
    rangeWithDefaultPlaceholders.length > 0 || 
    template.includes("$ARGUMENTS")

  return { result: withArgs, hasPlaceholders }
}