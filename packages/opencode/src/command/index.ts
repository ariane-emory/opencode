import { BusEvent } from "@/bus/bus-event"
import { InstanceState } from "@/effect/instance-state"
import type { InstanceContext } from "@/project/instance"
import { SessionID, MessageID } from "@/session/schema"
import { Effect, Layer, Context } from "effect"
import { EffectLogger } from "@/effect/logger"
import z from "zod"
import path from "path"
import fs from "fs/promises"
import { existsSync } from "fs"
import { Config } from "../config/config"
import { ConfigMarkdown } from "../config/markdown"
import { MCP } from "../mcp"
import { Skill } from "../skill"
import { Log } from "../util/log"
import { Instance } from "@/project/instance"
import PROMPT_INITIALIZE from "./template/initialize.txt"
import PROMPT_REVIEW from "./template/review.txt"

export namespace Command {
  const log = Log.create({ service: "command" })

  type State = {
    commands: Record<string, Info>
  }

  export const Event = {
    Executed: BusEvent.define(
      "command.executed",
      z.object({
        name: z.string(),
        sessionID: SessionID.zod,
        arguments: z.string(),
        messageID: MessageID.zod,
      }),
    ),
  }

  export const Info = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      agent: z.string().optional(),
      model: z.string().optional(),
      source: z.enum(["command", "mcp", "skill"]).optional(),
      // workaround for zod not supporting async functions natively so we use getters
      // https://zod.dev/v4/changelog?id=zfunction
      template: z.promise(z.string()).or(z.string()),
      // AGENTS: The `ignored` property marks commands whose output should not be processed by the model.
      // When merging this branch, ensure `ignored` is included in ALL places where commands are loaded:
      // 1. The Info schema (here)
      // 2. The Config.Command schema in config/config.ts
      // 3. Any command loading loops (e.g., state(), loadFreshCommands(), etc.)
      // 4. The prompt.ts code that marks text parts as ignored
      // DO NOT clobber or omit this property during merges!
      subtask: z.boolean().optional(),
      ignored: z.boolean().optional(),
      hints: z.array(z.string()),
    })
    .meta({
      ref: "Command",
    })

  // for some reason zod is inferring `string` for z.promise(z.string()).or(z.string()) so we have to manually override it
  export type Info = Omit<z.infer<typeof Info>, "template"> & { template: Promise<string> | string }

  const commandCache = new Map<string, { command: Info; mtime: number; filePath: string }>()

  function rel(item: string, patterns: string[]) {
    const normalizedItem = item.replaceAll("\\", "/")
    for (const pattern of patterns) {
      const index = normalizedItem.indexOf(pattern)
      if (index === -1) continue
      return normalizedItem.slice(index + pattern.length)
    }
  }

  function trim(file: string) {
    const ext = path.extname(file)
    return ext.length ? file.slice(0, -ext.length) : file
  }

  async function findCommandFile(name: string): Promise<{ path: string } | null> {
    const directories = await Config.directories()
    for (const dir of directories) {
      const subdirs = ["command", "commands", ".opencode/command", ".opencode/commands"]
      for (const subdir of subdirs) {
        const filePath = path.join(dir, subdir, name + ".md")
        if (existsSync(filePath)) return { path: filePath }
        const nested = path.join(dir, subdir, name + "/index.md")
        if (existsSync(nested)) return { path: nested }
      }
    }
    return null
  }

  async function loadSingleCommand(filePath: string): Promise<Info | null> {
    const md = await ConfigMarkdown.parse(filePath).catch(() => null)
    if (!md) return null
    const patterns = ["/.opencode/command/", "/.opencode/commands/", "/command/", "/commands/"]
    const file = rel(filePath, patterns) ?? path.basename(filePath)
    const cmdName = trim(file)
    const config = { name: cmdName, ...md.data, template: md.content.trim() }
    const parsed = Config.Command.safeParse(config)
    if (!parsed.success) return null
    return { ...parsed.data, name: cmdName, hints: hints(parsed.data.template) }
  }

  async function loadFreshCommandsWithMtime(): Promise<Record<string, Info>> {
    const result: Record<string, Info> = {}
    const cfg = await Config.get()
    for (const [name, command] of Object.entries(cfg.command ?? {})) {
      result[name] = { ...command, name, hints: hints(command.template) }
    }
    const directories = await Config.directories()
    for (const dir of directories) {
      const commands = await Config.reloadCommands(dir)
      for (const [name, command] of Object.entries(commands)) {
        result[name] = { ...command, name, hints: hints(command.template) }
      }
    }
    for (const item of await Skill.all()) {
      if (result[item.name]) continue
      result[item.name] = { name: item.name, description: item.description, source: "skill" as const, get template() { return item.content }, hints: [] }
    }
    return result
  }

  function createBuiltInCommands(): Record<string, Info> {
    const worktree = Instance.worktree
    return {
      [Default.INIT]: { name: Default.INIT, description: "guided AGENTS.md setup", source: "command" as const, get template() { return PROMPT_INITIALIZE.replace("${path}", worktree) }, hints: hints(PROMPT_INITIALIZE) },
      [Default.REVIEW]: { name: Default.REVIEW, description: "review changes [commit|branch|pr], defaults to uncommitted", source: "command" as const, get template() { return PROMPT_REVIEW.replace("${path}", worktree) }, subtask: true, hints: hints(PROMPT_REVIEW) },
    }
  }

  export function hints(template: string) {
    const result: string[] = []
    const numbered = template.match(/\$\d+/g)
    if (numbered) {
      for (const match of [...new Set(numbered)].sort()) result.push(match)
    }
    const extended = template.match(/\$\{(\d+|\d*\.\.\d*)\}/g)
    if (extended) {
      for (const match of [...new Set(extended)].sort()) {
        if (!result.includes(match)) result.push(match)
      }
    }
    if (template.includes("$ARGUMENTS")) result.push("$ARGUMENTS")
    return result
  }

  export const Default = {
    INIT: "init",
    REVIEW: "review",
  } as const

  export interface Interface {
    readonly get: (name: string) => Effect.Effect<Info | undefined>
    readonly list: () => Effect.Effect<Info[]>
  }

  export class Service extends Context.Service<Service, Interface>()("@opencode/Command") {}

  export const layer = Layer.effect(
    Service,
    Effect.gen(function* () {
      const config = yield* Config.Service
      const mcp = yield* MCP.Service
      const skill = yield* Skill.Service

      const init = Effect.fn("Command.state")(function* (ctx: InstanceContext) {
        const cfg = yield* config.get()
        const commands: Record<string, Info> = {}

        commands[Default.INIT] = {
          name: Default.INIT,
          description: "guided AGENTS.md setup",
          source: "command",
          get template() {
            return PROMPT_INITIALIZE.replace("${path}", ctx.worktree)
          },
          hints: hints(PROMPT_INITIALIZE),
        }
        commands[Default.REVIEW] = {
          name: Default.REVIEW,
          description: "review changes [commit|branch|pr], defaults to uncommitted",
          source: "command",
          get template() {
            return PROMPT_REVIEW.replace("${path}", ctx.worktree)
          },
          subtask: true,
          hints: hints(PROMPT_REVIEW),
        }

        for (const [name, command] of Object.entries(cfg.command ?? {})) {
          commands[name] = {
            name,
            agent: command.agent,
            model: command.model,
            description: command.description,
            source: "command",
            get template() {
              return command.template
            },
            subtask: command.subtask,
            ignored: command.ignored,
            hints: hints(command.template),
          }
        }

        for (const [name, prompt] of Object.entries(yield* mcp.prompts())) {
          commands[name] = {
            name,
            source: "mcp",
            description: prompt.description,
            get template() {
              return Effect.runPromise(
                mcp
                  .getPrompt(
                    prompt.client,
                    prompt.name,
                    prompt.arguments
                      ? Object.fromEntries(prompt.arguments.map((argument, i) => [argument.name, `$${i + 1}`]))
                      : {},
                  )
                  .pipe(
                    Effect.map(
                      (template) =>
                        template?.messages
                          .map((message) => (message.content.type === "text" ? message.content.text : ""))
                          .join("\n") || "",
                    ),
                    Effect.provide(EffectLogger.layer),
                  ),
              )
            },
            hints: prompt.arguments?.map((_, i) => `$${i + 1}`) ?? [],
          }
        }

        for (const item of yield* skill.all()) {
          if (commands[item.name]) continue
          commands[item.name] = {
            name: item.name,
            description: item.description,
            source: "skill",
            get template() {
              return item.content
            },
            hints: [],
          }
        }

        return {
          commands,
        }
      })

      const state = yield* InstanceState.make<State>((ctx) => init(ctx))

      const get = Effect.fn("Command.get")(function* (name: string) {
        const cfg = yield* Effect.promise(() => Config.get())
        if (cfg.experimental?.cache_command_markdown_files === false) {
          const builtIn = createBuiltInCommands()
          if (builtIn[name]) return builtIn[name]
          const cached = commandCache.get(name)
          const fileInfo = yield* Effect.promise(() => findCommandFile(name))
          if (!fileInfo && cfg.command?.[name]) {
            return { ...cfg.command[name], name, hints: hints(cfg.command[name].template) }
          }
          if (!fileInfo) return undefined
          if (cached && cached.filePath === fileInfo.path) {
            const stat = yield* Effect.promise(() => fs.stat(fileInfo.path))
            if (stat.mtimeMs === cached.mtime) return cached.command
          }
          const command = yield* Effect.promise(() => loadSingleCommand(fileInfo.path))
          if (command) {
            const stat = yield* Effect.promise(() => fs.stat(fileInfo.path))
            commandCache.set(name, { command, mtime: stat.mtimeMs, filePath: fileInfo.path })
          }
          return command ?? undefined
        }
        const s = yield* InstanceState.get(state)
        return s.commands[name]
      })

      const list = Effect.fn("Command.list")(function* () {
        const cfg = yield* Effect.promise(() => Config.get())
        if (cfg.experimental?.cache_command_markdown_files === false) {
          const fresh = yield* Effect.promise(() => loadFreshCommandsWithMtime())
          return Object.values(fresh)
        }
        const s = yield* InstanceState.get(state)
        return Object.values(s.commands)
      })

      return Service.of({ get, list })
    }),
  )

  export const defaultLayer = layer.pipe(
    Layer.provide(Config.defaultLayer),
    Layer.provide(MCP.defaultLayer),
    Layer.provide(Skill.defaultLayer),
  )
}
