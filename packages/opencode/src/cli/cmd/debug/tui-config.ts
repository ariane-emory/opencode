import { EOL } from "os"
import { TuiConfig } from "../../../config/tui"
import { bootstrap } from "../../bootstrap"
import { cmd } from "../cmd"

export const TuiConfigCommand = cmd({
  command: "tui-config",
  describe: "show resolved TUI configuration",
  builder: (yargs) => yargs,
  async handler() {
    await bootstrap(process.cwd(), async () => {
      const config = await TuiConfig.get()
      process.stdout.write(JSON.stringify(config, null, 2) + EOL)
    })
  },
})