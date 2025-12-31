import { cmd } from "./cmd"
import { UI } from "../ui"
import { Prompter } from "../../prompter"
import * as prompts from "@clack/prompts"
import type { Argv } from "yargs"

const PromptListCommand = cmd({
  command: "list",
  describe: "list all available prompt templates",
  async handler() {
    const prompter = new Prompter.Prompter()
    const prompts = await prompter.listPrompts()
    
    if (Object.keys(prompts).length === 0) {
      UI.println("No prompt templates found.")
      return
    }

    UI.println("Available prompt templates:")
    for (const [name, config] of Object.entries(prompts) as [string, Prompter.PromptConfig][]) {
      UI.println(`  ${name}: ${config.description || 'No description'}`)
    }
  },
})

const PromptAddCommand = cmd({
  command: "add <name>",
  describe: "add a new prompt template",
  builder: (yargs: Argv) => {
    return yargs
      .positional("name", {
        describe: "name of the prompt template",
        type: "string",
      })
      .option("template", {
        alias: ["t"],
        describe: "prompt template string",
        type: "string",
      })
      .option("description", {
        alias: ["d"],
        describe: "description of the prompt template",
        type: "string",
      })
  },
  async handler(args) {
    const prompter = new Prompter.Prompter()
    
    let template = args.template
    if (!template) {
      const result = await prompts.text({
        message: "Enter prompt template:",
        placeholder: "Use {input} as placeholder for user input",
        validate: (x) => (x && x.length > 0 ? undefined : "Template is required"),
      })
      if (prompts.isCancel(result)) throw new UI.CancelledError()
      template = result
    }

    let description = args.description
    if (!description) {
      const result = await prompts.text({
        message: "Enter description:",
        validate: (x) => (x && x.length > 0 ? undefined : "Description is required"),
      })
      if (prompts.isCancel(result)) throw new UI.CancelledError()
      description = result
    }

    if (!args.name) {
      throw new Error("Name is required")
    }

    await prompter.addPrompt(args.name!, {
      template,
      description: description || '',
    })

    UI.println(`Prompt template "${args.name}" added successfully.`)
  },
})

export const PromptManageCommand = cmd({
  command: "prompt-manage",
  describe: "manage prompt templates",
  builder: (yargs) => yargs.command(PromptListCommand).command(PromptAddCommand).demandCommand(),
  async handler() {},
})