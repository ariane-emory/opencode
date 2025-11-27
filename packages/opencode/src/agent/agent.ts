import { Config } from "../config/config"
import z from "zod"
import { Provider } from "../provider/provider"
import { generateObject, type ModelMessage } from "ai"
import PROMPT_GENERATE from "./generate.txt"
import { SystemPrompt } from "../session/system"
import { Instance } from "../project/instance"
import { mergeDeep } from "remeda"
import { Wildcard } from "../util/wildcard"
import * as path from "path"

export namespace Agent {
  /**
   * Resolves file permissions based on glob patterns
   * @param permission - Either a simple permission string or a record of glob patterns to permissions
   * @param filePath - The absolute file path to check
   * @returns The resolved permission (ask, allow, or deny)
   */
  export function resolveFilePermission(
    permission: Config.Permission | Record<string, Config.Permission>,
    filePath: string,
  ): Config.Permission {
    // If it's a simple string permission, return it directly
    if (typeof permission === "string") {
      return permission
    }

    // Extract the basename for pattern matching
    const basename = path.basename(filePath)

    // Try to match against patterns
    const result = Wildcard.all(basename, permission)

    // If no match found, default to "allow" for backward compatibility
    return result ?? "allow"
  }

  export const Info = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      mode: z.enum(["subagent", "primary", "all"]),
      builtIn: z.boolean(),
      topP: z.number().optional(),
      temperature: z.number().optional(),
      color: z.string().optional(),
      permission: z.object({
        read: z.union([Config.Permission, z.record(z.string(), Config.Permission)]),
        write: z.union([Config.Permission, z.record(z.string(), Config.Permission)]),
        edit: z.union([Config.Permission, z.record(z.string(), Config.Permission)]),
        bash: z.record(z.string(), Config.Permission),
        webfetch: Config.Permission.optional(),
        doom_loop: Config.Permission.optional(),
        external_directory: Config.Permission.optional(),
      }),
      model: z
        .object({
          modelID: z.string(),
          providerID: z.string(),
        })
        .optional(),
      prompt: z.string().optional(),
      tools: z.record(z.string(), z.boolean()),
      options: z.record(z.string(), z.any()),
    })
    .meta({
      ref: "Agent",
    })
  export type Info = z.infer<typeof Info>

  const state = Instance.state(async () => {
    const cfg = await Config.get()
    const defaultTools = cfg.tools ?? {}
    const defaultPermission: Info["permission"] = {
      read: "allow",
      write: "allow",
      edit: "allow",
      bash: {
        "*": "allow",
      },
      webfetch: "allow",
      doom_loop: "ask",
      external_directory: "ask",
    }
    const agentPermission = mergeAgentPermissions(defaultPermission, cfg.permission ?? {})

    const planPermission = mergeAgentPermissions(
      {
        edit: "deny",
        bash: {
          "cut*": "allow",
          "diff*": "allow",
          "du*": "allow",
          "file *": "allow",
          "find * -delete*": "ask",
          "find * -exec*": "ask",
          "find * -fprint*": "ask",
          "find * -fls*": "ask",
          "find * -fprintf*": "ask",
          "find * -ok*": "ask",
          "find *": "allow",
          "git diff*": "allow",
          "git log*": "allow",
          "git show*": "allow",
          "git status*": "allow",
          "git branch": "allow",
          "git branch -v": "allow",
          "grep*": "allow",
          "head*": "allow",
          "less*": "allow",
          "ls*": "allow",
          "more*": "allow",
          "pwd*": "allow",
          "rg*": "allow",
          "sort --output=*": "ask",
          "sort -o *": "ask",
          "sort*": "allow",
          "stat*": "allow",
          "tail*": "allow",
          "tree -o *": "ask",
          "tree*": "allow",
          "uniq*": "allow",
          "wc*": "allow",
          "whereis*": "allow",
          "which*": "allow",
          "*": "ask",
        },
        webfetch: "allow",
      },
      cfg.permission ?? {},
    )

    const result: Record<string, Info> = {
      general: {
        name: "general",
        description:
          "General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries use this agent to perform the search for you.",
        tools: {
          todoread: false,
          todowrite: false,
          ...defaultTools,
        },
        options: {},
        permission: agentPermission,
        mode: "subagent",
        builtIn: true,
      },
      build: {
        name: "build",
        tools: { ...defaultTools },
        options: {},
        permission: agentPermission,
        mode: "primary",
        builtIn: true,
      },
      plan: {
        name: "plan",
        options: {},
        permission: planPermission,
        tools: {
          ...defaultTools,
        },
        mode: "primary",
        builtIn: true,
      },
    }
    for (const [key, value] of Object.entries(cfg.agent ?? {})) {
      if (value.disable) {
        delete result[key]
        continue
      }
      let item = result[key]
      if (!item)
        item = result[key] = {
          name: key,
          mode: "all",
          permission: agentPermission,
          options: {},
          tools: {},
          builtIn: false,
        }
      const { name, model, prompt, tools, description, temperature, top_p, mode, permission, color, ...extra } = value
      item.options = {
        ...item.options,
        ...extra,
      }
      if (model) item.model = Provider.parseModel(model)
      if (prompt) item.prompt = prompt
      if (tools)
        item.tools = {
          ...item.tools,
          ...tools,
        }
      item.tools = {
        ...defaultTools,
        ...item.tools,
      }
      if (description) item.description = description
      if (temperature != undefined) item.temperature = temperature
      if (top_p != undefined) item.topP = top_p
      if (mode) item.mode = mode
      if (color) item.color = color
      // just here for consistency & to prevent it from being added as an option
      if (name) item.name = name

      if (permission ?? cfg.permission) {
        item.permission = mergeAgentPermissions(cfg.permission ?? {}, permission ?? {})
      }
    }
    return result
  })

  export async function get(agent: string) {
    return state().then((x) => x[agent])
  }

  export async function list() {
    return state().then((x) => Object.values(x))
  }

  export async function generate(input: { description: string }) {
    const defaultModel = await Provider.defaultModel()
    const model = await Provider.getModel(defaultModel.providerID, defaultModel.modelID)
    const system = SystemPrompt.header(defaultModel.providerID)
    system.push(PROMPT_GENERATE)
    const existing = await list()
    const result = await generateObject({
      temperature: 0.3,
      prompt: [
        ...system.map(
          (item): ModelMessage => ({
            role: "system",
            content: item,
          }),
        ),
        {
          role: "user",
          content: `Create an agent configuration based on this request: \"${input.description}\".\n\nIMPORTANT: The following identifiers already exist and must NOT be used: ${existing.map((i) => i.name).join(", ")}\n  Return ONLY the JSON object, no other text, do not wrap in backticks`,
        },
      ],
      model: model.language,
      schema: z.object({
        identifier: z.string(),
        whenToUse: z.string(),
        systemPrompt: z.string(),
      }),
    })
    return result.object
  }
}

