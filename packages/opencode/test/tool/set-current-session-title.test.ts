import { describe, expect } from "bun:test"
import { Effect, Exit, Layer } from "effect"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { AppNodeBuilder } from "@opencode-ai/core/effect/app-node-builder"
import { SessionProjector } from "@opencode-ai/core/session/projector"
import { SetCurrentSessionTitleTool } from "../../src/tool/set-current-session-title"
import { Session as SessionNs } from "../../src/session/session"
import { MessageID } from "../../src/session/schema"
import { Agent } from "../../src/agent/agent"
import * as Truncate from "../../src/tool/truncate"
import { CrossSpawnSpawner } from "@opencode-ai/core/cross-spawn-spawner"
import { EventV2Bridge } from "../../src/event-v2-bridge"
import { InstanceStore } from "@/project/instance-store"
import { InstanceBootstrap } from "@/project/bootstrap"
import { RuntimeFlags } from "@/effect/runtime-flags"
import { testEffect } from "../lib/effect"

const it = testEffect(
  AppNodeBuilder.build(
    LayerNode.group([
      SessionNs.node,
      EventV2Bridge.node,
      SessionProjector.node,
      CrossSpawnSpawner.node,
      InstanceStore.node,
      Truncate.node,
      Agent.node,
    ]),
    [
      [RuntimeFlags.node, RuntimeFlags.layer({ experimentalWorkspaces: false })],
      [InstanceBootstrap.node, Layer.succeed(InstanceBootstrap.Service, InstanceBootstrap.Service.of({ run: Effect.void }))],
    ],
  ),
)

describe("tool.set_current_session_title", () => {
  it.instance("updates session title", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )

  it.instance("rejects empty title", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )

  it.instance("rejects title exceeding 255 characters", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )

  it.instance("accepts title with exactly 255 characters", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )

  it.instance("accepts single character title", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )

  it.instance("asks for permission", () =>
    Effect.gen(function* () {
      const session = yield* SessionNs.Service
      const info = yield* session.create({})
      const toolInfo = yield* SetCurrentSessionTitleTool
      const tool = yield* toolInfo.init()
      const requests: Array<{ permission: string }> = []
      const ctx = {
        sessionID: info.id,
        messageID: MessageID.make("msg_test"),
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
  )
})
