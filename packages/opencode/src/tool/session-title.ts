import z from "zod"
import { Tool } from "./tool"
import { Session } from "../session"
import DESCRIPTION from "./session-title.txt"

export const GetCurrentSessionTitleTool = Tool.define("get_current_session_title", {
  description: DESCRIPTION,
  parameters: z.object({}),
  async execute(_params, ctx) {
    const session = await Session.get(ctx.sessionID)
    const title = session?.title ?? "Unknown"
    return {
      title: "Retrieved session title",
      output: title,
      metadata: {},
    }
  },
})
