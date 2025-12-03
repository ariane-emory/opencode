/**
 * Get the working directory where opencode was invoked.
 *
 * When opencode is installed globally via a wrapper script, the wrapper sets
 * OPENCODE_ORIGINAL_CWD to preserve the user's working directory before
 * changing to the project directory to load dependencies.
 *
 * Falls back to process.cwd() when running directly (e.g., `bun dev`).
 */
export function getWorkingDirectory(): string {
  return process.env.OPENCODE_ORIGINAL_CWD ?? process.cwd()
}
