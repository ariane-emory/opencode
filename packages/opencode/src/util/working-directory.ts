import path from "path"

/**
 * Preserves the original working directory when opencode is started.
 *
 * This is important because when using `bun dev`, the process working directory
 * might be different from where the user actually ran the command.
 * For example, if user runs `bun dev` in /Volumes/K/Code/go/opencode,
 * but the script runs from /Volumes/K/Code/go/opencode/packages/opencode,
 * we want to preserve the original user intent.
 */
let originalWorkingDirectory: string | undefined

export function getOriginalWorkingDirectory(): string {
  if (originalWorkingDirectory !== undefined) {
    return originalWorkingDirectory
  }

  // First try to use PWD environment variable which is typically set by the shell
  // to the directory where the user ran the command
  if (process.env.PWD && process.env.PWD !== process.cwd()) {
    originalWorkingDirectory = process.env.PWD
    return originalWorkingDirectory
  }

  // If PWD is not set or is the same as cwd, try to determine from the command line
  // This is a fallback for cases where PWD might not be reliable
  const cwd = process.cwd()

  // Check if we're in a subdirectory of where the user likely intended to work
  // This is a heuristic for the bun dev case
  if (cwd.includes("/packages/opencode")) {
    // If we're in packages/opencode, the user likely intended to work
    // from the parent directory
    const parentDir = cwd.replace(/\/packages\/opencode$/, "")
    if (parentDir !== cwd) {
      originalWorkingDirectory = parentDir
      return originalWorkingDirectory
    }
  }

  // Default to current working directory
  originalWorkingDirectory = cwd
  return originalWorkingDirectory
}

/**
 * Resolves a path relative to the original working directory.
 * If no path is provided, returns the original working directory.
 */
export function resolveOriginalPath(inputPath?: string): string {
  const original = getOriginalWorkingDirectory()
  if (!inputPath) {
    return original
  }

  if (inputPath.startsWith("/")) {
    // Absolute path, return as-is
    return inputPath
  }

  // Relative path, resolve against original working directory
  return path.resolve(original, inputPath)
}
