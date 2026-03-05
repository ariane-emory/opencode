const placeholderRegex = /\$(\d+)/g

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  const placeholders = template.match(placeholderRegex) ?? []
  let last = 0
  for (const item of placeholders) {
    const value = Number(item.slice(1))
    if (value > last) last = value
  }

  const hasPlaceholders = placeholders.length > 0
  
  let result = template.replaceAll(placeholderRegex, (_, index) => {
    const position = Number(index)
    const argIndex = position - 1
    if (argIndex >= args.length) return ""
    if (position === last) return args.slice(argIndex).join(" ")
    return args[argIndex]
  })

  result = result.replaceAll("$ARGUMENTS", args.join(" "))

  return { result, hasPlaceholders }
}
