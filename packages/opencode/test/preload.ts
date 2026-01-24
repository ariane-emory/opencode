// IMPORTANT: Set env vars BEFORE any imports from src/ directory
// xdg-basedir reads env vars at import time, so we must set these first
import os from "os"
import path from "path"
import fs from "fs/promises"
import fsSync from "fs"
import { afterAll } from "bun:test"

// Create temp directory and set env vars BEFORE importing from src/
// This ensures xdg-basedir picks up the test directories, not the user's real ones
const dir = path.join(os.tmpdir(), "opencode-test-data-" + process.pid)
await fs.mkdir(dir, { recursive: true })
// Set test home directory to isolate tests from user's actual home directory
// This prevents tests from picking up real user configs/skills from ~/.claude/skills
const testHome = path.join(dir, "home")
await fs.mkdir(testHome, { recursive: true })
process.env["OPENCODE_TEST_HOME"] = testHome

process.env["XDG_DATA_HOME"] = path.join(dir, "share")
process.env["XDG_CACHE_HOME"] = path.join(dir, "cache")
process.env["XDG_CONFIG_HOME"] = path.join(dir, "config")
process.env["XDG_STATE_HOME"] = path.join(dir, "state")

// NOW it's safe to import from src/ - env vars are set
const { Global } = await import("../src/global")

// Verify test isolation is working - Global.Path.data should point to temp directory
// If this fails, it means the import order is wrong and tests would write to real user data
if (!Global.Path.data.startsWith(dir)) {
  throw new Error(
    `Test isolation failed! Global.Path.data points to "${Global.Path.data}" instead of temp directory "${dir}". ` +
      `This would cause tests to overwrite user's real auth.json. ` +
      `Ensure XDG_DATA_HOME is set BEFORE importing from src/.`,
  )
}

afterAll(() => {
  fsSync.rmSync(dir, { recursive: true, force: true })
})

// Pre-fetch models.json so tests don't need the macro fallback
// Also write the cache version file to prevent global/index.ts from clearing the cache
const cacheDir = path.join(dir, "cache", "opencode")
await fs.mkdir(cacheDir, { recursive: true })
await fs.writeFile(path.join(cacheDir, "version"), "14")
const url = Global.Path.modelsDevUrl
const response = await fetch(`${url}/api.json`)
if (response.ok) {
  await fs.writeFile(path.join(cacheDir, "models.json"), await response.text())
}
// Disable models.dev refresh to avoid race conditions during tests
process.env["OPENCODE_DISABLE_MODELS_FETCH"] = "true"

// Clear provider env vars to ensure clean test state
delete process.env["ANTHROPIC_API_KEY"]
delete process.env["OPENAI_API_KEY"]
delete process.env["GOOGLE_API_KEY"]
delete process.env["GOOGLE_GENERATIVE_AI_API_KEY"]
delete process.env["AZURE_OPENAI_API_KEY"]
delete process.env["AWS_ACCESS_KEY_ID"]
delete process.env["AWS_PROFILE"]
delete process.env["AWS_REGION"]
delete process.env["AWS_BEARER_TOKEN_BEDROCK"]
delete process.env["OPENROUTER_API_KEY"]
delete process.env["GROQ_API_KEY"]
delete process.env["MISTRAL_API_KEY"]
delete process.env["PERPLEXITY_API_KEY"]
delete process.env["TOGETHER_API_KEY"]
delete process.env["XAI_API_KEY"]
delete process.env["DEEPSEEK_API_KEY"]
delete process.env["FIREWORKS_API_KEY"]
delete process.env["CEREBRAS_API_KEY"]
delete process.env["SAMBANOVA_API_KEY"]

// Now safe to import from src/
const { Log } = await import("../src/util/log")

Log.init({
  print: false,
  dev: true,
  level: "DEBUG",
})
