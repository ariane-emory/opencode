const pattern = /^(New session|Child session) - \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

export function sessionTitle(title?: string) {
  if (!title) return title
  const match = title.match(pattern)
  return match?.[1] ?? title
}

export function formatSessionTitle(title: string): string {
  const pipe = title.indexOf("|")
  if (pipe === -1) return sessionTitle(title) ?? title
  const group = title.slice(0, pipe).trim()
  const rest = sessionTitle(title.slice(pipe + 1).trim()) ?? ""
  if (!group) return rest
  return `${group.charAt(0).toUpperCase() + group.slice(1)}: ${rest}`
}
