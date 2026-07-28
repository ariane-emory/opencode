import { afterEach, describe, expect, mock, test } from "bun:test"
import { LayerNode } from "@opencode-ai/core/effect/layer-node"
import { Cause, Effect, Layer, Exit } from "effect"
import { SessionV1 } from "@opencode-ai/core/v1/session"
import { Session as SessionNs, NothingToContinueError, InvalidContinueAgentError } from "@/session/session"
import { MessageV2 } from "../../src/session/message-v2"
import { ModelV2 } from "@opencode-ai/core/model"
import { ProviderV2 } from "@opencode-ai/core/provider"
import { MessageID, PartID, type SessionID } from "../../src/session/schema"
import { SessionPrompt } from "../../src/session/prompt"
import { AppLayer } from "@/effect/app-runtime"
import { disposeAllInstances, TestInstance } from "../fixture/fixture"
import { testEffect, testEffectShared } from "../lib/effect"
import { httpApiLayer, requestInDirectory } from "./httpapi-layer"

const it = testEffect(Layer.mergeAll(LayerNode.compile(SessionNs.node), httpApiLayer))

const itContinue = testEffectShared(AppLayer)

afterEach(async () => {
  mock.restore()
  await disposeAllInstances()
})

function userEffect(sessionID: SessionID, text: string, model = "test") {
  return Effect.gen(function* () {
    const msg = yield* SessionNs.Service.use((svc) =>
      svc.updateMessage({
        id: MessageID.ascending(),
        role: "user",
        sessionID,
        agent: "build",
        model: { providerID: ProviderV2.ID.make("test"), modelID: ModelV2.ID.make(model) },
        time: { created: Date.now() },
      }),
    )
    yield* SessionNs.Service.use((svc) =>
      svc.updatePart({
        id: PartID.ascending(),
        sessionID,
        messageID: msg.id,
        type: "text",
        text,
      }),
    )
    return msg
  })
}

function assistantEffect(sessionID: SessionID, parentID: string, opts?: Partial<SessionV1.Assistant>) {
  return Effect.gen(function* () {
    const msg = yield* SessionNs.Service.use((svc) =>
      svc.updateMessage({
        id: MessageID.ascending(),
        role: "assistant" as const,
        sessionID,
        parentID: MessageID.make(parentID),
        mode: "build",
        agent: "build",
        path: { cwd: "/tmp", root: "/tmp" },
        cost: 0,
        tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
        modelID: ModelV2.ID.make("test"),
        providerID: ProviderV2.ID.make("test"),
        time: { created: Date.now(), completed: Date.now() },
        ...opts,
      }),
    )
    yield* SessionNs.Service.use((svc) =>
      svc.updatePart({
        id: PartID.ascending(),
        sessionID,
        messageID: msg.id,
        type: "text",
        text: "assistant response",
      }),
    )
    return msg
  })
}

