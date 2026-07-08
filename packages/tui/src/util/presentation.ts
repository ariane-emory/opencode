const logo = {
  left: ["▄▀▀▄               ", "█▀▀█ ▄▀▀  ▄▀▀  ▄▀▀ ", "█  █ █▀█  ▀▀▄  █▀▀ ", "▀▀▀▀ ▀▀▘  ▀▀▘  ▀▀▀ "],
  right: ["▄▀▀▄          ", "█  █ ▄▀█  ▄▀▀ ", "█  █ █▀█  █▀▀ ", "▀▀▀▀ ▀ ▀  ▀▀▀ "],
}

const reset = "\x1b[0m"
const bold = "\x1b[1m"
const dim = "\x1b[90m"

function wordmark(pad = "") {
  const draw = (line: string, fg: string) =>
    [...line].map((char) => (char === " " ? " " : `${fg}${char}${reset}`)).join("")

  return logo.left.map((line, index) => {
    const left = draw(line, dim)
    const right = draw(logo.right[index] ?? "", reset)
    return `${pad}${left} ${right}`
  })
}

export function sessionEpilogue(input: { title: string; sessionID?: string }) {
  const weak = (text: string) => `${dim}${text.padEnd(10, " ")}${reset}`
  return [
    ...wordmark("  "),
    "",
    `  ${weak("Session")}${bold}${input.title}${reset}`,
    `  ${weak("Continue")}${bold}baseone -s ${input.sessionID}${reset}`,
    "",
  ].join("\n")
}
