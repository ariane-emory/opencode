#!/usr/bin/env bun

/**
 * One-time script to convert ef-themes from ghostty format to OpenCode format
 * Fetches themes from anhsirk0/ghostty-themes repository and generates OpenCode JSON files
 */

import { join } from "path"

const GHOSTTY_THEMES_BASE = "https://raw.githubusercontent.com/anhsirk0/ghostty-themes/main/themes"

const EF_THEMES = [
  // Dark themes (17)
  "ef-autumn",
  "ef-bio",
  "ef-cherie",
  "ef-cyprus",
  "ef-dark",
  "ef-dream",
  "ef-duo-dark",
  "ef-eagle",
  "ef-elea-dark",
  "ef-kassio",
  "ef-maris-dark",
  "ef-melissa-dark",
  "ef-night",
  "ef-owl",
  "ef-rosa",
  "ef-symbiosis",
  "ef-trio-dark",
  "ef-winter",
  // Light themes (13)
  "ef-arbutus",
  "ef-day",
  "ef-light",
  "ef-frost",
  "ef-spring",
  "ef-summer",
  "ef-duo-light",
  "ef-elea-light",
  "ef-maris-light",
  "ef-melissa-light",
  "ef-reverie",
  "ef-trio-light",
  // Accessibility themes (4)
  "ef-deuteranopia-dark",
  "ef-deuteranopia-light",
  "ef-tritanopia-dark",
  "ef-tritanopia-light",
]

interface GhosttyTheme {
  background: string
  foreground: string
  cursor: string
  selection_background: string
  selection_foreground: string
  palette: Record<number, string>
}

function parseGhosttyTheme(content: string): GhosttyTheme {
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#"))
  const theme: GhosttyTheme = {
    background: "",
    foreground: "",
    cursor: "",
    selection_background: "",
    selection_foreground: "",
    palette: {},
  }

  for (const line of lines) {
    const match = line.match(/^(\S+)\s*=\s*(.+)$/)
    if (!match) continue

    const [, key, value] = match
    const cleanValue = value.trim()

    if (key === "background") theme.background = cleanValue
    else if (key === "foreground") theme.foreground = cleanValue
    else if (key === "cursor-color") theme.cursor = cleanValue
    else if (key === "selection-background") theme.selection_background = cleanValue
    else if (key === "selection-foreground") theme.selection_foreground = cleanValue
    else if (key === "palette") {
      const paletteMatch = cleanValue.match(/^(\d+)\s*=\s*(.+)$/)
      if (paletteMatch) {
        const [, index, color] = paletteMatch
        theme.palette[parseInt(index)] = color.trim()
      }
    }
  }

  return theme
}

function isLightTheme(name: string): boolean {
  return (
    name.includes("-light") ||
    name === "ef-arbutus" ||
    name === "ef-day" ||
    name === "ef-frost" ||
    name === "ef-spring" ||
    name === "ef-summer" ||
    name === "ef-reverie"
  )
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.min(255, ((num >> 16) & 0xff) + amount)
  const g = Math.min(255, ((num >> 8) & 0xff) + amount)
  const b = Math.min(255, (num & 0xff) + amount)
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16)
  const r = Math.max(0, ((num >> 16) & 0xff) - amount)
  const g = Math.max(0, ((num >> 8) & 0xff) - amount)
  const b = Math.max(0, (num & 0xff) - amount)
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
}

