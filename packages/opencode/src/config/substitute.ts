const placeholderRegex = /\$(\d+)/g
// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
// Group 1: start index (optional), Group 2: dots+end (e.g., "..3" or ".." or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g
const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
const rangeWithDefaultRegex = /\$\{(\d*)(\.\.\d*):([^}]*)\}/g

// Chained defaults: "fallback:$2:literal" tries $2, then literal.
// Empty part keeps the original expr (no substitution).
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
  // Split all arguments by whitespace - spaces are ALWAYS separators
  // This is idempotent - splitting already-split args has no effect
  args = args.flatMap(arg => arg.split(/\s+/).filter(s => s.length > 0))

  // Detect placeholders of every form ($N, ${...}, ${N:default}, ${N..M:default}, $ARGUMENTS)
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []
  const usesArgumentsPlaceholder = template.includes("$ARGUMENTS")

  // Processing order is most-specific-first; the regexes are mutually exclusive by syntax
  // (a placeholder with ":" cannot match one without, and vice versa).

  // 1. Range with default: ${N..M:default}, ${N..:default}, ${..M:default}
  let withArgs = template.replaceAll(rangeWithDefaultRegex, (expr, start, dotsAndEnd, defaultVal) => {
    const startIndex = start ? Number(start) : 1
    const endIndex = dotsAndEnd && dotsAndEnd.length > 2 ? Number(dotsAndEnd.slice(2)) : undefined
    const argStart = startIndex - 1
    if (argStart < args.length) {
      const slice = endIndex !== undefined
        ? args.slice(argStart, endIndex)
        : args.slice(argStart)
      const nonEmpty = slice.filter((arg) => arg.trim() !== "")
      if (nonEmpty.length > 0) return nonEmpty.join(" ")
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 2. Default placeholder: ${N:default}
  withArgs = withArgs.replaceAll(defaultPlaceholderRegex, (expr, position, defaultVal) => {
    const argIndex = Number(position) - 1
    if (argIndex < args.length) {
      const arg = args[argIndex]
      if (arg.trim() !== "") return arg
    }
    return resolveChainedDefault(expr, defaultVal, args)
  })

  // 3. Extended placeholder (no default): ${N}, ${N..}, ${N..M}, ${..}, ${..M}
  // ${N} syntax NEVER swallows - use ${N..} for open-ended slice
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
    // ${N} without dots: single argument only
    // ${N..} with dots but no end: slice to end (open-ended)
    // ${N..M} with both: slice from N to M
    const actualEndIndex = hasDots ? endIndex : startIndex
    const slice = args.slice(argStart, actualEndIndex)
    const nonEmpty = slice.filter((arg) => arg.trim() !== "")
    return nonEmpty.join(" ")
  })

  // 4. Simple $N placeholders - no swallowing, just return the specific arg
  withArgs = withArgs.replaceAll(placeholderRegex, (_, index) => {
    const argIndex = Number(index) - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  // 5. Handle $ARGUMENTS placeholder
  withArgs = withArgs.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 ||
    extendedPlaceholders.length > 0 ||
    defaultPlaceholders.length > 0 ||
    rangeWithDefaultPlaceholders.length > 0 ||
    usesArgumentsPlaceholder

  return { result: withArgs, hasPlaceholders }
}
