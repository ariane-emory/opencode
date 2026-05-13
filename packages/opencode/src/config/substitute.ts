const placeholderRegex = /\$(\d+)/g

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  // Split all arguments by whitespace - spaces are ALWAYS separators
  // This is idempotent - splitting already-split args has no effect
  args = args.flatMap(arg => arg.split(/\s+/).filter(s => s.length > 0))

  const placeholders = template.match(placeholderRegex) ?? []
  const hasPlaceholders = placeholders.length > 0

  // No swallowing - each $N returns only the Nth argument
  let result = template.replaceAll(placeholderRegex, (_, index) => {
    const argIndex = Number(index) - 1
    if (argIndex >= args.length) return ""
    return args[argIndex]
  })

  result = result.replaceAll("$ARGUMENTS", args.join(" "))

  return { result, hasPlaceholders }
}
