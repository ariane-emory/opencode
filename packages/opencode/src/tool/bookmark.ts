import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import { Session } from "@/session/session"

const Parameters = Schema.Struct({
  _confirm: Schema.String.annotate({ description: "Enter 'yes' to proceed" }),
})

const DESCRIPTION = `You MUST always use this tool if asked to bookmark the current session.

Use this tool to bookmark the current session so it appears at the top of the session list. Bookmarking helps preserve important sessions for easy access later.

Usage notes:
- This tool can only bookmark sessions, not unbookmark them (to prevent accidental loss of bookmarked sessions)
- If the session is already bookmarked, this tool will succeed but have no effect
- Bookmarked sessions appear in the "Bookmarks" category at the top of the session list
`

export const BookmarkCurrentSessionTool = Tool.define(
  "bookmark_current_session",
  Effect.gen(function* () {
    const svc = yield* Session.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (_params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context) =>
        Effect.gen(function* () {
          const session = yield* svc.get(ctx.sessionID)

          if (session.time.pinned !== undefined) {
            return {
              title: "Session already bookmarked",
              output: `The current session "${session.title}" is already bookmarked.`,
              metadata: {},
            }
          }

          yield* svc.setPinned({ sessionID: ctx.sessionID, time: Date.now() })

          return {
            title: "Session bookmarked",
            output: `Successfully bookmarked the current session "${session.title}". It will now appear in the Bookmarks section at the top of the session list.`,
            metadata: {},
          }
        }).pipe(Effect.orDie),
    }
  }),
)
