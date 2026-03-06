import path from "path"
import { type ParseError as JsoncParseError, applyEdits, modify, parse as parseJsonc } from "jsonc-parser"
import { mergeDeep, unique } from "remeda"
import z from "zod"
import { ConfigPaths } from "./paths"
import { TuiInfo } from "./tui-schema"
import { Instance } from "@/project/instance"
import { Flag } from "@/flag/flag"
import { Log } from "@/util/log"
import { Filesystem } from "@/util/filesystem"
import { Global } from "@/global"

const log = Log.create({ service: "tui.migrate" })

const TUI_SCHEMA_URL = "https://opencode.ai/tui.json"

const LegacyTheme = TuiInfo.shape.theme.optional()
const LegacyRecord = z.record(z.string(), z.unknown()).optional()

interface MigrateInput {
  directories: string[]
  custom?: string
  managed: string
}

interface SourceGroup {
  target: string
  files: string[]
}

interface LegacyFile {
  file: string
  source: string
  legacy: Record<string, unknown>
}

/**
 * Migrates tui-specific keys (theme, keybinds, tui) from server config files
 * into dedicated tui.json files. Source files are merged in server precedence
 * order before writing each target tui.json.
 */
export async function migrateTuiConfig(input: MigrateInput) {
  const groups = await sourceGroups(input)
  for (const group of groups) {
    const targetExists = await Filesystem.exists(group.target)
    if (targetExists) continue

    const parsed = (await Promise.all(group.files.map(parseLegacyFile))).filter((item): item is LegacyFile => !!item)
    if (!parsed.length) continue

    const payload = parsed.reduce((acc, item) => mergeDeep(acc, item.legacy), { $schema: TUI_SCHEMA_URL } as Record<
      string,
      unknown
    >)

    const wrote = await Bun.write(group.target, JSON.stringify(payload, null, 2))
      .then(() => true)
      .catch((error) => {
        log.warn("failed to write tui migration target", {
          from: parsed.map((item) => item.file),
          to: group.target,
          error,
        })
        return false
      })
    if (!wrote) continue

    const stripped = await Promise.all(parsed.map((item) => backupAndStripLegacy(item.file, item.source)))
    if (stripped.some((ok) => !ok)) {
      log.warn("tui config migrated but some source files were not stripped", {
        from: parsed.map((item) => item.file),
        to: group.target,
      })
      continue
    }

    log.info("migrated tui config", {
      from: parsed.map((item) => item.file),
      to: group.target,
    })
  }
}

async function parseLegacyFile(file: string) {
  const source = await Filesystem.readText(file).catch((error) => {
    log.warn("failed to read config for tui migration", { path: file, error })
    return undefined
  })
  if (!source) return

  const errors: JsoncParseError[] = []
  const data = parseJsonc(source, errors, { allowTrailingComma: true })
  if (errors.length || !data || typeof data !== "object" || Array.isArray(data)) return

  const theme = LegacyTheme.safeParse("theme" in data ? data.theme : undefined)
  const keybinds = LegacyRecord.safeParse("keybinds" in data ? data.keybinds : undefined)
  const legacyTui = LegacyRecord.safeParse("tui" in data ? data.tui : undefined)

  const legacy: Record<string, unknown> = {}
  if (theme.success && theme.data !== undefined) legacy.theme = theme.data
  if (keybinds.success && keybinds.data !== undefined) legacy.keybinds = keybinds.data
  if (legacyTui.success && legacyTui.data) Object.assign(legacy, legacyTui.data)
  if (!Object.keys(legacy).length) return

  return {
    file,
    source,
    legacy,
  }
}

async function backupAndStripLegacy(file: string, source: string) {
  const backup = file + ".tui-migration.bak"
  const hasBackup = await Filesystem.exists(backup)
  const backed = hasBackup
    ? true
    : await Bun.write(backup, source)
        .then(() => true)
        .catch((error) => {
          log.warn("failed to backup source config during tui migration", { path: file, backup, error })
          return false
        })
  if (!backed) return false

  const text = ["theme", "keybinds", "tui"].reduce((acc, key) => {
    const edits = modify(acc, [key], undefined, {
      formattingOptions: {
        insertSpaces: true,
        tabSize: 2,
      },
    })
    if (!edits.length) return acc
    return applyEdits(acc, edits)
  }, source)

  return Bun.write(file, text)
    .then(() => {
      log.info("stripped tui keys from server config", { path: file, backup })
      return true
    })
    .catch((error) => {
      log.warn("failed to strip legacy tui keys from server config", { path: file, backup, error })
      return false
    })
}

async function sourceGroups(input: MigrateInput): Promise<SourceGroup[]> {
  const files = [
    path.join(Global.Path.config, "config.json"),
    path.join(Global.Path.config, "opencode.json"),
    path.join(Global.Path.config, "opencode.jsonc"),
  ]

  if (input.custom) files.push(input.custom)

  if (!Flag.OPENCODE_DISABLE_PROJECT_CONFIG) {
    files.push(...(await ConfigPaths.projectFiles("opencode", Instance.directory, Instance.worktree)))
  }

  for (const dir of unique(input.directories)) {
    if (!dir.endsWith(".opencode") && dir !== Flag.OPENCODE_CONFIG_DIR) continue
    files.push(...ConfigPaths.fileInDirectory(dir, "opencode"))
  }

  files.push(...ConfigPaths.fileInDirectory(input.managed, "opencode"))

  const existing = await Promise.all(
    unique(files).map(async (file) => {
      const ok = await Filesystem.exists(file)
      return ok ? file : undefined
    }),
  )

  const result = new Map<string, string[]>()
  for (const file of existing) {
    if (!file) continue
    const target = path.join(path.dirname(file), "tui.json")
    result.set(target, [...(result.get(target) ?? []), file])
  }

  return Array.from(result.entries()).map(([target, groupFiles]) => ({
    target,
    files: groupFiles,
  }))
}
