import z from "zod"
import { Effect } from "effect"
import { Tool } from "./tool"
import { Session } from "../session"
import DESCRIPTION from "./set-current-session-title.txt"

export const SetCurrentSessionTitleTool = Tool.define(
  "set_current_session_title",
  Effect.gen(function* () {
    const session = yield* Session.Service

    return {
      description: DESCRIPTION,
      parameters: z.object({
        title: z
          .string()
          .min(1, "Title must be at least 1 character")
          .max(255, "Title must be at most 255 characters")
          .describe("The new title for the current session"),
      }),
      execute: (params, ctx) =>
        Effect.gen(function* () {
          yield* ctx.ask({
            permission: "set_current_session_title",
            patterns: ["*"],
            always: ["*"],
            metadata: {},
          })

          yield* session.setTitle({ sessionID: ctx.sessionID, title: params.title })

          return {
            title: params.title,
            output: `Session title updated to: ${params.title}`,
            metadata: {
              sessionID: ctx.sessionID,
              title: params.title,
            },
          }
        }),
    }
  }),
)
