import z from "zod"
import { Tool } from "./tool"
import { Session } from "../session"
import DESCRIPTION from "./set-current-session-title.txt"

export const SetCurrentSessionTitleTool = Tool.define("set_current_session_title", {
  description: DESCRIPTION,
  parameters: z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character")
      .max(255, "Title must be at most 255 characters")
      .describe("The new title for the current session"),
  }),
  async execute(params, ctx) {
    await ctx.ask({
      permission: "set_current_session_title",
      patterns: ["*"],
      always: ["*"],
      metadata: {},
    })

    const session = await Session.update(ctx.sessionID, (draft) => {
      draft.title = params.title
    })

    return {
      title: params.title,
      output: `Session title updated to: ${session.title}`,
      metadata: {
        sessionID: ctx.sessionID,
        title: session.title,
      },
    }
  },
})