describe("continue logic", () => {
  itContinue.instance(
    "throws when no assistant message exists",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        yield* userEffect(session.id, "hello")

        const exit = yield* SessionPrompt.Service.use((svc) => svc.continue({ sessionID: session.id })).pipe(
          Effect.exit,
        )

        expect(Exit.isFailure(exit)).toBe(true)
        if (Exit.isFailure(exit)) {
          const err = Cause.squash(exit.cause)
          expect(err).toBeInstanceOf(SessionNs.NothingToContinueError)
          if (err instanceof SessionNs.NothingToContinueError) {
            expect(err.sessionID).toBe(session.id)
          }
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "sends new prompt when assistant finished normally",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        yield* assistantEffect(session.id, usr.id, { finish: "stop" })

        yield* SessionPrompt.Service.use((svc) => svc.continue({ sessionID: session.id })).pipe(
          Effect.exit,
        )

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const users = msgs.filter((msg) => msg.info.role === "user")
        expect(users.length).toBe(2)

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "patches interrupted assistant and preserves output",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        yield* assistantEffect(session.id, usr.id, {
          finish: "stop",
          error: { name: "MessageAbortedError", data: { message: "cancelled" } },
        })

        yield* SessionPrompt.Service.use((svc) => svc.continue({ sessionID: session.id })).pipe(
          Effect.exit,
        )

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const ast = msgs.findLast((msg) => msg.info.role === "assistant")
        expect(ast).toBeDefined()
        if (ast?.info.role === "assistant") {
          expect(ast.info.error).toBeUndefined()
          expect(ast.info.finish).toBe("tool-calls")
        }
        expect(ast?.parts[0]?.type).toBe("text")

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "does not create a new user message when resuming tool calls",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        const ast = yield* assistantEffect(session.id, usr.id, { finish: "stop" })

        yield* SessionNs.Service.use((svc) =>
          svc.updatePart({
            id: PartID.ascending(),
            sessionID: session.id,
            messageID: ast.id,
            type: "tool",
            callID: "call_1",
            tool: "bash",
            state: {
              status: "pending",
              input: { command: "echo hi" },
              raw: '{"command":"echo hi"}',
            },
          }),
        )

        yield* SessionPrompt.Service.use((svc) => svc.continue({ sessionID: session.id })).pipe(
          Effect.exit,
        )

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const users = msgs.filter((msg) => msg.info.role === "user")
        expect(users.length).toBe(1)

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "updates the resumed model when continue receives an override",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello", "old")
        yield* assistantEffect(session.id, usr.id, { finish: undefined })

        yield* SessionPrompt.Service.use((svc) =>
          svc.continue({
            sessionID: session.id,
            model: {
              providerID: ProviderV2.ID.make("test"),
              modelID: ModelV2.ID.make("new"),
            },
          }),
        ).pipe(Effect.exit)

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(String(next.info.model.modelID)).toBe("new")
          expect(String(next.info.model.providerID)).toBe("test")
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "updates the resumed agent when continue receives an override",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        yield* assistantEffect(session.id, usr.id, { finish: undefined })

        yield* SessionPrompt.Service.use((svc) =>
          svc.continue({
            sessionID: session.id,
            agent: "plan",
          }),
        ).pipe(Effect.exit)

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "updates the resumed agent and model together",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello", "old")
        yield* assistantEffect(session.id, usr.id, { finish: undefined })

        yield* SessionPrompt.Service.use((svc) =>
          svc.continue({
            sessionID: session.id,
            agent: "plan",
            model: {
              providerID: ProviderV2.ID.make("test"),
              modelID: ModelV2.ID.make("new"),
            },
          }),
        ).pipe(Effect.exit)

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
          expect(String(next.info.model.modelID)).toBe("new")
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "rejects non-primary continue agents",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        yield* assistantEffect(session.id, usr.id, { finish: undefined })

        const exit = yield* SessionPrompt.Service.use((svc) =>
          svc.continue({
            sessionID: session.id,
            agent: "general",
          }),
        ).pipe(Effect.exit)

        expect(Exit.isFailure(exit)).toBe(true)
        if (Exit.isFailure(exit)) {
          expect(Cause.squash(exit.cause)).toBeInstanceOf(SessionNs.InvalidContinueAgentError)
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  itContinue.instance(
    "uses the selected primary agent for finished-assistant fallback",
    () =>
      Effect.gen(function* () {
        const session = yield* SessionNs.Service.use((svc) => svc.create({}))
        const usr = yield* userEffect(session.id, "hello")
        yield* assistantEffect(session.id, usr.id, { finish: "stop" })

        yield* SessionPrompt.Service.use((svc) =>
          svc.continue({
            sessionID: session.id,
            agent: "plan",
          }),
        ).pipe(Effect.exit)

        const msgs = yield* SessionNs.Service.use((svc) => svc.messages({ sessionID: session.id }))
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
        }

        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  test("NothingToContinueError exposes the session id", () => {
    const err = new NothingToContinueError("test-session-id")
    expect(err).toBeInstanceOf(Error)
    expect(err.sessionID).toBe("test-session-id")
    expect(err.message).toBe("Nothing to continue in session test-session-id")
  })

  test("InvalidContinueAgentError exposes the agent", () => {
    const err = new InvalidContinueAgentError("general")
    expect(err).toBeInstanceOf(Error)
    expect(err.agent).toBe("general")
    expect(err.message).toBe("Invalid continue agent: general")
  })
})

describe("session action routes", () => {
  it.instance(
    "session routes expose metadata on create, update, get, and fork",
    () =>
      Effect.gen(function* () {
        const test = yield* TestInstance
        const headers = { "Content-Type": "application/json" }

        const created = yield* requestInDirectory("/session", test.directory, {
          method: "POST",
          headers,
          body: JSON.stringify({
            title: "meta-session",
            metadata: { source: "sdk", trace: { id: "abc" } },
          }),
        })
        expect(created.status).toBe(200)

        const session = (yield* created.json) as SessionNs.Info
        expect(session.metadata).toEqual({ source: "sdk", trace: { id: "abc" } })

        const updated = yield* requestInDirectory(`/session/${session.id}`, test.directory, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ metadata: { source: "sdk", trace: { id: "def" }, tags: ["one"] } }),
        })
        expect(updated.status).toBe(200)

        const next = (yield* updated.json) as SessionNs.Info
        expect(next.metadata).toEqual({ source: "sdk", trace: { id: "def" }, tags: ["one"] })

        const fetched = yield* requestInDirectory(`/session/${session.id}`, test.directory)
        expect(fetched.status).toBe(200)
        expect(((yield* fetched.json) as SessionNs.Info).metadata).toEqual(next.metadata)

        const forked = yield* requestInDirectory(`/session/${session.id}/fork`, test.directory, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        })
        expect(forked.status).toBe(200)

        const fork = (yield* forked.json) as SessionNs.Info
        expect(fork.metadata).toEqual(next.metadata)

        const reset = yield* requestInDirectory(`/session/${session.id}`, test.directory, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ metadata: {} }),
        })
        expect(reset.status).toBe(200)
        expect(((yield* reset.json) as SessionNs.Info).metadata).toEqual({})

        yield* SessionNs.Service.use((svc) => svc.remove(fork.id)).pipe(Effect.exit)
        yield* SessionNs.Service.use((svc) => svc.remove(session.id)).pipe(Effect.exit)
      }),
    { git: true },
  )

  it.instance(
    "abort route returns success",
    () =>
      Effect.gen(function* () {
        const test = yield* TestInstance
        const session = yield* Effect.acquireRelease(SessionNs.use.create({}), (created) =>
          SessionNs.use.remove(created.id).pipe(Effect.exit),
        )

        const res = yield* requestInDirectory(`/session/${session.id}/abort`, test.directory, { method: "POST" })

        expect(res.status).toBe(200)
        expect(yield* res.json).toBe(true)
      }),
    { git: true },
  )

  it.instance(
    "experimental background route is a no-op without synchronous subagents",
    () =>
      Effect.gen(function* () {
        const test = yield* TestInstance
        const session = yield* Effect.acquireRelease(SessionNs.use.create({}), (created) =>
          SessionNs.use.remove(created.id).pipe(Effect.ignore),
        )

        const res = yield* requestInDirectory(`/experimental/session/${session.id}/background`, test.directory, {
          method: "POST",
        })

        expect(res.status).toBe(200)
        expect(yield* res.json).toBe(false)
      }),
    { git: true },
  )
})
