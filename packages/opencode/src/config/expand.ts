import { $ } from "bun"
import matter from "gray-matter"
import { ConfigMarkdown } from "./markdown"
import { substituteArguments } from "./substitute"

export namespace MarkdownExpand {
  const MAX_ITERATIONS = 100

  export interface Options {
    cwd?: string
    stripFrontmatter?: boolean
    args?: string[]
  }

  export async function expand(content: string, options: Options = {}): Promise<string> {
    const { cwd = process.cwd(), stripFrontmatter = true, args = [] } = options

    // Build environment variables for arguments
    const env: Record<string, string> = {
      ...process.env,
      ARGUMENTS: args.join(" "),
    }

    // Build the positional args string for shell wrapper
    const quotedArgs = args.map((arg) => `'${arg.replace(/'/g, "'\\''")}'`).join(" ")

    let result = content

    if (stripFrontmatter) {
      try {
        const parsed = matter(content)
        result = parsed.content
      } catch {
        // If frontmatter parsing fails, use content as-is
      }
    }

    // Substitute $1, $2, ..., ${N:M}, and $ARGUMENTS using shared module
    result = substituteArguments(result, args).result

    let iteration = 0
    while (iteration < MAX_ITERATIONS) {
      const matches = ConfigMarkdown.shell(result)
      if (matches.length === 0) break

      const replacements = await Promise.all(
        matches.map(async (match) => {
          const cmd = match[1]
          try {
            // Wrap command in bash with positional parameters
            const wrappedCmd =
              args.length > 0 ? `bash -c '${cmd.replace(/'/g, "'\\''")}' -- ${quotedArgs}` : cmd
            const output = await $`${{ raw: wrappedCmd }}`
              .quiet()
              .nothrow()
              .cwd(cwd)
              .env(env)
              .text()
            return { match: match[0], output: output.trimEnd() }
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            return { match: match[0], output: `Error executing command: ${message}` }
          }
        }),
      )

      for (const { match, output } of replacements) {
        result = result.replace(match, output)
      }

      iteration++
    }

    return result.trim()
  }

  export async function expandFile(filePath: string, options: Options = {}): Promise<string> {
    const file = Bun.file(filePath)
    const content = await file.text()
    return expand(content, options)
  }
}
