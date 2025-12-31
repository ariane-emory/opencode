import path from "path"
import os from "os"
import fs from "fs/promises"
import { Config } from "../config/config"
import { Logger } from "./logger"

export namespace Prompter {
  export interface PromptConfig {
    template?: string
    variables?: Record<string, string>
    description?: string
  }

  export class PromptManager {
    private configPath: string

    constructor() {
      this.configPath = path.join(os.homedir(), ".config", "opencode", "prompts.json")
    }

    async readConfig(): Promise<Record<string, PromptConfig>> {
      try {
        const data = await fs.readFile(this.configPath, "utf-8")
        return JSON.parse(data)
      } catch (error) {
        return {}
      }
    }

    async writeConfig(config: Record<string, PromptConfig>): Promise<void> {
      await fs.mkdir(path.dirname(this.configPath), { recursive: true })
      await fs.writeFile(this.configPath, JSON.stringify(config, null, 2))
    }

    async getRewrittenPrompt(input: string, name?: string): Promise<string> {
      const promptName = name || this.getDefaultPromptName()
      
      // Check for custom prompt template
      if (promptName !== "default" && promptName) {
        const promptConfig = await this.getPrompt(promptName)
        if (promptConfig?.template) {
          return promptConfig.template.replace("{input}", input)
        }
      }

      // Default enhancement: add context and structure
      const enhanced = `Please help me with the following request:

${input}

Please provide a clear, structured response with actionable steps where appropriate.`

      return enhanced
    }

      // Basic enhancement: add context and structure
      const enhanced = `Please help me with the following request:

${input}

Please provide a clear, structured response with actionable steps where appropriate.`

      return enhanced
    }

    getDefaultPromptName(): string {
      return "default"
    }

    async addPrompt(name: string, config: PromptConfig): Promise<void> {
      const current = await this.readConfig()
      current[name] = config
      await this.writeConfig(current)
    }

    async listPrompts(): Promise<Record<string, PromptConfig>> {
      return await this.readConfig()
    }

    async getPrompt(name: string): Promise<PromptConfig | undefined> {
      const prompts = await this.readConfig()
      return prompts[name]
    }
  }

  export class Prompter {
    private manager: PromptManager
    private logger: Logger.Logger

    constructor() {
      this.manager = new PromptManager()
      this.logger = new Logger.Logger()
    }

    async rewrite(input: string, name?: string): Promise<string> {
      const rewritten = await this.manager.getRewrittenPrompt(input, name)
      
      // Log the interaction
      this.logger.logUser(input)
      this.logger.logRewritten(rewritten)
      
      return rewritten
    }

    async process(input: string, options: {
      name?: string
      model?: string
      verbose?: boolean
    }): Promise<string> {
      const rewritten = this.rewrite(input, options.name)

      if (options.verbose) {
        const promptName = options.name || this.manager.getDefaultPromptName()
        console.error(`Using prompt: ${promptName}`)
        console.error(`Model: ${options.model || 'default'}`)
        console.error(`Rewritten prompt:`)
        console.error(rewritten)
      }

      return rewritten
    }

    async listPrompts(): Promise<Record<string, PromptConfig>> {
      return this.manager.listPrompts()
    }

    async addPrompt(name: string, config: PromptConfig): Promise<void> {
      return this.manager.addPrompt(name, config)
    }
  }
}

// Also export the namespace as default for easier import
export default Prompter