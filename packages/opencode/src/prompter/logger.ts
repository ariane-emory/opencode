import fs from "fs/promises"
import path from "path"
import os from "os"

export namespace Logger {
  export class Logger {
    private logPath: string

    constructor() {
      this.logPath = path.join(os.homedir(), ".config", "opencode", "prompt-enhancer", "log.md")
    }

    private async ensureLogDir(): Promise<void> {
      await fs.mkdir(path.dirname(this.logPath), { recursive: true })
    }

    private async appendToLog(content: string): Promise<void> {
      await this.ensureLogDir()
      const timestamp = new Date().toISOString()
      const entry = `[${timestamp}] ${content}\n`
      await fs.appendFile(this.logPath, entry)
    }

    logUser(input: string): void {
      this.appendToLog(`User: ${input}`).catch(console.error)
    }

    logRewritten(prompt: string): void {
      this.appendToLog(`Rewritten: ${prompt}`).catch(console.error)
    }
  }
}