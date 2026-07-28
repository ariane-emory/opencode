import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import { Session } from "../session/session"
import DESCRIPTION from "./set-current-session-title.txt"

const parameters = Schema.Struct({
  title: Schema.String.check(Schema.isMinLength(1)).check(Schema.isMaxLength(255)).annotate({
    description: "The new title for the current session",
  }),
})

type Metadata = {
  sessionID: string
  title: string
}

export const SetCurrentSessionTitleTool = Tool.define<typeof parameters, Metadata, Session.Service>(
  "set_current_session_title",
  Effect.gen(function* () {
    const session = yield* Session.Service

    return {
      description: DESCRIPTION,
      parameters,
      execute: (params, ctx: Tool.Context<Metadata>) =>
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
