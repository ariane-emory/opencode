import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import { Session } from "@/session/session"
import DESCRIPTION from "./session-title.txt"

const Parameters = Schema.Struct({})

export const GetCurrentSessionTitleTool = Tool.define(
  "get_current_session_title",
  Effect.gen(function* () {
    const session = yield* Session.Service
    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (_params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          const info = yield* session.get(ctx.sessionID)
          return {
            title: "Retrieved session title",
            output: info.title ?? "Unknown",
            metadata: {},
          }
        }).pipe(Effect.orDie),
    }
  }),
)
