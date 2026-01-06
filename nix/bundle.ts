#!/usr/bin/env bun

import solidPlugin from "./node_modules/@opentui/solid/scripts/solid-plugin"
import path from "path"
import fs from "fs"

const dir = process.cwd()
const parser = fs.realpathSync(path.join(dir, "node_modules/@opentui/core/parser.worker.js"))
const worker = "./src/cli/cmd/tui/worker.ts"
const version = process.env.BASE_ONE_VERSION ?? process.env.OPENCODE_VERSION ?? "local"
const channel = process.env.BASE_ONE_CHANNEL ?? process.env.OPENCODE_CHANNEL ?? "local"

fs.rmSync(path.join(dir, "dist"), { recursive: true, force: true })

const result = await Bun.build({
  entrypoints: ["./src/index.ts", worker, parser],
  outdir: "./dist",
  target: "bun",
  sourcemap: "none",
  tsconfig: "./tsconfig.json",
  plugins: [solidPlugin],
  external: ["@opentui/core"],
  define: {
    BASE_ONE_VERSION: `'${version}'`,
    BASE_ONE_CHANNEL: `'${channel}'`,
    BASE_ONE_WORKER_PATH: "undefined",
    // Legacy compatibility
    OPENCODE_VERSION: `'${version}'`,
    OPENCODE_CHANNEL: `'${channel}'`,
    OPENCODE_WORKER_PATH: "undefined",
    OTUI_TREE_SITTER_WORKER_PATH: 'new URL("./cli/cmd/tui/parser.worker.js", import.meta.url).href',
  },
})

if (!result.success) {
  console.error("bundle failed")
  for (const log of result.logs) console.error(log)
  process.exit(1)
}

const parserOut = path.join(dir, "dist/src/cli/cmd/tui/parser.worker.js")
fs.mkdirSync(path.dirname(parserOut), { recursive: true })
await Bun.write(parserOut, Bun.file(parser))
