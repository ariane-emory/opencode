import path from "path"
import type { Tool } from "./tool"
import { Instance } from "../project/instance"

type Kind = "file" | "directory"

type Options = {
  bypass?: boolean
  kind?: Kind
}

export async function assertExternalDirectory(ctx: Tool.Context, target?: string, options?: Options) {
  if (!target) return

  if (options?.bypass) return

  if (Instance.containsPath(target)) return

  const kind = options?.kind ?? "file"
  const parentDir = kind === "directory" ? target : path.dirname(target)
  const relativeParentDir = path.relative(Instance.directory, parentDir)
  const glob = path.join(relativeParentDir, "*")

  await ctx.ask({
    permission: "external_directory",
    patterns: [glob],
    always: [glob],
    metadata: {
      filepath: target,
      parentDir: relativeParentDir,
    },
  })
}