function convertToOpenCodeTheme(name: string, ghostty: GhosttyTheme) {
  const isLight = isLightTheme(name)
  const p = ghostty.palette

  // Generate background variants
  const bg = ghostty.background
  const bgPanel = isLight ? darken(bg, 10) : lighten(bg, 10)
  const bgElement = isLight ? darken(bg, 20) : lighten(bg, 20)
  const bgMenu = bgElement

  // Generate border colors
  const borderSubtle = isLight ? darken(bg, 30) : lighten(bg, 30)
  const border = isLight ? darken(bg, 50) : lighten(bg, 50)
  const borderActive = isLight ? darken(bg, 70) : lighten(bg, 70)

  // Text colors
  const text = ghostty.foreground
  const textMuted = isLight ? lighten(text, 60) : darken(text, 60)

  // ANSI color mapping
  const red = p[1] || p[9] || "#ff0000"
  const green = p[2] || p[10] || "#00ff00"
  const yellow = p[3] || p[11] || "#ffff00"
  const blue = p[4] || p[12] || "#0000ff"
  const magenta = p[5] || p[13] || "#ff00ff"
  const cyan = p[6] || p[14] || "#00ffff"

  // Generate diff background colors
  const diffAddedBg = isLight ? lighten(green, 200) : darken(green, 150)
  const diffRemovedBg = isLight ? lighten(red, 200) : darken(red, 150)
  const diffContextBg = bgPanel
  const diffAddedLineNumberBg = isLight ? lighten(green, 220) : darken(green, 170)
  const diffRemovedLineNumberBg = isLight ? lighten(red, 220) : darken(red, 170)

  return {
    $schema: "https://opencode.ai/theme.json",
    theme: {
      primary: blue,
      secondary: magenta,
      accent: cyan,
      error: red,
      warning: yellow,
      success: green,
      info: cyan,
      text: text,
      textMuted: textMuted,
      background: bg,
      backgroundPanel: bgPanel,
      backgroundElement: bgElement,
      backgroundMenu: bgMenu,
      border: border,
      borderActive: borderActive,
      borderSubtle: borderSubtle,
      diffAdded: green,
      diffRemoved: red,
      diffContext: textMuted,
      diffHunkHeader: yellow,
      diffHighlightAdded: green,
      diffHighlightRemoved: red,
      diffAddedBg: diffAddedBg,
      diffRemovedBg: diffRemovedBg,
      diffContextBg: diffContextBg,
      diffLineNumber: borderSubtle,
      diffAddedLineNumberBg: diffAddedLineNumberBg,
      diffRemovedLineNumberBg: diffRemovedLineNumberBg,
      markdownText: text,
      markdownHeading: blue,
      markdownLink: cyan,
      markdownLinkText: blue,
      markdownCode: green,
      markdownBlockQuote: yellow,
      markdownEmph: yellow,
      markdownStrong: red,
      markdownHorizontalRule: borderSubtle,
      markdownListItem: blue,
      markdownListEnumeration: cyan,
      markdownImage: cyan,
      markdownImageText: blue,
      markdownCodeBlock: text,
      syntaxComment: textMuted,
      syntaxKeyword: magenta,
      syntaxFunction: blue,
      syntaxVariable: red,
      syntaxString: green,
      syntaxNumber: yellow,
      syntaxType: cyan,
      syntaxOperator: cyan,
      syntaxPunctuation: text,
    },
  }
}

async function main() {
  const outputDir = join(import.meta.dir, "..", "src", "cli", "cmd", "tui", "context", "theme")

  console.log(`Converting ${EF_THEMES.length} ef-themes to OpenCode format...`)

  let successCount = 0
  let failCount = 0

  for (const themeName of EF_THEMES) {
    try {
      const url = `${GHOSTTY_THEMES_BASE}/${themeName}`
      console.log(`Fetching ${themeName}...`)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const content = await response.text()
      const ghosttyTheme = parseGhosttyTheme(content)
      const openCodeTheme = convertToOpenCodeTheme(themeName, ghosttyTheme)

      const outputPath = join(outputDir, `${themeName}.json`)
      await Bun.write(outputPath, JSON.stringify(openCodeTheme, null, 2) + "\n")

      console.log(`✓ Generated ${themeName}.json`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to convert ${themeName}:`, error)
      failCount++
    }
  }

  console.log(`\nConversion complete: ${successCount} succeeded, ${failCount} failed`)
}

main()
