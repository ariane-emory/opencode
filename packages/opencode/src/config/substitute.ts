const placeholderRegex = /\$(\d+)/g
// Matches: ${N}, ${N:M}, ${:M}, ${N:}, ${:}
// Group 1: start index (optional), Group 2: colon+end (e.g., ":3" or ":" or undefined)
const extendedPlaceholderRegex = /\$\{(\d*)(:\d*)?\}/g

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  // Find all placeholders ($N and ${...})
  const simplePlaceholders = template.match(placeholderRegex) ?? []
  const extendedPlaceholders = template.match(extendedPlaceholderRegex) ?? []

  // Only $N placeholders have swallowing behavior - find the last one
  let lastSimple = 0
  for (const item of simplePlaceholders) {
    const value = Number(item.slice(1))
    if (value > lastSimple) lastSimple = value
  }

  // Process extended placeholders ${...} first, then simple $N placeholders
  // ${N} syntax NEVER swallows - use ${N:} for open-ended slice
  let withArgs = template.replaceAll(extendedPlaceholderRegex, (_, start, colonAndEnd) => {
    const startIndex = start ? Number(start) : 1
    // colonAndEnd is either undefined (for ${N}), ":" (for ${N:}), ":3" (for ${N:3} or ${:3})
    const hasColon = colonAndEnd !== undefined
    const endIndex = hasColon
      ? colonAndEnd.length > 1
        ? Number(colonAndEnd.slice(1))
        : undefined
      : undefined
    const argStart = startIndex - 1
    if (argStart >= args.length) return ""
    // ${N} without colon: single argument only
    // ${N:} with colon but no end: slice to end (open-ended)
    // ${N:M} with both: slice from N to M
    const actualEndIndex = hasColon ? endIndex : startIndex
    const slice = args.slice(argStart, actualEndIndex)
    const nonEmpty = slice.filter((arg) => arg.trim() !== "")
    return nonEmpty.join(" ")
  })

  // Process simple $N placeholders - these DO have swallowing behavior for the last one
  withArgs = withArgs.replaceAll(placeholderRegex, (_, index) => {
    const position = Number(index)
    const argIndex = position - 1
    if (argIndex >= args.length) return ""
    if (position === lastSimple) return args.slice(argIndex).join(" ")
    return args[argIndex]
  })

  // Handle $ARGUMENTS placeholder
  withArgs = withArgs.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simplePlaceholders.length > 0 || extendedPlaceholders.length > 0 || template.includes("$ARGUMENTS")

  return { result: withArgs, hasPlaceholders }
}
