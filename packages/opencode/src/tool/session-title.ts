import z from "zod"
import { Effect } from "effect"
import * as Tool from "./tool"
import { Session } from "../session"
import DESCRIPTION from "./session-title.txt"

export const GetCurrentSessionTitleTool = Tool.define(
  "get_current_session_title",
  Effect.gen(function* () {
    const session = yield* Session.Service
    return {
      description: DESCRIPTION,
      parameters: z.object({}),
      execute: Effect.fn("GetCurrentSessionTitleTool.execute")(function* (_params, ctx) {
        const info = yield* session.get(ctx.sessionID)
        return {
          title: "Retrieved session title",
          output: info.title ?? "Unknown",
          metadata: {},
        }
      }),
    }
  }),
)
