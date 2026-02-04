function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
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

export namespace Flag {
  // New BASE_ONE_* env vars with fallback to OPENCODE_*
  export const BASE_ONE_AUTO_SHARE = truthyWithFallback("BASE_ONE_AUTO_SHARE", "OPENCODE_AUTO_SHARE")
  export const BASE_ONE_GIT_BASH_PATH = envWithFallback("BASE_ONE_GIT_BASH_PATH", "OPENCODE_GIT_BASH_PATH")
  export const BASE_ONE_CONFIG = envWithFallback("BASE_ONE_CONFIG", "OPENCODE_CONFIG")
  export declare const BASE_ONE_CONFIG_DIR: string | undefined
  export declare const BASE_ONE_DISABLE_PROJECT_CONFIG: boolean
  export const BASE_ONE_CONFIG_CONTENT = envWithFallback("BASE_ONE_CONFIG_CONTENT", "OPENCODE_CONFIG_CONTENT")
  export const BASE_ONE_DISABLE_AUTOUPDATE = truthyWithFallback("BASE_ONE_DISABLE_AUTOUPDATE", "OPENCODE_DISABLE_AUTOUPDATE")
  export const BASE_ONE_DISABLE_PRUNE = truthyWithFallback("BASE_ONE_DISABLE_PRUNE", "OPENCODE_DISABLE_PRUNE")
  export const BASE_ONE_DISABLE_TERMINAL_TITLE = truthyWithFallback("BASE_ONE_DISABLE_TERMINAL_TITLE", "OPENCODE_DISABLE_TERMINAL_TITLE")
  export const BASE_ONE_PERMISSION = envWithFallback("BASE_ONE_PERMISSION", "OPENCODE_PERMISSION")
  export const BASE_ONE_DISABLE_DEFAULT_PLUGINS = truthyWithFallback("BASE_ONE_DISABLE_DEFAULT_PLUGINS", "OPENCODE_DISABLE_DEFAULT_PLUGINS")
  export const BASE_ONE_DISABLE_LSP_DOWNLOAD = truthyWithFallback("BASE_ONE_DISABLE_LSP_DOWNLOAD", "OPENCODE_DISABLE_LSP_DOWNLOAD")
  export const BASE_ONE_ENABLE_EXPERIMENTAL_MODELS = truthyWithFallback("BASE_ONE_ENABLE_EXPERIMENTAL_MODELS", "OPENCODE_ENABLE_EXPERIMENTAL_MODELS")
  export const BASE_ONE_DISABLE_AUTOCOMPACT = truthyWithFallback("BASE_ONE_DISABLE_AUTOCOMPACT", "OPENCODE_DISABLE_AUTOCOMPACT")
  export const BASE_ONE_DISABLE_MODELS_FETCH = truthyWithFallback("BASE_ONE_DISABLE_MODELS_FETCH", "OPENCODE_DISABLE_MODELS_FETCH")
  export const BASE_ONE_DISABLE_CLAUDE_CODE = truthyWithFallback("BASE_ONE_DISABLE_CLAUDE_CODE", "OPENCODE_DISABLE_CLAUDE_CODE")
  export const BASE_ONE_DISABLE_CLAUDE_CODE_PROMPT = 
    BASE_ONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASE_ONE_DISABLE_CLAUDE_CODE_PROMPT", "OPENCODE_DISABLE_CLAUDE_CODE_PROMPT")
  export const BASE_ONE_DISABLE_CLAUDE_CODE_SKILLS =
    BASE_ONE_DISABLE_CLAUDE_CODE || truthyWithFallback("BASE_ONE_DISABLE_CLAUDE_CODE_SKILLS", "OPENCODE_DISABLE_CLAUDE_CODE_SKILLS")
  export const BASE_ONE_DISABLE_EXTERNAL_SKILLS =
    BASE_ONE_DISABLE_CLAUDE_CODE_SKILLS || truthyWithFallback("BASE_ONE_DISABLE_EXTERNAL_SKILLS", "OPENCODE_DISABLE_EXTERNAL_SKILLS")
  export const BASE_ONE_FAKE_VCS = envWithFallback("BASE_ONE_FAKE_VCS", "OPENCODE_FAKE_VCS")
  export const BASE_ONE_CLIENT = envWithFallback("BASE_ONE_CLIENT", "OPENCODE_CLIENT") ?? "cli"
  export const BASE_ONE_SERVER_PASSWORD = envWithFallback("BASE_ONE_SERVER_PASSWORD", "OPENCODE_SERVER_PASSWORD")
  export const BASE_ONE_SERVER_USERNAME = envWithFallback("BASE_ONE_SERVER_USERNAME", "OPENCODE_SERVER_USERNAME")

