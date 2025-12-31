import { cmd } from "./cmd"
import { UI } from "../ui"
import { Prompter } from "../../prompter"
import type { Argv } from "yargs"

export const PromptCommand = cmd({
  command: "prompt [prompt..]",
  describe: "alias for question command - rewrite and display a prompt",
  builder: (yargs: Argv) => {
    return yargs
      .positional("prompt", {
        describe: "prompt text to rewrite",
        type: "string",
        array: true,
        default: [],
      })
      .option("name", {
        alias: ["n"],
        describe: "prompt template name to use",
        type: "string",
      })
      .option("model", {
        alias: ["m"],
        describe: "model to use in the format of provider/model",
        type: "string",
      })
      .option("verbose", {
        alias: ["v"],
        describe: "show verbose output including prompt template details",
        type: "boolean",
        default: false,
      })
      .option("execute", {
        alias: ["e"],
        describe: "execute the rewritten prompt with opencode run",
        type: "boolean",
        default: false,
      })
  },
  async handler(args) {
    const prompt = [...args.prompt, ...(args["--"] || [])]
      .map((arg) => (arg.includes(" ") ? `"${arg.replace(/"/g, '\\"')}"` : arg))
      .join(" ")

    if (prompt.trim().length === 0) {
      UI.error("You must provide a prompt")
      process.exit(1)
    }

    const prompter = new Prompter.Prompter()
    const rewritten = await prompter.process(prompt, {
      name: args.name,
      model: args.model,
      verbose: args.verbose,
    })

    if (args.execute) {
      // Execute with opencode run
      const { spawn } = await import("child_process")
      const runArgs = ["run", rewritten]
      if (args.model) {
        runArgs.push("--model", args.model)
      }
      if (args.name) {
        runArgs.push("--agent", args.name)
      }
      
      const child = spawn("opencode", runArgs, {
        stdio: "inherit",
      })
      
      child.on("exit", (code) => {
        process.exit(code || 0)
      })
    } else {
      // Just output the rewritten prompt
      console.log(rewritten)
    }
  },
})