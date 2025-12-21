import { TextAttributes } from "@opentui/core"
import { For } from "solid-js"
import { useTheme } from "@tui/context/theme"

const LOGO_LEFT = [
  `██████╗  █████╗ ███████╗███████╗     `,
  `██╔══██╗██╔══██╗██╔════╝██╔════╝    `,
  `██████╔╝███████║███████╗█████╗      `,
  `██╔══██╗██╔══██║╚════██║██╔══╝      `,
  `██████╔╝██║  ██║███████║███████╗    `,
  `╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝     `,
  `                                     `,
]

const LOGO_RIGHT = [
  `██████╗ ███╗   ██╗███████╗`,
  `██╔═══██╗████╗  ██║██╔════╝`,
  `██║   ██║██╔██╗ ██║█████╗  `,
  `██║   ██║██║╚██╗██║██╔══╝  `,
  `╚██████╔╝██║ ╚████║███████╗`,
  `╚═════╝ ╚═╝  ╚═══╝╚══════╝`,
  `[ A Reseune Labs product ]`,
]

export function Logo() {
  const { theme } = useTheme()
  return (
    <box>
      <For each={LOGO_LEFT}>
        {(line, index) => (
          <box flexDirection="row" gap={1}>
            <text fg={theme.textMuted} selectable={false}>
              {line}
            </text>
            <text fg={index() === 6 ? theme.textMuted : theme.text} attributes={index() === 6 ? undefined : TextAttributes.BOLD} selectable={false}>
              {LOGO_RIGHT[index()]}
            </text>
          </box>
        )}
      </For>
    </box>
  )
}