  // Experimental
  export const BASE_ONE_EXPERIMENTAL = truthyWithFallback("BASE_ONE_EXPERIMENTAL", "OPENCODE_EXPERIMENTAL")
  export const BASE_ONE_EXPERIMENTAL_FILEWATCHER = truthyWithFallback("BASE_ONE_EXPERIMENTAL_FILEWATCHER", "OPENCODE_EXPERIMENTAL_FILEWATCHER")
  export const BASE_ONE_EXPERIMENTAL_DISABLE_FILEWATCHER = truthyWithFallback("BASE_ONE_EXPERIMENTAL_DISABLE_FILEWATCHER", "OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER")
  export const BASE_ONE_EXPERIMENTAL_ICON_DISCOVERY =
    BASE_ONE_EXPERIMENTAL || truthyWithFallback("BASE_ONE_EXPERIMENTAL_ICON_DISCOVERY", "OPENCODE_EXPERIMENTAL_ICON_DISCOVERY")
  export const BASE_ONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT = truthyWithFallback("BASE_ONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT", "OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT")
  export const BASE_ONE_ENABLE_EXA =
    truthyWithFallback("BASE_ONE_ENABLE_EXA", "OPENCODE_ENABLE_EXA") || BASE_ONE_EXPERIMENTAL || truthyWithFallback("BASE_ONE_EXPERIMENTAL_EXA", "OPENCODE_EXPERIMENTAL_EXA")
  export const BASE_ONE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH = numberWithFallback("BASE_ONE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH", "OPENCODE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH")
  export const BASE_ONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = numberWithFallback("BASE_ONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS", "OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS")
  export const BASE_ONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = numberWithFallback("BASE_ONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX", "OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX")
  export const BASE_ONE_EXPERIMENTAL_OXFMT = BASE_ONE_EXPERIMENTAL || truthyWithFallback("BASE_ONE_EXPERIMENTAL_OXFMT", "OPENCODE_EXPERIMENTAL_OXFMT")
  export const BASE_ONE_EXPERIMENTAL_LSP_TY = truthyWithFallback("BASE_ONE_EXPERIMENTAL_LSP_TY", "OPENCODE_EXPERIMENTAL_LSP_TY")
  export const BASE_ONE_EXPERIMENTAL_LSP_TOOL = BASE_ONE_EXPERIMENTAL || truthyWithFallback("BASE_ONE_EXPERIMENTAL_LSP_TOOL", "OPENCODE_EXPERIMENTAL_LSP_TOOL")
  export const BASE_ONE_EXPERIMENTAL_PLAN_MODE = BASE_ONE_EXPERIMENTAL || truthyWithFallback("BASE_ONE_EXPERIMENTAL_PLAN_MODE", "OPENCODE_EXPERIMENTAL_PLAN_MODE")
  export const BASE_ONE_EXPERIMENTAL_MARKDOWN = truthyWithFallback("BASE_ONE_EXPERIMENTAL_MARKDOWN", "OPENCODE_EXPERIMENTAL_MARKDOWN")

