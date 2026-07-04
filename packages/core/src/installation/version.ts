declare global {
  const OPENCODE_VERSION: string
  const OPENCODE_CHANNEL: string
}

function deriveFromGit() {
  try {
    const { execSync } = require("child_process")
    const branch = execSync("git branch --show-current", { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim()
    if (!branch) return { channel: "local", version: "local" }
    const integrationMatch = branch.match(/^integration\/(\d{4}-\d{2}-\d{2}-\d{2}-\d{2})$/)
    if (integrationMatch) return { channel: branch, version: integrationMatch[1] }
    const ts = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "")
    return { channel: branch, version: `0.0.0-${branch}-${ts}` }
  } catch {
    return { channel: "local", version: "local" }
  }
}

const fallback = typeof OPENCODE_VERSION === "string" ? null : deriveFromGit()

export const InstallationVersion = typeof OPENCODE_VERSION === "string" ? OPENCODE_VERSION : (fallback?.version ?? "local")
export const InstallationChannel = typeof OPENCODE_CHANNEL === "string" ? OPENCODE_CHANNEL : (fallback?.channel ?? "local")
export const InstallationLocal = InstallationChannel === "local"
