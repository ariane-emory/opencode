export function formatSessionTitle(title: string): string {
  const pipeIndex = title.indexOf("|")
  if (pipeIndex === -1) return title
  const group = title.slice(0, pipeIndex).trim()
  const rest = title.slice(pipeIndex + 1).trim()
  if (!group) return rest
  const capitalized = group.charAt(0).toUpperCase() + group.slice(1)
  return `${capitalized}: ${rest}`
}

export function parseSessionTitleParts(title: string): { group?: string; rest: string } {
  const pipeIndex = title.indexOf("|")
  if (pipeIndex === -1) return { rest: title }
  const group = title.slice(0, pipeIndex).trim()
  const rest = title.slice(pipeIndex + 1).trim()
  if (!group) return { rest }
  const capitalized = group.charAt(0).toUpperCase() + group.slice(1)
  return { group: capitalized + ":", rest }
}
