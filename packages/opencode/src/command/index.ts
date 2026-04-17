import { BusEvent } from "@/bus/bus-event"
import { InstanceState } from "@/effect"
import { EffectBridge } from "@/effect"
import type { InstanceContext } from "@/project/instance"
import { Instance } from "@/project/instance"
import { SessionID, MessageID } from "@/session/schema"
import { Effect, Layer, Context } from "effect"
import z from "zod"
import path from "path"
import fs from "fs/promises"
import { existsSync } from "fs"
import { Config } from "../config"
import * as ConfigMarkdown from "../config/markdown"
import { Glob } from "@opencode-ai/shared/util/glob"
import { MCP } from "../mcp"
import { Skill } from "../skill"
import PROMPT_INITIALIZE from "./template/initialize.txt"
import PROMPT_REVIEW from "./template/review.txt"

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
    subtask: z.boolean().optional(),
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

async function findCommandFile(name: string, directories: string[]): Promise<{ path: string } | null> {
  for (const dir of directories) {
    const subdirs = ["command", "commands", ".opencode/command", ".opencode/commands"]
    for (const subdir of subdirs) {
      const filePath = path.join(dir, subdir, name + ".md")
      if (existsSync(filePath)) {
        return { path: filePath }
      }
      const nested = path.join(dir, subdir, name + "/index.md")
      if (existsSync(nested)) {
        return { path: nested }
      }
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
  const template = md.content.trim()

  return {
    name: cmdName,
    description: md.data?.description,
    agent: md.data?.agent,
    model: md.data?.model,
    source: "command" as const,
    template,
    subtask: md.data?.subtask,
    hints: hints(template),
  }
}

async function loadFreshCommandsWithMtime(directories: string[]): Promise<Record<string, Info>> {
  const result: Record<string, Info> = createBuiltInCommands()

  for (const dir of directories) {
    const subdirs = ["command", "commands", ".opencode/command", ".opencode/commands"]
    for (const subdir of subdirs) {
      const cmdDir = path.join(dir, subdir)
      if (!existsSync(cmdDir)) continue

      const files = await Glob.scan("**/*.md", { cwd: cmdDir, absolute: true, dot: true, symlink: true })
      for (const filePath of files) {
        const stat = await fs.stat(filePath)
        const mtime = stat.mtimeMs
        const patterns = ["/.opencode/command/", "/.opencode/commands/", "/command/", "/commands/"]
        const file = rel(filePath, patterns) ?? path.basename(filePath)
        const cmdName = trim(file)

        const cached = commandCache.get(cmdName)
        if (cached && cached.filePath === filePath && cached.mtime === mtime) {
          result[cmdName] = cached.command
          continue
        }

        const command = await loadSingleCommand(filePath)
        if (command) {
          commandCache.set(cmdName, { command, mtime, filePath })
          result[cmdName] = command
        }
      }
    }
  }

  return result
}

function createBuiltInCommands(): Record<string, Info> {
  return {
    [Default.INIT]: {
      name: Default.INIT,
      description: "create/update AGENTS.md",
      source: "command",
      get template() {
        return PROMPT_INITIALIZE.replace("${path}", Instance.worktree)
      },
      hints: hints(PROMPT_INITIALIZE),
    },
    [Default.REVIEW]: {
      name: Default.REVIEW,
      description: "review changes [commit|branch|pr], defaults to uncommitted",
      source: "command",
      get template() {
        return PROMPT_REVIEW.replace("${path}", Instance.worktree)
      },
      subtask: true,
      hints: hints(PROMPT_REVIEW),
    },
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
      const bridge = yield* EffectBridge.make()
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
          hints: hints(command.template),
        }
      }

      for (const [name, prompt] of Object.entries(yield* mcp.prompts())) {
        commands[name] = {
          name,
          source: "mcp",
          description: prompt.description,
          get template() {
            return bridge.promise(
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
      const cfg = yield* config.get()
      if (cfg.experimental?.cache_command_markdown_files === false) {
        const builtIn = createBuiltInCommands()
        if (builtIn[name]) return builtIn[name]

        const dirs = yield* config.directories()
        const cached = commandCache.get(name)
        const fileInfo = yield* Effect.promise(() => findCommandFile(name, dirs))

        if (!fileInfo && cfg.command?.[name]) {
          return { ...cfg.command[name], name, hints: hints(cfg.command[name].template) }
        }

        if (!fileInfo) {
          return undefined
        }

        if (cached && cached.filePath === fileInfo.path) {
          const stat = yield* Effect.promise(() => fs.stat(fileInfo.path))
          if (stat.mtimeMs === cached.mtime) {
            return cached.command
          }
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
      const cfg = yield* config.get()
      if (cfg.experimental?.cache_command_markdown_files === false) {
        const dirs = yield* config.directories()
        const fresh = yield* Effect.promise(() => loadFreshCommandsWithMtime(dirs))

        for (const [name, prompt] of Object.entries(yield* mcp.prompts())) {
          if (!fresh[name]) {
            const bridge = yield* EffectBridge.make()
            fresh[name] = {
              name,
              source: "mcp",
              description: prompt.description,
              get template() {
                return bridge.promise(
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
                    ),
                )
              },
              hints: prompt.arguments?.map((_, i) => `$${i + 1}`) ?? [],
            }
          }
        }

        for (const item of yield* skill.all()) {
          if (!fresh[item.name]) {
            fresh[item.name] = {
              name: item.name,
              description: item.description,
              source: "skill",
              get template() {
                return item.content
              },
              hints: [],
            }
          }
        }

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

export * as Command from "."
