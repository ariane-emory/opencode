import { RGBA, TextAttributes } from "@opentui/core"
import { For, type JSX } from "solid-js"
import { useTheme, tint } from "@tui/context/theme"
import { go } from "@/cli/logo"

export type LogoShape = {
  left: string[]
  right: string[]
}

const LOGO_LEFT = [
  "██████╗  █████╗ ███████╗███████╗     ",
  "██╔══██╗██╔══██╗██╔════╝██╔════╝    ",
  "██████╔╝███████║███████╗█████╗      ",
  "██╔══██╗██╔══██║╚════██║██╔══╝      ",
  "██████╔╝██║  ██║███████║███████╗    ",
  "╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝     ",
  "                                  ",
]

const LOGO_RIGHT = [
  "██████╗ ███╗   ██╗███████╗",
  "██╔═══██╗████╗  ██║██╔════╝",
  "██║   ██║██╔██╗ ██║█████╗  ",
  "██║   ██║██║╚██╗██║██╔══╝  ",
  "╚██████╔╝██║ ╚████║███████╗",
  "╚═════╝ ╚═╝  ╚═══╝╚══════╝",
  "[ A product of Reseune Labs ]",
]

const logo: LogoShape = { left: LOGO_LEFT, right: LOGO_RIGHT }

const GAP = 1

type LogoContext = {
  LEFT: number
  shape: LogoShape
}

function build(shape: LogoShape): LogoContext {
  const LEFT = shape.left[0]?.length ?? 0
  return { LEFT, shape }
}

const DEFAULT = build(logo)

export function Logo(props: { shape?: LogoShape; ink?: RGBA; idle?: boolean } = {}) {
  const ctx = props.shape ? build(props.shape) : DEFAULT
  const { theme } = useTheme()

  const renderLine = (line: string, ink: RGBA, bold: boolean): JSX.Element[] => {
    const shadow = tint(theme.background, ink, 0.25)
    const attrs = bold ? TextAttributes.BOLD : undefined

    return Array.from(line).map((char) => {
      if (char === " ") {
        return (
          <text fg={ink} attributes={attrs} selectable={false}>
            {char}
          </text>
        )
      }

      if (char === "_") {
        return (
          <text fg={ink} bg={shadow} attributes={attrs} selectable={false}>
            {" "}
          </text>
        )
      }

      if (char === "^") {
        return (
          <text fg={ink} bg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }

      if (char === "~") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▀
          </text>
        )
      }

      if (char === ",") {
        return (
          <text fg={shadow} attributes={attrs} selectable={false}>
            ▄
          </text>
        )
      }

      if (char === "█" || char === "▀" || char === "▄") {
        return (
          <text fg={ink} attributes={attrs} selectable={false}>
            {char}
          </text>
        )
      }

      return (
        <text fg={ink} attributes={attrs} selectable={false}>
          {char}
        </text>
      )
    })
  }

  return (
    <box>
      <For each={ctx.shape.left}>
        {(line, index) => {
          const isTagline = index() === ctx.shape.left.length - 1
          return (
            <box flexDirection="row" gap={1}>
              <box flexDirection="row">
                {renderLine(line, props.ink ?? theme.textMuted, !!props.ink)}
              </box>
              <box flexDirection="row">
                {renderLine(
                  ctx.shape.right[index()],
                  isTagline ? props.ink ?? theme.textMuted : props.ink ?? theme.text,
                  isTagline ? false : true,
                )}
              </box>
            </box>
          )
        }}
      </For>
    </box>
  )
}

export function GoLogo() {
  const { theme } = useTheme()
  const base = tint(theme.background, theme.text, 0.62)
  return <Logo shape={go} ink={base} />
}
