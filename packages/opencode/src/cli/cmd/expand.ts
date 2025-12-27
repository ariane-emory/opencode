import type { Argv } from "yargs"
import path from "path"
import { cmd } from "./cmd"
import { UI } from "../ui"
import { MarkdownExpand } from "../../config/expand"
import { EOL } from "os"

export const ExpandCommand = cmd({
  command: "expand [file] [args..]",
  describe: "expand shell commands in a markdown file",
  builder: (yargs: Argv) => {
    return yargs
      .positional("file", {
        describe: 'path to markdown file, or "-" for stdin',
        type: "string",
      })
      .positional("args", {
        describe: "arguments available as $1, $2, ... and $ARGUMENTS in shell commands",
        type: "string",
        array: true,
      })
      .option("output", {
        alias: ["o"],
        describe: "write to file instead of stdout",
        type: "string",
      })
      .option("cwd", {
        describe: "working directory for shell commands",
        type: "string",
      })
  },
  handler: async (args) => {
    const baseCwd = process.env.PWD ?? process.cwd()

    const content = await (async () => {
      // Treat missing file, "-", or empty string as stdin
      if (!args.file || args.file === "-") {
        return await Bun.stdin.text()
      }

      const filePath = path.resolve(baseCwd, args.file)
      const file = Bun.file(filePath)

      if (!(await file.exists())) {
        UI.error(`File not found: ${args.file}`)
        process.exit(1)
      }

      return await file.text()
    })()

    const cwd = args.cwd ? path.resolve(baseCwd, args.cwd) : baseCwd

    const result = await MarkdownExpand.expand(content, {
      cwd,
      stripFrontmatter: true,
      args: args.args ?? [],
    })

    if (args.output) {
      const outputPath = path.resolve(baseCwd, args.output)
      await Bun.write(outputPath, result + EOL)
    } else {
      process.stdout.write(result + EOL)
    }
  },
})
