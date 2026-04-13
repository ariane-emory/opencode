declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

export const VERSION = typeof OPENCODE_VERSION === "string" ? OPENCODE_VERSION : "2026-04-12-16-07"
export const CHANNEL = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : "local"
