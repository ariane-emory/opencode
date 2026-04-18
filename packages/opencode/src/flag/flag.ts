import { Config } from "effect"

function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

function falsy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "false" || value === "0"
}

function envWithFallback(newName: string, legacyName: string): string | undefined {
  return process.env[newName] ?? process.env[legacyName]
}

function truthyWithFallback(newName: string, legacyName: string): boolean {
  const value = (process.env[newName] ?? process.env[legacyName])?.toLowerCase()
  return value === "true" || value === "1"
}

function number(key: string) {
  const value = process.env[key]
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

function numberWithFallback(newName: string, legacyName: string): number | undefined {
  return number(newName) ?? number(legacyName)
}

export namespace Flag {
  export const OTEL_EXPORTER_OTLP_ENDPOINT = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"]
  export const OTEL_EXPORTER_OTLP_HEADERS = process.env["OTEL_EXPORTER_OTLP_HEADERS"]

  export const OPENCODE_AUTO_SHARE = truthy("OPENCODE_AUTO_SHARE")
  export const OPENCODE_AUTO_HEAP_SNAPSHOT = truthy("OPENCODE_AUTO_HEAP_SNAPSHOT")
  export const OPENCODE_GIT_BASH_PATH = process.env["OPENCODE_GIT_BASH_PATH"]
  export const OPENCODE_CONFIG = process.env["OPENCODE_CONFIG"]
  export declare const OPENCODE_PURE: boolean
  export declare const OPENCODE_TUI_CONFIG: string | undefined
  export declare const OPENCODE_CONFIG_DIR: string | undefined
  export declare const OPENCODE_PLUGIN_META_FILE: string | undefined
  export const OPENCODE_CONFIG_CONTENT = process.env["OPENCODE_CONFIG_CONTENT"]
  export const OPENCODE_DISABLE_AUTOUPDATE = truthy("OPENCODE_DISABLE_AUTOUPDATE")
  export const OPENCODE_ALWAYS_NOTIFY_UPDATE = truthy("OPENCODE_ALWAYS_NOTIFY_UPDATE")
  export const OPENCODE_DISABLE_PRUNE = truthy("OPENCODE_DISABLE_PRUNE")
  export const OPENCODE_DISABLE_TERMINAL_TITLE = truthy("OPENCODE_DISABLE_TERMINAL_TITLE")
  export const OPENCODE_SHOW_TTFD = truthy("OPENCODE_SHOW_TTFD")
  export const OPENCODE_PERMISSION = process.env["OPENCODE_PERMISSION"]
  export const OPENCODE_DISABLE_DEFAULT_PLUGINS = truthy("OPENCODE_DISABLE_DEFAULT_PLUGINS")
  export const OPENCODE_DISABLE_LSP_DOWNLOAD = truthy("OPENCODE_DISABLE_LSP_DOWNLOAD")
  export const OPENCODE_ENABLE_EXPERIMENTAL_MODELS = truthy("OPENCODE_ENABLE_EXPERIMENTAL_MODELS")
  export const OPENCODE_DISABLE_AUTOCOMPACT = truthy("OPENCODE_DISABLE_AUTOCOMPACT")
  export const OPENCODE_DISABLE_MODELS_FETCH = truthy("OPENCODE_DISABLE_MODELS_FETCH")
  export const OPENCODE_DISABLE_MOUSE = truthy("OPENCODE_DISABLE_MOUSE")
  export const OPENCODE_DISABLE_CLAUDE_CODE = truthy("OPENCODE_DISABLE_CLAUDE_CODE")
  export const OPENCODE_DISABLE_CLAUDE_CODE_PROMPT =
    OPENCODE_DISABLE_CLAUDE_CODE || truthy("OPENCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const OPENCODE_DISABLE_CLAUDE_CODE_SKILLS =
    OPENCODE_DISABLE_CLAUDE_CODE || truthy("OPENCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const OPENCODE_DISABLE_EXTERNAL_SKILLS =
    OPENCODE_DISABLE_CLAUDE_CODE_SKILLS || truthy("OPENCODE_DISABLE_EXTERNAL_SKILLS")
  export declare const OPENCODE_DISABLE_PROJECT_CONFIG: boolean
  export const OPENCODE_FAKE_VCS = process.env["OPENCODE_FAKE_VCS"]
  export declare const OPENCODE_CLIENT: string
  export const OPENCODE_SERVER_PASSWORD = process.env["OPENCODE_SERVER_PASSWORD"]
  export const OPENCODE_SERVER_USERNAME = process.env["OPENCODE_SERVER_USERNAME"]
  export const OPENCODE_ENABLE_QUESTION_TOOL = truthy("OPENCODE_ENABLE_QUESTION_TOOL")

  export const OPENCODE_EXPERIMENTAL = truthy("OPENCODE_EXPERIMENTAL")
  export const OPENCODE_EXPERIMENTAL_FILEWATCHER = Config.boolean("OPENCODE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  )
  export const OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = Config.boolean(
    "OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER",
  ).pipe(Config.withDefault(false))
  export const OPENCODE_EXPERIMENTAL_ICON_DISCOVERY =
    OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = process.env["OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
  export const OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthy("OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const OPENCODE_ENABLE_EXA =
    truthy("OPENCODE_ENABLE_EXA") || OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_EXA")
  export const OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = number("OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = number("OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const OPENCODE_EXPERIMENTAL_OXFMT = OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_OXFMT")
  export const OPENCODE_EXPERIMENTAL_LSP_TY = truthy("OPENCODE_EXPERIMENTAL_LSP_TY")
  export const OPENCODE_EXPERIMENTAL_LSP_TOOL = OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_LSP_TOOL")
  export const OPENCODE_DISABLE_FILETIME_CHECK = Config.boolean("OPENCODE_DISABLE_FILETIME_CHECK").pipe(
    Config.withDefault(false),
  )
  export const OPENCODE_EXPERIMENTAL_PLAN_MODE = OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_PLAN_MODE")
  export const OPENCODE_EXPERIMENTAL_MARKDOWN = !falsy("OPENCODE_EXPERIMENTAL_MARKDOWN")
  export const OPENCODE_MODELS_URL = process.env["OPENCODE_MODELS_URL"]
  export const OPENCODE_MODELS_PATH = process.env["OPENCODE_MODELS_PATH"]
  export const OPENCODE_DISABLE_EMBEDDED_WEB_UI = truthy("OPENCODE_DISABLE_EMBEDDED_WEB_UI")
  export const OPENCODE_DB = process.env["OPENCODE_DB"]
  export const OPENCODE_DISABLE_CHANNEL_DB = truthy("OPENCODE_DISABLE_CHANNEL_DB")
  export const OPENCODE_SKIP_MIGRATIONS = truthy("OPENCODE_SKIP_MIGRATIONS")
  export const OPENCODE_STRICT_CONFIG_DEPS = truthy("OPENCODE_STRICT_CONFIG_DEPS")
  export const OPENCODE_WORKSPACE_ID = process.env["OPENCODE_WORKSPACE_ID"]
  export const OPENCODE_EXPERIMENTAL_HTTPAPI = OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_HTTPAPI")
  export const OPENCODE_EXPERIMENTAL_WORKSPACES = OPENCODE_EXPERIMENTAL || truthy("OPENCODE_EXPERIMENTAL_WORKSPACES")

  export const BASEONE_AUTO_SHARE = truthyWithFallback("BASEONE_AUTO_SHARE", "OPENCODE_AUTO_SHARE")
  export const BASEONE_AUTO_HEAP_SNAPSHOT = truthyWithFallback("BASEONE_AUTO_HEAP_SNAPSHOT", "OPENCODE_AUTO_HEAP_SNAPSHOT")
  export const BASEONE_GIT_BASH_PATH = envWithFallback("BASEONE_GIT_BASH_PATH", "OPENCODE_GIT_BASH_PATH")
  export const BASEONE_CONFIG = envWithFallback("BASEONE_CONFIG", "OPENCODE_CONFIG")
  export declare const BASEONE_PURE: boolean
  export declare const BASEONE_TUI_CONFIG: string | undefined
  export declare const BASEONE_CONFIG_DIR: string | undefined
  export declare const BASEONE_PLUGIN_META_FILE: string | undefined
  export const BASEONE_CONFIG_CONTENT = envWithFallback("BASEONE_CONFIG_CONTENT", "OPENCODE_CONFIG_CONTENT")
  export const BASEONE_DISABLE_AUTOUPDATE = truthyWithFallback("BASEONE_DISABLE_AUTOUPDATE", "OPENCODE_DISABLE_AUTOUPDATE")
  export const BASEONE_ALWAYS_NOTIFY_UPDATE = truthyWithFallback("BASEONE_ALWAYS_NOTIFY_UPDATE", "OPENCODE_ALWAYS_NOTIFY_UPDATE")
  export const BASEONE_DISABLE_PRUNE = truthyWithFallback("BASEONE_DISABLE_PRUNE", "OPENCODE_DISABLE_PRUNE")
  export const BASEONE_DISABLE_TERMINAL_TITLE = truthyWithFallback(
    "BASEONE_DISABLE_TERMINAL_TITLE",
    "OPENCODE_DISABLE_TERMINAL_TITLE",
  )
  export const BASEONE_SHOW_TTFD = truthyWithFallback("BASEONE_SHOW_TTFD", "OPENCODE_SHOW_TTFD")
  export const BASEONE_PERMISSION = envWithFallback("BASEONE_PERMISSION", "OPENCODE_PERMISSION")
  export const BASEONE_DISABLE_DEFAULT_PLUGINS = truthyWithFallback(
    "BASEONE_DISABLE_DEFAULT_PLUGINS",
    "OPENCODE_DISABLE_DEFAULT_PLUGINS",
  )
  export const BASEONE_DISABLE_LSP_DOWNLOAD = truthyWithFallback(
    "BASEONE_DISABLE_LSP_DOWNLOAD",
    "OPENCODE_DISABLE_LSP_DOWNLOAD",
  )
  export const BASEONE_ENABLE_EXPERIMENTAL_MODELS = truthyWithFallback(
    "BASEONE_ENABLE_EXPERIMENTAL_MODELS",
    "OPENCODE_ENABLE_EXPERIMENTAL_MODELS",
  )
  export const BASEONE_DISABLE_AUTOCOMPACT = truthyWithFallback(
    "BASEONE_DISABLE_AUTOCOMPACT",
    "OPENCODE_DISABLE_AUTOCOMPACT",
  )
  export const BASEONE_DISABLE_MODELS_FETCH = truthyWithFallback(
    "BASEONE_DISABLE_MODELS_FETCH",
    "OPENCODE_DISABLE_MODELS_FETCH",
  )
  export const BASEONE_DISABLE_MOUSE = truthyWithFallback("BASEONE_DISABLE_MOUSE", "OPENCODE_DISABLE_MOUSE")
  export const BASEONE_DISABLE_CLAUDE_CODE = truthyWithFallback(
    "BASEONE_DISABLE_CLAUDE_CODE",
    "OPENCODE_DISABLE_CLAUDE_CODE",
  )
  export const BASEONE_DISABLE_CLAUDE_CODE_PROMPT =
    BASEONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASEONE_DISABLE_CLAUDE_CODE_PROMPT", "OPENCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const BASEONE_DISABLE_CLAUDE_CODE_SKILLS =
    BASEONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASEONE_DISABLE_CLAUDE_CODE_SKILLS", "OPENCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const BASEONE_DISABLE_EXTERNAL_SKILLS =
    BASEONE_DISABLE_CLAUDE_CODE_SKILLS || truthyWithFallback("BASEONE_DISABLE_EXTERNAL_SKILLS", "OPENCODE_DISABLE_EXTERNAL_SKILLS")
  export declare const BASEONE_DISABLE_PROJECT_CONFIG: boolean
  export const BASEONE_FAKE_VCS = envWithFallback("BASEONE_FAKE_VCS", "OPENCODE_FAKE_VCS")
  export declare const BASEONE_CLIENT: string
  export const BASEONE_SERVER_PASSWORD = envWithFallback("BASEONE_SERVER_PASSWORD", "OPENCODE_SERVER_PASSWORD")
  export const BASEONE_SERVER_USERNAME = envWithFallback("BASEONE_SERVER_USERNAME", "OPENCODE_SERVER_USERNAME")
  export const BASEONE_ENABLE_QUESTION_TOOL = truthyWithFallback("BASEONE_ENABLE_QUESTION_TOOL", "OPENCODE_ENABLE_QUESTION_TOOL")
  export const BASEONE_EXPERIMENTAL = truthyWithFallback("BASEONE_EXPERIMENTAL", "OPENCODE_EXPERIMENTAL")
  export const BASEONE_EXPERIMENTAL_FILEWATCHER = Config.boolean("BASEONE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  )
  export const BASEONE_EXPERIMENTAL_DISABLE_FILEWATCHER = Config.boolean(
    "BASEONE_EXPERIMENTAL_DISABLE_FILEWATCHER",
  ).pipe(Config.withDefault(false))
  export const BASEONE_EXPERIMENTAL_ICON_DISCOVERY =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_ICON_DISCOVERY", "OPENCODE_EXPERIMENTAL_ICON_DISCOVERY")
  export const BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    envWithFallback("BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT", "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT") === undefined
      ? process.platform === "win32"
      : truthyWithFallback("BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT", "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const BASEONE_ENABLE_EXA =
    truthyWithFallback("BASEONE_ENABLE_EXA", "OPENCODE_ENABLE_EXA") ||
    BASEONE_EXPERIMENTAL ||
    truthyWithFallback("BASEONE_EXPERIMENTAL_EXA", "OPENCODE_EXPERIMENTAL_EXA")
  export const BASEONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = numberWithFallback(
    "BASEONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS",
    "OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS",
  )
  export const BASEONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = numberWithFallback(
    "BASEONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX",
    "OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX",
  )
  export const BASEONE_EXPERIMENTAL_OXFMT =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_OXFMT", "OPENCODE_EXPERIMENTAL_OXFMT")
  export const BASEONE_EXPERIMENTAL_LSP_TY = truthyWithFallback(
    "BASEONE_EXPERIMENTAL_LSP_TY",
    "OPENCODE_EXPERIMENTAL_LSP_TY",
  )
  export const BASEONE_EXPERIMENTAL_LSP_TOOL =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_LSP_TOOL", "OPENCODE_EXPERIMENTAL_LSP_TOOL")
  export const BASEONE_DISABLE_FILETIME_CHECK = Config.boolean("BASEONE_DISABLE_FILETIME_CHECK").pipe(
    Config.withDefault(false),
  )
  export const BASEONE_EXPERIMENTAL_PLAN_MODE =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_PLAN_MODE", "OPENCODE_EXPERIMENTAL_PLAN_MODE")
  export const BASEONE_EXPERIMENTAL_MARKDOWN = !falsy("BASEONE_EXPERIMENTAL_MARKDOWN") && !falsy("OPENCODE_EXPERIMENTAL_MARKDOWN")
  export const BASEONE_MODELS_URL = envWithFallback("BASEONE_MODELS_URL", "OPENCODE_MODELS_URL")
  export const BASEONE_MODELS_PATH = envWithFallback("BASEONE_MODELS_PATH", "OPENCODE_MODELS_PATH")
  export const BASEONE_DISABLE_EMBEDDED_WEB_UI = truthyWithFallback(
    "BASEONE_DISABLE_EMBEDDED_WEB_UI",
    "OPENCODE_DISABLE_EMBEDDED_WEB_UI",
  )
  export const BASEONE_DB = envWithFallback("BASEONE_DB", "OPENCODE_DB")
  export const BASEONE_DISABLE_CHANNEL_DB = truthyWithFallback(
    "BASEONE_DISABLE_CHANNEL_DB",
    "OPENCODE_DISABLE_CHANNEL_DB",
  )
  export const BASEONE_SKIP_MIGRATIONS = truthyWithFallback("BASEONE_SKIP_MIGRATIONS", "OPENCODE_SKIP_MIGRATIONS")
  export const BASEONE_STRICT_CONFIG_DEPS = truthyWithFallback("BASEONE_STRICT_CONFIG_DEPS", "OPENCODE_STRICT_CONFIG_DEPS")
  export const BASEONE_WORKSPACE_ID = envWithFallback("BASEONE_WORKSPACE_ID", "OPENCODE_WORKSPACE_ID")
  export const BASEONE_EXPERIMENTAL_HTTPAPI =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_HTTPAPI", "OPENCODE_EXPERIMENTAL_HTTPAPI")
  export const BASEONE_EXPERIMENTAL_WORKSPACES =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_WORKSPACES", "OPENCODE_EXPERIMENTAL_WORKSPACES")
}

Object.defineProperty(Flag, "OPENCODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthy("OPENCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthyWithFallback("BASEONE_DISABLE_PROJECT_CONFIG", "OPENCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "OPENCODE_TUI_CONFIG", {
  get() {
    return process.env["OPENCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_TUI_CONFIG", {
  get() {
    return process.env["BASEONE_TUI_CONFIG"] ?? process.env["OPENCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "OPENCODE_CONFIG_DIR", {
  get() {
    return process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_CONFIG_DIR", {
  get() {
    return process.env["BASEONE_CONFIG_DIR"] ?? process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "OPENCODE_PURE", {
  get() {
    return truthy("OPENCODE_PURE")
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_PURE", {
  get() {
    return truthyWithFallback("BASEONE_PURE", "OPENCODE_PURE")
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "OPENCODE_PLUGIN_META_FILE", {
  get() {
    return process.env["OPENCODE_PLUGIN_META_FILE"]
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_PLUGIN_META_FILE", {
  get() {
    return envWithFallback("BASEONE_PLUGIN_META_FILE", "OPENCODE_PLUGIN_META_FILE")
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "OPENCODE_CLIENT", {
  get() {
    return process.env["OPENCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})

Object.defineProperty(Flag, "BASEONE_CLIENT", {
  get() {
    return process.env["BASEONE_CLIENT"] ?? process.env["OPENCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
