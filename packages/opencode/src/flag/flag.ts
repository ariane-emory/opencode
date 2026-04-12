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

function numberWithFallback(newName: string, legacyName: string): number | undefined {
  const value = process.env[newName] ?? process.env[legacyName]
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

function number(key: string) {
  const value = process.env[key]
  if (!value) return undefined
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

export namespace Flag {
  export const OTEL_EXPORTER_OTLP_ENDPOINT = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"]
  export const OTEL_EXPORTER_OTLP_HEADERS = process.env["OTEL_EXPORTER_OTLP_HEADERS"]

  // New BASEONE_* env vars with fallback to OPENCODE_*
  export const BASEONE_AUTO_SHARE = truthyWithFallback("BASEONE_AUTO_SHARE", "OPENCODE_AUTO_SHARE")
  export const BASEONE_AUTO_HEAP_SNAPSHOT = truthyWithFallback("BASEONE_AUTO_HEAP_SNAPSHOT", "OPENCODE_AUTO_HEAP_SNAPSHOT")
  export const BASEONE_GIT_BASH_PATH = envWithFallback("BASEONE_GIT_BASH_PATH", "OPENCODE_GIT_BASH_PATH")
  export const BASEONE_CONFIG = envWithFallback("BASEONE_CONFIG", "OPENCODE_CONFIG")
  export declare const BASEONE_CONFIG_DIR: string | undefined
  export declare const BASEONE_DISABLE_PROJECT_CONFIG: boolean
  export const BASEONE_CONFIG_CONTENT = envWithFallback("BASEONE_CONFIG_CONTENT", "OPENCODE_CONFIG_CONTENT")
  export const BASEONE_DISABLE_AUTOUPDATE = truthyWithFallback("BASEONE_DISABLE_AUTOUPDATE", "OPENCODE_DISABLE_AUTOUPDATE")
  export const BASEONE_ALWAYS_NOTIFY_UPDATE = truthyWithFallback("BASEONE_ALWAYS_NOTIFY_UPDATE", "OPENCODE_ALWAYS_NOTIFY_UPDATE")
  export const BASEONE_DISABLE_PRUNE = truthyWithFallback("BASEONE_DISABLE_PRUNE", "OPENCODE_DISABLE_PRUNE")
  export const BASEONE_DISABLE_TERMINAL_TITLE = truthyWithFallback("BASEONE_DISABLE_TERMINAL_TITLE", "OPENCODE_DISABLE_TERMINAL_TITLE")
  export const BASEONE_SHOW_TTFD = truthyWithFallback("BASEONE_SHOW_TTFD", "OPENCODE_SHOW_TTFD")
  export const BASEONE_PERMISSION = envWithFallback("BASEONE_PERMISSION", "OPENCODE_PERMISSION")
  export const BASEONE_DISABLE_DEFAULT_PLUGINS = truthyWithFallback("BASEONE_DISABLE_DEFAULT_PLUGINS", "OPENCODE_DISABLE_DEFAULT_PLUGINS")
  export const BASEONE_DISABLE_LSP_DOWNLOAD = truthyWithFallback("BASEONE_DISABLE_LSP_DOWNLOAD", "OPENCODE_DISABLE_LSP_DOWNLOAD")
  export const BASEONE_ENABLE_EXPERIMENTAL_MODELS = truthyWithFallback("BASEONE_ENABLE_EXPERIMENTAL_MODELS", "OPENCODE_ENABLE_EXPERIMENTAL_MODELS")
  export const BASEONE_DISABLE_AUTOCOMPACT = truthyWithFallback("BASEONE_DISABLE_AUTOCOMPACT", "OPENCODE_DISABLE_AUTOCOMPACT")
  export const BASEONE_DISABLE_MODELS_FETCH = truthyWithFallback("BASEONE_DISABLE_MODELS_FETCH", "OPENCODE_DISABLE_MODELS_FETCH")
  export const BASEONE_DISABLE_MOUSE = truthyWithFallback("BASEONE_DISABLE_MOUSE", "OPENCODE_DISABLE_MOUSE")
  export const BASEONE_DISABLE_CLAUDE_CODE = truthyWithFallback("BASEONE_DISABLE_CLAUDE_CODE", "OPENCODE_DISABLE_CLAUDE_CODE")
  export const BASEONE_DISABLE_CLAUDE_CODE_PROMPT =
    BASEONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASEONE_DISABLE_CLAUDE_CODE_PROMPT", "OPENCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const BASEONE_DISABLE_CLAUDE_CODE_SKILLS =
    BASEONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASEONE_DISABLE_CLAUDE_CODE_SKILLS", "OPENCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const BASEONE_DISABLE_EXTERNAL_SKILLS =
    BASEONE_DISABLE_CLAUDE_CODE_SKILLS || truthyWithFallback("BASEONE_DISABLE_EXTERNAL_SKILLS", "OPENCODE_DISABLE_EXTERNAL_SKILLS")
  export const BASEONE_FAKE_VCS = envWithFallback("BASEONE_FAKE_VCS", "OPENCODE_FAKE_VCS")
  export const BASEONE_CLIENT = envWithFallback("BASEONE_CLIENT", "OPENCODE_CLIENT") ?? "cli"
  export const BASEONE_SERVER_PASSWORD = envWithFallback("BASEONE_SERVER_PASSWORD", "OPENCODE_SERVER_PASSWORD")
  export const BASEONE_SERVER_USERNAME = envWithFallback("BASEONE_SERVER_USERNAME", "OPENCODE_SERVER_USERNAME")
  export const BASEONE_ENABLE_QUESTION_TOOL = truthyWithFallback("BASEONE_ENABLE_QUESTION_TOOL", "OPENCODE_ENABLE_QUESTION_TOOL")

  // Experimental
  export const BASEONE_EXPERIMENTAL = truthyWithFallback("BASEONE_EXPERIMENTAL", "OPENCODE_EXPERIMENTAL")
  export const BASEONE_EXPERIMENTAL_FILEWATCHER = Config.boolean("BASEONE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  )
  export const BASEONE_EXPERIMENTAL_DISABLE_FILEWATCHER = Config.boolean(
    "BASEONE_EXPERIMENTAL_DISABLE_FILEWATCHER",
  ).pipe(Config.withDefault(false))
  export const BASEONE_EXPERIMENTAL_ICON_DISCOVERY =
    BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_ICON_DISCOVERY", "OPENCODE_EXPERIMENTAL_ICON_DISCOVERY")

  const copy = envWithFallback("BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT", "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT =
    copy === undefined ? process.platform === "win32" : truthyWithFallback("BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT", "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const BASEONE_ENABLE_EXA =
    truthyWithFallback("BASEONE_ENABLE_EXA", "OPENCODE_ENABLE_EXA") || BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_EXA", "OPENCODE_EXPERIMENTAL_EXA")
  export const BASEONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = numberWithFallback("BASEONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS", "OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const BASEONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = numberWithFallback("BASEONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX", "OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const BASEONE_EXPERIMENTAL_OXFMT = BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_OXFMT", "OPENCODE_EXPERIMENTAL_OXFMT")
  export const BASEONE_EXPERIMENTAL_LSP_TY = truthyWithFallback("BASEONE_EXPERIMENTAL_LSP_TY", "OPENCODE_EXPERIMENTAL_LSP_TY")
  export const BASEONE_EXPERIMENTAL_LSP_TOOL = BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_LSP_TOOL", "OPENCODE_EXPERIMENTAL_LSP_TOOL")
  export const BASEONE_DISABLE_FILETIME_CHECK = Config.boolean("BASEONE_DISABLE_FILETIME_CHECK").pipe(
    Config.withDefault(false),
  )
  export const BASEONE_EXPERIMENTAL_PLAN_MODE = BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_PLAN_MODE", "OPENCODE_EXPERIMENTAL_PLAN_MODE")
  export const BASEONE_EXPERIMENTAL_WORKSPACES = BASEONE_EXPERIMENTAL || truthyWithFallback("BASEONE_EXPERIMENTAL_WORKSPACES", "OPENCODE_EXPERIMENTAL_WORKSPACES")
  export const BASEONE_EXPERIMENTAL_MARKDOWN = !falsy("BASEONE_EXPERIMENTAL_MARKDOWN") && !falsy("OPENCODE_EXPERIMENTAL_MARKDOWN")
  export const BASEONE_STRICT_CONFIG_DEPS = truthyWithFallback("BASEONE_STRICT_CONFIG_DEPS", "OPENCODE_STRICT_CONFIG_DEPS")
  export const BASEONE_MODELS_URL = envWithFallback("BASEONE_MODELS_URL", "OPENCODE_MODELS_URL")
  export const BASEONE_MODELS_PATH = envWithFallback("BASEONE_MODELS_PATH", "OPENCODE_MODELS_PATH")
  export const BASEONE_DISABLE_EMBEDDED_WEB_UI = truthyWithFallback("BASEONE_DISABLE_EMBEDDED_WEB_UI", "OPENCODE_DISABLE_EMBEDDED_WEB_UI")
  export const BASEONE_DB = envWithFallback("BASEONE_DB", "OPENCODE_DB")
  export const BASEONE_DISABLE_CHANNEL_DB = truthyWithFallback("BASEONE_DISABLE_CHANNEL_DB", "OPENCODE_DISABLE_CHANNEL_DB")
  export const BASEONE_SKIP_MIGRATIONS = truthyWithFallback("BASEONE_SKIP_MIGRATIONS", "OPENCODE_SKIP_MIGRATIONS")
  export declare const BASEONE_TUI_CONFIG: string | undefined
  export declare const BASEONE_PURE: boolean
  export declare const BASEONE_PLUGIN_META_FILE: string | undefined

  // Legacy OPENCODE_* env vars - using values from BASEONE_* as source of truth
  export const OPENCODE_AUTO_SHARE = BASEONE_AUTO_SHARE
  export const OPENCODE_AUTO_HEAP_SNAPSHOT = BASEONE_AUTO_HEAP_SNAPSHOT
  export const OPENCODE_GIT_BASH_PATH = BASEONE_GIT_BASH_PATH
  export const OPENCODE_CONFIG = BASEONE_CONFIG
  export declare const OPENCODE_CONFIG_DIR: string | undefined
  export const OPENCODE_CONFIG_CONTENT = BASEONE_CONFIG_CONTENT
  export const OPENCODE_DISABLE_AUTOUPDATE = BASEONE_DISABLE_AUTOUPDATE
  export const OPENCODE_ALWAYS_NOTIFY_UPDATE = BASEONE_ALWAYS_NOTIFY_UPDATE
  export const OPENCODE_DISABLE_PRUNE = BASEONE_DISABLE_PRUNE
  export const OPENCODE_DISABLE_TERMINAL_TITLE = BASEONE_DISABLE_TERMINAL_TITLE
  export const OPENCODE_SHOW_TTFD = BASEONE_SHOW_TTFD
  export const OPENCODE_PERMISSION = BASEONE_PERMISSION
  export const OPENCODE_DISABLE_DEFAULT_PLUGINS = BASEONE_DISABLE_DEFAULT_PLUGINS
  export const OPENCODE_DISABLE_LSP_DOWNLOAD = BASEONE_DISABLE_LSP_DOWNLOAD
  export const OPENCODE_ENABLE_EXPERIMENTAL_MODELS = BASEONE_ENABLE_EXPERIMENTAL_MODELS
  export const OPENCODE_DISABLE_AUTOCOMPACT = BASEONE_DISABLE_AUTOCOMPACT
  export const OPENCODE_DISABLE_MODELS_FETCH = BASEONE_DISABLE_MODELS_FETCH
  export const OPENCODE_DISABLE_MOUSE = BASEONE_DISABLE_MOUSE
  export const OPENCODE_DISABLE_CLAUDE_CODE = BASEONE_DISABLE_CLAUDE_CODE
  export const OPENCODE_DISABLE_CLAUDE_CODE_PROMPT = BASEONE_DISABLE_CLAUDE_CODE_PROMPT
  export const OPENCODE_DISABLE_CLAUDE_CODE_SKILLS = BASEONE_DISABLE_CLAUDE_CODE_SKILLS
  export const OPENCODE_DISABLE_EXTERNAL_SKILLS = BASEONE_DISABLE_EXTERNAL_SKILLS
  export declare const OPENCODE_TUI_CONFIG: string | undefined
  export declare const OPENCODE_PURE: boolean
  export declare const OPENCODE_PLUGIN_META_FILE: string | undefined
  export declare const OPENCODE_DISABLE_PROJECT_CONFIG: boolean
  export const OPENCODE_FAKE_VCS = BASEONE_FAKE_VCS
  export const OPENCODE_CLIENT = BASEONE_CLIENT
  export const OPENCODE_SERVER_PASSWORD = BASEONE_SERVER_PASSWORD
  export const OPENCODE_SERVER_USERNAME = BASEONE_SERVER_USERNAME
  export const OPENCODE_ENABLE_QUESTION_TOOL = BASEONE_ENABLE_QUESTION_TOOL
  export const OPENCODE_EXPERIMENTAL = BASEONE_EXPERIMENTAL
  export const OPENCODE_EXPERIMENTAL_FILEWATCHER = BASEONE_EXPERIMENTAL_FILEWATCHER
  export const OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = BASEONE_EXPERIMENTAL_DISABLE_FILEWATCHER
  export const OPENCODE_EXPERIMENTAL_ICON_DISCOVERY = BASEONE_EXPERIMENTAL_ICON_DISCOVERY
  export const OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT = BASEONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT
  export const OPENCODE_ENABLE_EXA = BASEONE_ENABLE_EXA
  export const OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = BASEONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS
  export const OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = BASEONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX
  export const OPENCODE_EXPERIMENTAL_OXFMT = BASEONE_EXPERIMENTAL_OXFMT
  export const OPENCODE_EXPERIMENTAL_LSP_TY = BASEONE_EXPERIMENTAL_LSP_TY
  export const OPENCODE_EXPERIMENTAL_LSP_TOOL = BASEONE_EXPERIMENTAL_LSP_TOOL
  export const OPENCODE_DISABLE_FILETIME_CHECK = BASEONE_DISABLE_FILETIME_CHECK
  export const OPENCODE_EXPERIMENTAL_PLAN_MODE = BASEONE_EXPERIMENTAL_PLAN_MODE
  export const OPENCODE_EXPERIMENTAL_WORKSPACES = BASEONE_EXPERIMENTAL_WORKSPACES
  export const OPENCODE_EXPERIMENTAL_MARKDOWN = BASEONE_EXPERIMENTAL_MARKDOWN
  export const OPENCODE_STRICT_CONFIG_DEPS = BASEONE_STRICT_CONFIG_DEPS
  export const OPENCODE_MODELS_URL = BASEONE_MODELS_URL
  export const OPENCODE_MODELS_PATH = BASEONE_MODELS_PATH
  export const OPENCODE_DISABLE_EMBEDDED_WEB_UI = BASEONE_DISABLE_EMBEDDED_WEB_UI
  export const OPENCODE_DB = BASEONE_DB
  export const OPENCODE_DISABLE_CHANNEL_DB = BASEONE_DISABLE_CHANNEL_DB
  export const OPENCODE_SKIP_MIGRATIONS = BASEONE_SKIP_MIGRATIONS
}

// Dynamic getter for BASEONE_DISABLE_PROJECT_CONFIG (alias for OPENCODE_DISABLE_PROJECT_CONFIG)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "BASEONE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthyWithFallback("BASEONE_DISABLE_PROJECT_CONFIG", "OPENCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_DISABLE_PROJECT_CONFIG (legacy alias)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "OPENCODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return Flag.BASEONE_DISABLE_PROJECT_CONFIG
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for BASEONE_CONFIG_DIR (alias for OPENCODE_CONFIG_DIR)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "BASEONE_CONFIG_DIR", {
  get() {
    return process.env["BASEONE_CONFIG_DIR"] ?? process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for BASEONE_TUI_CONFIG
// This must be evaluated at access time, not module load time,
// because tests and external tooling may set this env var at runtime
Object.defineProperty(Flag, "BASEONE_TUI_CONFIG", {
  get() {
    return process.env["BASEONE_TUI_CONFIG"] ?? process.env["OPENCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_TUI_CONFIG (legacy alias)
// This must be evaluated at access time, not module load time,
// because tests and external tooling may set this env var at runtime
Object.defineProperty(Flag, "OPENCODE_TUI_CONFIG", {
  get() {
    return process.env["BASEONE_TUI_CONFIG"] ?? process.env["OPENCODE_TUI_CONFIG"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_CONFIG_DIR (legacy alias)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "OPENCODE_CONFIG_DIR", {
  get() {
    return process.env["BASEONE_CONFIG_DIR"] ?? process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for BASEONE_PURE
Object.defineProperty(Flag, "BASEONE_PURE", {
  get() {
    return truthyWithFallback("BASEONE_PURE", "OPENCODE_PURE")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_PURE (legacy alias)
Object.defineProperty(Flag, "OPENCODE_PURE", {
  get() {
    return Flag.BASEONE_PURE
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for BASEONE_PLUGIN_META_FILE
Object.defineProperty(Flag, "BASEONE_PLUGIN_META_FILE", {
  get() {
    return envWithFallback("BASEONE_PLUGIN_META_FILE", "OPENCODE_PLUGIN_META_FILE")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_PLUGIN_META_FILE (legacy alias)
Object.defineProperty(Flag, "OPENCODE_PLUGIN_META_FILE", {
  get() {
    return Flag.BASEONE_PLUGIN_META_FILE
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "OPENCODE_CLIENT", {
  get() {
    return process.env["BASEONE_CLIENT"] ?? process.env["OPENCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
