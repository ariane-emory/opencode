import { describe, expect } from "bun:test"
import { Effect, Exit, Layer } from "effect"
import { SetCurrentSessionTitleTool } from "../../src/tool/set-current-session-title"
import { Session } from "../../src/session"
import { MessageID } from "../../src/session/schema"
import { Agent } from "../../src/agent/agent"
import { Truncate } from "../../src/tool/truncate"
import * as CrossSpawnSpawner from "../../src/effect/cross-spawn-spawner"
import { provideTmpdirInstance } from "../fixture/fixture"
import { testEffect } from "../lib/effect"

const it = testEffect(
  Layer.mergeAll(
    Session.defaultLayer,
    CrossSpawnSpawner.defaultLayer,
    Truncate.defaultLayer,
    Agent.defaultLayer,
  ),
)

describe("tool.set_current_session_title", () => {
  it.live("updates session title", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: () => Effect.void,
        }

        const result = yield* tool.execute({ title: "My Test Session" }, ctx)

        expect(result.title).toBe("My Test Session")
        expect(result.output).toContain("My Test Session")

        const updated = yield* session.get(info.id)
        expect(updated.title).toBe("My Test Session")
      }),
    ),
  )

  it.live("rejects empty title", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: () => Effect.void,
        }

        const exit = yield* tool.execute({ title: "" }, ctx).pipe(Effect.exit)
        expect(Exit.isFailure(exit)).toBe(true)
      }),
    ),
  )

  it.live("rejects title exceeding 255 characters", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: () => Effect.void,
        }

        const longTitle = "a".repeat(256)
        const exit = yield* tool.execute({ title: longTitle }, ctx).pipe(Effect.exit)
        expect(Exit.isFailure(exit)).toBe(true)
      }),
    ),
  )

  it.live("accepts title with exactly 255 characters", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: () => Effect.void,
        }

        const maxTitle = "a".repeat(255)
        const result = yield* tool.execute({ title: maxTitle }, ctx)

        expect(result.title).toBe(maxTitle)
        const updated = yield* session.get(info.id)
        expect(updated.title).toBe(maxTitle)
      }),
    ),
  )

  it.live("accepts single character title", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: () => Effect.void,
        }

        const result = yield* tool.execute({ title: "X" }, ctx)

        expect(result.title).toBe("X")
        const updated = yield* session.get(info.id)
        expect(updated.title).toBe("X")
      }),
    ),
  )

  it.live("asks for permission", () =>
    provideTmpdirInstance(() =>
      Effect.gen(function* () {
        const session = yield* Session.Service
        const info = yield* session.create({})
        const toolInfo = yield* SetCurrentSessionTitleTool
        const tool = yield* toolInfo.init()
        const requests: Array<{ permission: string }> = []
        const ctx = {
          sessionID: info.id,
          messageID: MessageID.make(""),
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => Effect.void,
          ask: (req: { permission: string }) =>
            Effect.sync(() => {
              requests.push(req)
            }),
        }

        yield* tool.execute({ title: "Test Title" }, ctx)

        expect(requests.length).toBe(1)
        expect(requests[0].permission).toBe("set_current_session_title")
      }),
    ),
  )
})
