const placeholderRegex = /\$(\d+)/g
const extendedPlaceholderRegex = /\$\{(\d*)(\.\.\d*)?\}/g
const defaultPlaceholderRegex = /\$\{(\d+):([^}]*)\}/g
const rangeWithDefaultRegex = /\$\{(\d*)(\.\.\d*):([^}]*)\}/g

function split(args: string[]) {
  return args.flatMap((arg) => arg.split(/\s+/).filter((x) => x.length > 0))
}

function resolve(expr: string, def: string, args: string[]) {
  const parts = def.split(":")
  for (const part of parts) {
    if (part === "") return expr
    const match = part.match(/^\$(\d+)$/)
    if (!match) return part
    const i = Number(match[1]) - 1
    if (i < args.length && args[i].trim() !== "") return args[i]
  }
  return ""
}

export function substituteArguments(
  template: string,
  args: string[],
): { result: string; hasPlaceholders: boolean } {
  args = split(args)

  const simple = template.match(placeholderRegex) ?? []
  const extended = template.match(extendedPlaceholderRegex) ?? []
  const defaults = template.match(defaultPlaceholderRegex) ?? []
  const ranged = template.match(rangeWithDefaultRegex) ?? []

  let result = template.replaceAll(rangeWithDefaultRegex, (expr, start, dotsAndEnd, def) => {
    const from = start ? Number(start) : 1
    const to = dotsAndEnd && dotsAndEnd.length > 2 ? Number(dotsAndEnd.slice(2)) : undefined
    const i = from - 1
    if (i < args.length) {
      const slice = to === undefined ? args.slice(i) : args.slice(i, to)
      const vals = slice.filter((arg) => arg.trim() !== "")
      if (vals.length > 0) return vals.join(" ")
    }
    return resolve(expr, def, args)
  })

  result = result.replaceAll(defaultPlaceholderRegex, (expr, pos, def) => {
    const i = Number(pos) - 1
    if (i < args.length && args[i].trim() !== "") return args[i]
    return resolve(expr, def, args)
  })

  result = result.replaceAll(extendedPlaceholderRegex, (_, start, dotsAndEnd) => {
    const from = start ? Number(start) : 1
    const hasDots = dotsAndEnd !== undefined
    const to = hasDots ? (dotsAndEnd.length > 2 ? Number(dotsAndEnd.slice(2)) : undefined) : undefined
    const i = from - 1
    if (i >= args.length) return ""
    const end = hasDots ? to : from
    return args.slice(i, end).filter((arg) => arg.trim() !== "").join(" ")
  })

  result = result.replaceAll(placeholderRegex, (_, index) => {
    const i = Number(index) - 1
    if (i >= args.length) return ""
    return args[i]
  })

  result = result.replace(/\$ARGUMENTS\b/g, args.join(" "))

  const hasPlaceholders =
    simple.length > 0 ||
    extended.length > 0 ||
    defaults.length > 0 ||
    ranged.length > 0 ||
    template.includes("$ARGUMENTS")

  return { result, hasPlaceholders }
}