function mergeAgentPermissions(basePermission: any, overridePermission: any): Agent.Info["permission"] {
  // Normalize bash permission
  if (typeof basePermission.bash === "string") {
    basePermission.bash = {
      "*": basePermission.bash,
    }
  }
  if (typeof overridePermission.bash === "string") {
    overridePermission.bash = {
      "*": overridePermission.bash,
    }
  }

  // Normalize read permission
  if (typeof basePermission.read === "string") {
    basePermission.read = {
      "*": basePermission.read,
    }
  }
  if (typeof overridePermission.read === "string") {
    overridePermission.read = {
      "*": overridePermission.read,
    }
  }

  // Normalize write permission
  if (typeof basePermission.write === "string") {
    basePermission.write = {
      "*": basePermission.write,
    }
  }
  if (typeof overridePermission.write === "string") {
    overridePermission.write = {
      "*": overridePermission.write,
    }
  }

  // Normalize edit permission
  if (typeof basePermission.edit === "string") {
    basePermission.edit = {
      "*": basePermission.edit,
    }
  }
  if (typeof overridePermission.edit === "string") {
    overridePermission.edit = {
      "*": overridePermission.edit,
    }
  }

  const merged = mergeDeep(basePermission ?? {}, overridePermission ?? {}) as any

  let mergedBash
  if (merged.bash) {
    if (typeof merged.bash === "string") {
      mergedBash = {
        "*": merged.bash,
      }
    } else if (typeof merged.bash === "object") {
      mergedBash = mergeDeep(
        {
          "*": "allow",
        },
        merged.bash,
      )
    }
  }

  let mergedRead
  if (merged.read) {
    if (typeof merged.read === "string") {
      mergedRead = {
        "*": merged.read,
      }
    } else if (typeof merged.read === "object") {
      mergedRead = mergeDeep(
        {
          "*": "allow",
        },
        merged.read,
      )
    }
  }

  let mergedWrite
  if (merged.write) {
    if (typeof merged.write === "string") {
      mergedWrite = {
        "*": merged.write,
      }
    } else if (typeof merged.write === "object") {
      mergedWrite = mergeDeep(
        {
          "*": "allow",
        },
        merged.write,
      )
    }
  }

  let mergedEdit
  if (merged.edit) {
    if (typeof merged.edit === "string") {
      mergedEdit = {
        "*": merged.edit,
      }
    } else if (typeof merged.edit === "object") {
      mergedEdit = mergeDeep(
        {
          "*": "allow",
        },
        merged.edit,
      )
    }
  }

  const result: Agent.Info["permission"] = {
    read: mergedRead ?? { "*": "allow" },
    write: mergedWrite ?? { "*": "allow" },
    edit: mergedEdit ?? { "*": "allow" },
    webfetch: merged.webfetch ?? "allow",
    bash: mergedBash ?? { "*": "allow" },
    doom_loop: merged.doom_loop,
    external_directory: merged.external_directory,
  }

  return result
}
