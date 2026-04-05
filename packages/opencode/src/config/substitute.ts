const placeholderRegex = /\$(\d+)/g
const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
const rangeWithDefaultRegex = /\$\{(\d*)(\.\.\d*):([^}]*)\}/g
// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
// Group 1: start index (optional), Group 2: dots+end (e.g., "..3" or ".." or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g

function fallback(expr: string, raw: string, args: string[]) {
  for (const part of raw.split(":")) {
    if (part === "") return expr
    const match = part.match(/^\$(\d+)$/)
    if (!match) return part
    const idx = Number(match[1]) - 1
    if (idx >= args.length) continue
    const arg = args[idx]
    if (arg.trim() !== "") return arg
  }
  return ""
}

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const defaultPlaceholders = template.match(defaultPlaceholderRegex) ?? []
  const rangeWithDefaultPlaceholders = template.match(rangeWithDefaultRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []

  let withArgs = template.replaceAll(rangeWithDefaultRegex, (expr, start, dotsAndEnd, raw) => {
    const startIndex = start ? Number(start) : 1
    const endIndex = dotsAndEnd.length > 2 ? Number(dotsAndEnd.slice(2)) : undefined
    const argStart = startIndex - 1
    if (argStart < args.length) {
      const slice = endIndex === undefined ? args.slice(argStart) : args.slice(argStart, endIndex)
      const nonEmpty = slice.filter((arg) => arg.trim() !== "")
      if (nonEmpty.length > 0) return nonEmpty.join(" ")
    }
    return fallback(expr, raw, args)
  })

  withArgs = withArgs.replaceAll(defaultPlaceholderRegex, (expr, position, raw) => {
    const idx = Number(position) - 1
    if (idx < args.length) {
      const arg = args[idx]
      if (arg.trim() !== "") return arg
    }
    return fallback(expr, raw, args)
  })

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

  withArgs = withArgs.replaceAll(placeholderRegex, (_, index) => {
    const argIndex = Number(index) - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  withArgs = withArgs.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 ||
    defaultPlaceholders.length > 0 ||
    rangeWithDefaultPlaceholders.length > 0 ||
    extendedPlaceholders.length > 0 ||
    template.includes("$ARGUMENTS")

  return { result: withArgs, hasPlaceholders }
}
