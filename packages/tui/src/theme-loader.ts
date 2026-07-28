/**
 * Theme loader for CLI - loads theme JSON files and converts to MarkdownTheme format
 */
import type { MarkdownTheme } from "./markdown-renderer"
import aura from "./theme/assets/aura.json" with { type: "json" }
import ayu from "./theme/assets/ayu.json" with { type: "json" }
import carbonfox from "./theme/assets/carbonfox.json" with { type: "json" }
import catppuccin from "./theme/assets/catppuccin.json" with { type: "json" }
import catppuccinFrappe from "./theme/assets/catppuccin-frappe.json" with { type: "json" }
import catppuccinMacchiato from "./theme/assets/catppuccin-macchiato.json" with { type: "json" }
import cobalt2 from "./theme/assets/cobalt2.json" with { type: "json" }
import cursor from "./theme/assets/cursor.json" with { type: "json" }
import dracula from "./theme/assets/dracula.json" with { type: "json" }
import everforest from "./theme/assets/everforest.json" with { type: "json" }
import flexoki from "./theme/assets/flexoki.json" with { type: "json" }
import github from "./theme/assets/github.json" with { type: "json" }
import gruvbox from "./theme/assets/gruvbox.json" with { type: "json" }
import kanagawa from "./theme/assets/kanagawa.json" with { type: "json" }
import lucentOrng from "./theme/assets/lucent-orng.json" with { type: "json" }
import material from "./theme/assets/material.json" with { type: "json" }
import matrix from "./theme/assets/matrix.json" with { type: "json" }
import mercury from "./theme/assets/mercury.json" with { type: "json" }
import monokai from "./theme/assets/monokai.json" with { type: "json" }
import nightowl from "./theme/assets/nightowl.json" with { type: "json" }
import nord from "./theme/assets/nord.json" with { type: "json" }
import oneDark from "./theme/assets/one-dark.json" with { type: "json" }
import opencode from "./theme/assets/opencode.json" with { type: "json" }
import orng from "./theme/assets/orng.json" with { type: "json" }
import osakaJade from "./theme/assets/osaka-jade.json" with { type: "json" }
import palenight from "./theme/assets/palenight.json" with { type: "json" }
import rosepine from "./theme/assets/rosepine.json" with { type: "json" }
import solarized from "./theme/assets/solarized.json" with { type: "json" }
import synthwave84 from "./theme/assets/synthwave84.json" with { type: "json" }
import tokyonight from "./theme/assets/tokyonight.json" with { type: "json" }
import vercel from "./theme/assets/vercel.json" with { type: "json" }
import vesper from "./theme/assets/vesper.json" with { type: "json" }
import zenburn from "./theme/assets/zenburn.json" with { type: "json" }

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
