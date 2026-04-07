declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

export const VERSION = "2026-04-06-14-10"
export const CHANNEL = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : "local"