  // Legacy aliases for backwards compatibility during migration
  export const OPENCODE_AUTO_SHARE = BASE_ONE_AUTO_SHARE
  export const OPENCODE_GIT_BASH_PATH = BASE_ONE_GIT_BASH_PATH
  export const OPENCODE_CONFIG = BASE_ONE_CONFIG
  export declare const OPENCODE_CONFIG_DIR: string | undefined
  export const OPENCODE_CONFIG_CONTENT = BASE_ONE_CONFIG_CONTENT
  export const OPENCODE_DISABLE_AUTOUPDATE = BASE_ONE_DISABLE_AUTOUPDATE
  export const OPENCODE_DISABLE_PRUNE = BASE_ONE_DISABLE_PRUNE
  export const OPENCODE_DISABLE_TERMINAL_TITLE = BASE_ONE_DISABLE_TERMINAL_TITLE
  export const OPENCODE_PERMISSION = BASE_ONE_PERMISSION
  export const OPENCODE_DISABLE_DEFAULT_PLUGINS = BASE_ONE_DISABLE_DEFAULT_PLUGINS
  export const OPENCODE_DISABLE_LSP_DOWNLOAD = BASE_ONE_DISABLE_LSP_DOWNLOAD
  export const OPENCODE_ENABLE_EXPERIMENTAL_MODELS = BASE_ONE_ENABLE_EXPERIMENTAL_MODELS
  export const OPENCODE_DISABLE_AUTOCOMPACT = BASE_ONE_DISABLE_AUTOCOMPACT
  export const OPENCODE_DISABLE_MODELS_FETCH = BASE_ONE_DISABLE_MODELS_FETCH
  export const OPENCODE_DISABLE_CLAUDE_CODE = BASE_ONE_DISABLE_CLAUDE_CODE
  export const OPENCODE_DISABLE_CLAUDE_CODE_PROMPT = BASE_ONE_DISABLE_CLAUDE_CODE_PROMPT
  export const OPENCODE_DISABLE_CLAUDE_CODE_SKILLS = BASE_ONE_DISABLE_CLAUDE_CODE_SKILLS
  export const OPENCODE_DISABLE_EXTERNAL_SKILLS = BASE_ONE_DISABLE_EXTERNAL_SKILLS
  export declare const OPENCODE_DISABLE_PROJECT_CONFIG: boolean
  export const OPENCODE_FAKE_VCS = BASE_ONE_FAKE_VCS
  export const OPENCODE_CLIENT = BASE_ONE_CLIENT
  export const OPENCODE_SERVER_PASSWORD = BASE_ONE_SERVER_PASSWORD
  export const OPENCODE_SERVER_USERNAME = BASE_ONE_SERVER_USERNAME
  export const OPENCODE_EXPERIMENTAL = BASE_ONE_EXPERIMENTAL
  export const OPENCODE_EXPERIMENTAL_FILEWATCHER = BASE_ONE_EXPERIMENTAL_FILEWATCHER
  export const OPENCODE_EXPERIMENTAL_DISABLE_FILEWATCHER = BASE_ONE_EXPERIMENTAL_DISABLE_FILEWATCHER
  export const OPENCODE_EXPERIMENTAL_ICON_DISCOVERY = BASE_ONE_EXPERIMENTAL_ICON_DISCOVERY
  export const OPENCODE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT = BASE_ONE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT
  export const OPENCODE_ENABLE_EXA = BASE_ONE_ENABLE_EXA
  export const OPENCODE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH = BASE_ONE_EXPERIMENTAL_BASH_MAX_OUTPUT_LENGTH
  export const OPENCODE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS = BASE_ONE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS
  export const OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX = BASE_ONE_EXPERIMENTAL_OUTPUT_TOKEN_MAX
  export const OPENCODE_EXPERIMENTAL_OXFMT = BASE_ONE_EXPERIMENTAL_OXFMT
  export const OPENCODE_EXPERIMENTAL_LSP_TY = BASE_ONE_EXPERIMENTAL_LSP_TY
  export const OPENCODE_EXPERIMENTAL_LSP_TOOL = BASE_ONE_EXPERIMENTAL_LSP_TOOL
  export const OPENCODE_EXPERIMENTAL_PLAN_MODE = BASE_ONE_EXPERIMENTAL_PLAN_MODE
  export const OPENCODE_EXPERIMENTAL_MARKDOWN = BASE_ONE_EXPERIMENTAL_MARKDOWN
  export const OPENCODE_DISABLE_FILETIME_CHECK = truthy("OPENCODE_DISABLE_FILETIME_CHECK")
  export const OPENCODE_MODELS_URL = process.env["OPENCODE_MODELS_URL"]
  export const OPENCODE_MODELS_PATH = process.env["OPENCODE_MODELS_PATH"]
}

// Dynamic getter for BASE_ONE_DISABLE_PROJECT_CONFIG (alias for OPENCODE_DISABLE_PROJECT_CONFIG)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "BASE_ONE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthyWithFallback("BASE_ONE_DISABLE_PROJECT_CONFIG", "OPENCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for BASE_ONE_CONFIG_DIR (alias for OPENCODE_CONFIG_DIR)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "BASE_ONE_CONFIG_DIR", {
  get() {
    return process.env["BASE_ONE_CONFIG_DIR"] ?? process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_DISABLE_PROJECT_CONFIG (legacy alias)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "OPENCODE_DISABLE_PROJECT_CONFIG", {
  get() {
    return truthyWithFallback("OPENCODE_DISABLE_PROJECT_CONFIG", "OPENCODE_DISABLE_PROJECT_CONFIG")
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_CONFIG_DIR (legacy alias)
// This must be evaluated at access time, not module load time,
// because external tooling may set this env var at runtime
Object.defineProperty(Flag, "OPENCODE_CONFIG_DIR", {
  get() {
    return process.env["OPENCODE_CONFIG_DIR"]
  },
  enumerable: true,
  configurable: false,
})

// Dynamic getter for OPENCODE_CLIENT
// This must be evaluated at access time, not module load time,
// because some commands override the client at runtime
Object.defineProperty(Flag, "OPENCODE_CLIENT", {
  get() {
    return process.env["OPENCODE_CLIENT"] ?? "cli"
  },
  enumerable: true,
  configurable: false,
})
