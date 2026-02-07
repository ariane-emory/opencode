/**
 * Theme loader for CLI - loads theme JSON files and converts to MarkdownTheme format
 */
import type { MarkdownTheme } from "./markdown-renderer"
import aura from "./cmd/tui/context/theme/aura.json" with { type: "json" }
import ayu from "./cmd/tui/context/theme/ayu.json" with { type: "json" }
import carbonfox from "./cmd/tui/context/theme/carbonfox.json" with { type: "json" }
import catppuccin from "./cmd/tui/context/theme/catppuccin.json" with { type: "json" }
import catppuccinFrappe from "./cmd/tui/context/theme/catppuccin-frappe.json" with { type: "json" }
import catppuccinMacchiato from "./cmd/tui/context/theme/catppuccin-macchiato.json" with { type: "json" }
import cobalt2 from "./cmd/tui/context/theme/cobalt2.json" with { type: "json" }
import cursor from "./cmd/tui/context/theme/cursor.json" with { type: "json" }
import dracula from "./cmd/tui/context/theme/dracula.json" with { type: "json" }
import everforest from "./cmd/tui/context/theme/everforest.json" with { type: "json" }
import flexoki from "./cmd/tui/context/theme/flexoki.json" with { type: "json" }
import github from "./cmd/tui/context/theme/github.json" with { type: "json" }
import gruvbox from "./cmd/tui/context/theme/gruvbox.json" with { type: "json" }
import kanagawa from "./cmd/tui/context/theme/kanagawa.json" with { type: "json" }
import lucentOrng from "./cmd/tui/context/theme/lucent-orng.json" with { type: "json" }
import material from "./cmd/tui/context/theme/material.json" with { type: "json" }
import matrix from "./cmd/tui/context/theme/matrix.json" with { type: "json" }
import mercury from "./cmd/tui/context/theme/mercury.json" with { type: "json" }
import monokai from "./cmd/tui/context/theme/monokai.json" with { type: "json" }
import nightowl from "./cmd/tui/context/theme/nightowl.json" with { type: "json" }
import nord from "./cmd/tui/context/theme/nord.json" with { type: "json" }
import oneDark from "./cmd/tui/context/theme/one-dark.json" with { type: "json" }
import opencode from "./cmd/tui/context/theme/opencode.json" with { type: "json" }
import orng from "./cmd/tui/context/theme/orng.json" with { type: "json" }
import osakaJade from "./cmd/tui/context/theme/osaka-jade.json" with { type: "json" }
import palenight from "./cmd/tui/context/theme/palenight.json" with { type: "json" }
import rosepine from "./cmd/tui/context/theme/rosepine.json" with { type: "json" }
import solarized from "./cmd/tui/context/theme/solarized.json" with { type: "json" }
import synthwave84 from "./cmd/tui/context/theme/synthwave84.json" with { type: "json" }
import tokyonight from "./cmd/tui/context/theme/tokyonight.json" with { type: "json" }
import vercel from "./cmd/tui/context/theme/vercel.json" with { type: "json" }
import vesper from "./cmd/tui/context/theme/vesper.json" with { type: "json" }
import zenburn from "./cmd/tui/context/theme/zenburn.json" with { type: "json" }

const THEMES: Record<string, any> = {
  aura,
  ayu,
  carbonfox,
  catppuccin,
  "catppuccin-frappe": catppuccinFrappe,
  "catppuccin-macchiato": catppuccinMacchiato,
  cobalt2,
  cursor,
  dracula,
  everforest,
  flexoki,
  github,
  gruvbox,
  kanagawa,
  "lucent-orng": lucentOrng,
  material,
  matrix,
  mercury,
  monokai,
  nightowl,
  nord,
  "one-dark": oneDark,
  opencode,
  orng,
  "osaka-jade": osakaJade,
  palenight,
  rosepine,
  solarized,
  synthwave84,
  tokyonight,
  vercel,
  vesper,
  zenburn,
}

type ColorValue = string | { dark: string; light: string }

function resolveColor(value: ColorValue, defs: Record<string, string>, mode: "dark" | "light"): string {
  if (typeof value === "string") return defs[value] || value
  const key = mode === "dark" ? value.dark : value.light
  return defs[key] || key
}

function hexToRGBA(hex: string): { r: number; g: number; b: number; a: number } {
  const cleaned = hex.replace("#", "")
  const r = Number.parseInt(cleaned.substring(0, 2), 16) / 255
  const g = Number.parseInt(cleaned.substring(2, 4), 16) / 255
  const b = Number.parseInt(cleaned.substring(4, 6), 16) / 255
  return { r, g, b, a: 1.0 }
}

export function loadTheme(name?: string, mode: "dark" | "light" = "dark"): MarkdownTheme {
  const data = THEMES[name || "opencode"] || THEMES.opencode
  const defs = data.defs || {}
  const theme = data.theme || {}

  const resolve = (key: string) => {
    const value = theme[key]
    if (!value) return { r: 1, g: 1, b: 1, a: 1 }
    const hex = resolveColor(value, defs, mode)
    return hexToRGBA(hex)
  }

  return {
    text: resolve("text"),
    textMuted: resolve("textMuted"),
    accent: resolve("accent"),
    primary: resolve("primary"),
    border: resolve("border"),
    background: resolve("background"),
    backgroundPanel: resolve("backgroundPanel"),
    backgroundElement: resolve("backgroundElement"),
    markdownText: resolve("markdownText"),
    markdownHeading: resolve("markdownHeading"),
    markdownLink: resolve("markdownLink"),
    markdownLinkText: resolve("markdownLinkText"),
    markdownCode: resolve("markdownCode"),
    markdownCodeBlock: resolve("markdownCodeBlock"),
    markdownBlockQuote: resolve("markdownBlockQuote"),
    markdownEmph: resolve("markdownEmph"),
    markdownStrong: resolve("markdownStrong"),
    markdownListItem: resolve("markdownListItem"),
    markdownListEnumeration: resolve("markdownListEnumeration"),
    markdownHorizontalRule: resolve("markdownHorizontalRule"),
    diffAdded: resolve("diffAdded"),
    diffRemoved: resolve("diffRemoved"),
  }
}
