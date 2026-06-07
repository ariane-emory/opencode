import { Filesystem } from "@/util/filesystem"
import { FrontmatterError } from "@opencode-ai/core/v1/config/error"
import { ConfigMarkdown as ConfigMarkdownCore } from "@opencode-ai/core/config/markdown"

export const FILE_REGEX = /(?<![\w`])@(\.?[^\s`,.]*(?:\.[^\s`,.]+)*)/g
export const SHELL_REGEX = /!`([^`]+)`/g

export function files(template: string) {
  return Array.from(template.matchAll(FILE_REGEX))
}

export function shell(template: string) {
  return Array.from(template.matchAll(SHELL_REGEX))
}

// other coding agents like claude code allow invalid yaml in their
// frontmatter, we need to fallback to a more permissive parser for those cases
export const fallbackSanitization = ConfigMarkdownCore.sanitize

function interpolateEnvironmentVariables(obj: any): any {
  if (typeof obj === "string") {
    return obj.replace(/\{env:([^}]+)\}/g, (_, varName) => {
      return process.env[varName] || ""
    })
  } else if (Array.isArray(obj)) {
    return obj.map(interpolateEnvironmentVariables)
  } else if (obj && typeof obj === "object") {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = interpolateEnvironmentVariables(value)
    }
    return result
  }
  return obj
}

export async function parse(filePath: string) {
  const template = await Filesystem.readText(filePath)

  try {
    const md = ConfigMarkdownCore.parse(template)
    md.data = interpolateEnvironmentVariables(md.data)
    return md
  } catch (err) {
    throw new FrontmatterError(
      {
        path: filePath,
        message: `${filePath}: Failed to parse YAML frontmatter: ${err instanceof Error ? err.message : String(err)}`,
      },
      { cause: err },
    )
  }
}

export * as ConfigMarkdown from "./markdown"
