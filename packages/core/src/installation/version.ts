declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

function resolveDevVersion(): string {
  if (typeof OPENCODE_VERSION === "string") return OPENCODE_VERSION
  try {
    const { execSync } = require("child_process")
    const branch = execSync("git branch --show-current", { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim()
    const match = branch.match(/^integration\/(\d{4}-\d{2}-\d{2}-\d{2}-\d{2})$/)
    if (match) return match[1]
    return "local"
  } catch {
    return "local"
  }
}

function resolveDevChannel(): string {
  if (typeof OPENCODE_CHANNEL === "string") return OPENCODE_CHANNEL
  try {
    const { execSync } = require("child_process")
    const branch = execSync("git branch --show-current", { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim()
    if (branch && branch !== "main" && branch !== "dev" && branch !== "master") return branch
    return "latest"
  } catch {
    return "latest"
  }
}

export const InstallationVersion = resolveDevVersion()
export const InstallationChannel = resolveDevChannel()
export const InstallationLocal = InstallationChannel === "local"
