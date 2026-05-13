import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import { Session } from "@/session/session"
import DESCRIPTION from "./set-current-session-title.txt"

const Parameters = Schema.Struct({
  title: Schema.String.annotate({ description: "The new title for the current session" }),
})

export const SetCurrentSessionTitleTool = Tool.define(
  "set_current_session_title",
  Effect.gen(function* () {
    const svc = yield* Session.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          yield* ctx.ask({
            permission: "set_current_session_title",
            patterns: ["*"],
            always: ["*"],
            metadata: {},
          })

          yield* svc.setTitle({ sessionID: ctx.sessionID, title: params.title })

          return {
            title: params.title,
            output: `Session title updated to: ${params.title}`,
            metadata: {},
          }
        }).pipe(Effect.orDie),
    }
  }),
)
