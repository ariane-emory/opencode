const placeholderRegex = /\$(\d+)/g
// Matches: ${N}, ${N..M}, ${..M}, ${N..}, ${..}
// Group 1: start index (optional), Group 2: dots+end (e.g., "..3" or ".." or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []

  let withArgs = template.replaceAll(extendedPlaceholderRegex, (_, start, dotsAndEnd) => {
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
    simplePlaceholders.length > 0 || extendedPlaceholders.length > 0 || template.includes("$ARGUMENTS")

  return { result: withArgs, hasPlaceholders }
}
