import { createSimpleContext } from "./helper"

export const { use: useRestart, provider: RestartProvider } = createSimpleContext({
  name: "Restart",
  init: (input: { onRestart?: () => Promise<void> }) => {
    return async () => {
      await input.onRestart?.()
    }
  },
})
