import { afterEach, describe, expect, mock, test } from "bun:test"
import { Effect } from "effect"
import { Server } from "../../src/server/server"
import { Session as SessionNs, NothingToContinueError, InvalidContinueAgentError } from "@/session/session"
import { MessageV2 } from "../../src/session/message-v2"
import { ModelID, ProviderID } from "../../src/provider/schema"
import { MessageID, PartID, type SessionID } from "../../src/session/schema"
import { SessionPrompt } from "../../src/session/prompt"
import { InstanceRef } from "../../src/effect/instance-ref"
import type { InstanceContext } from "../../src/project/instance-context"
import * as Log from "@opencode-ai/core/util/log"
import { disposeAllInstances, provideTestInstance, TestInstance, tmpdir } from "../fixture/fixture"
import { testEffect } from "../lib/effect"

void Log.init({ print: false })

const it = testEffect(SessionNs.defaultLayer)

function run<A, E>(instance: InstanceContext, fx: Effect.Effect<A, E, SessionNs.Service>) {
  return Effect.runPromise(
    fx.pipe(Effect.provide(SessionNs.defaultLayer), Effect.provideService(InstanceRef, instance)),
  )
}

function makeSession(instance: InstanceContext) {
  const svc = {
    ...SessionNs,
    create(input?: SessionNs.CreateInput) {
      return run(instance, SessionNs.Service.use((svc) => svc.create(input)))
    },
    remove(id: SessionID) {
      return run(instance, SessionNs.Service.use((svc) => svc.remove(id)))
    },
  }

  return {
    ...SessionNs,
    create: svc.create,
    remove: svc.remove,
    updateMessage<T extends MessageV2.Info>(msg: T) {
      return run(instance, SessionNs.Service.use((svc) => svc.updateMessage(msg)))
    },
    updatePart<T extends MessageV2.Part>(part: T) {
      return run(instance, SessionNs.Service.use((svc) => svc.updatePart(part)))
    },
    messages(input: { sessionID: SessionID; limit?: number }) {
      return run(instance, SessionNs.Service.use((svc) => svc.messages(input)))
    },
  }
}

afterEach(async () => {
  mock.restore()
  await disposeAllInstances()
})

async function user(session: ReturnType<typeof makeSession>, sessionID: SessionID, text: string, model = "test") {
  const msg = await session.updateMessage({
    id: MessageID.ascending(),
    role: "user",
    sessionID,
    agent: "build",
    model: { providerID: ProviderID.make("test"), modelID: ModelID.make(model) },
    time: { created: Date.now() },
  })
  await session.updatePart({
    id: PartID.ascending(),
    sessionID,
    messageID: msg.id,
    type: "text",
    text,
  })
  return msg
}

async function assistant(session: ReturnType<typeof makeSession>, sessionID: SessionID, parentID: string, opts?: Partial<MessageV2.Assistant>) {
  const msg = await session.updateMessage({
    id: MessageID.ascending(),
    role: "assistant" as const,
    sessionID,
    parentID: MessageID.make(parentID),
    mode: "build",
    agent: "build",
    path: { cwd: "/tmp", root: "/tmp" },
    cost: 0,
    tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
    modelID: ModelID.make("test"),
    providerID: ProviderID.make("test"),
    time: { created: Date.now(), completed: Date.now() },
    ...opts,
  })
  await session.updatePart({
    id: PartID.ascending(),
    sessionID,
    messageID: msg.id,
    type: "text",
    text: "assistant response",
  })
  return msg
}

function result(sessionID: SessionID, parentID: string): MessageV2.WithParts {
  return {
    info: {
      id: MessageID.ascending(),
      role: "assistant",
      sessionID,
      parentID: MessageID.make(parentID),
      mode: "build",
      agent: "build",
      path: { cwd: "/tmp", root: "/tmp" },
      cost: 0,
      tokens: { input: 0, output: 0, reasoning: 0, cache: { read: 0, write: 0 } },
      modelID: ModelID.make("test"),
      providerID: ProviderID.make("test"),
      time: { created: Date.now() },
      finish: "stop",
    },
    parts: [],
  }
}
describe("continue logic", () => {
  test("throws when no assistant message exists", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        await user(Session, session.id, "hello")

        const err = await SessionPrompt.continue_({ sessionID: session.id }, { instance: ctx }).then(
          () => undefined,
          (err) => err,
        )

        expect(err).toBeInstanceOf(Session.NothingToContinueError)
        expect(err.sessionID).toBe(session.id)

        await Session.remove(session.id)
      },
    })
  })

  test("sends new prompt when assistant finished normally", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        await assistant(Session, session.id, usr.id, { finish: "stop" })

        const err = await SessionPrompt.continue_({ sessionID: session.id }, { instance: ctx }).then(
          () => undefined,
          (err) => err,
        )

        expect(err).toBeDefined()
        const msgs = await Session.messages({ sessionID: session.id })
        const users = msgs.filter((msg) => msg.info.role === "user")
        expect(users.length).toBe(2)

        await Session.remove(session.id)
      },
    })
  })

  test("patches interrupted assistant and preserves output", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        await assistant(Session, session.id, usr.id, {
          finish: "stop",
          error: { name: "MessageAbortedError", data: { message: "cancelled" } },
        })

        const err = await SessionPrompt.continue_({ sessionID: session.id }, { instance: ctx }).then(
          () => undefined,
          (err) => err,
        )

        expect(err).toBeDefined()
        const msgs = await Session.messages({ sessionID: session.id })
        const ast = msgs.findLast((msg) => msg.info.role === "assistant")
        expect(ast).toBeDefined()
        if (ast?.info.role === "assistant") {
          expect(ast.info.error).toBeUndefined()
          expect(ast.info.finish).toBe("tool-calls")
        }
        expect(ast?.parts[0]?.type).toBe("text")

        await Session.remove(session.id)
      },
    })
  })

  test("does not create a new user message when resuming tool calls", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        const ast = await assistant(Session, session.id, usr.id, { finish: "stop" })

        await Session.updatePart({
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
        })

        const err = await SessionPrompt.continue_({ sessionID: session.id }, { instance: ctx }).then(
          () => undefined,
          (err) => err,
        )

        expect(err).toBeDefined()
        const msgs = await Session.messages({ sessionID: session.id })
        const users = msgs.filter((msg) => msg.info.role === "user")
        expect(users.length).toBe(1)

        await Session.remove(session.id)
      },
    })
  })

  test("updates the resumed model when continue receives an override", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello", "old")
        await assistant(Session, session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          model: {
            providerID: ProviderID.make("test"),
            modelID: ModelID.make("new"),
          },
        }, { instance: ctx }).catch(() => undefined)

        const msgs = await Session.messages({ sessionID: session.id })
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(String(next.info.model.modelID)).toBe("new")
          expect(String(next.info.model.providerID)).toBe("test")
        }

        await Session.remove(session.id)
      },
    })
  })

  test("updates the resumed agent when continue receives an override", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        await assistant(Session, session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
        }, { instance: ctx }).catch(() => undefined)

        const msgs = await Session.messages({ sessionID: session.id })
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
        }

        await Session.remove(session.id)
      },
    })
  })

  test("updates the resumed agent and model together", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello", "old")
        await assistant(Session, session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
          model: {
            providerID: ProviderID.make("test"),
            modelID: ModelID.make("new"),
          },
        }, { instance: ctx }).catch(() => undefined)

        const msgs = await Session.messages({ sessionID: session.id })
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
          expect(String(next.info.model.modelID)).toBe("new")
        }

        await Session.remove(session.id)
      },
    })
  })

  test("rejects non-primary continue agents", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        await assistant(Session, session.id, usr.id, { finish: undefined })

        const err = await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "general",
        }, { instance: ctx }).then(
          () => undefined,
          (err) => err,
        )

        expect(err).toBeInstanceOf(Session.InvalidContinueAgentError)

        await Session.remove(session.id)
      },
    })
  })

  test("uses the selected primary agent for finished-assistant fallback", async () => {
    await using tmp = await tmpdir({ git: true })
    await provideTestInstance({
      directory: tmp.path,
      fn: async (ctx) => {
        const Session = makeSession(ctx)
        const session = await Session.create({})
        const usr = await user(Session, session.id, "hello")
        await assistant(Session, session.id, usr.id, { finish: "stop" })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
        }, { instance: ctx }).catch(() => undefined)

        const msgs = await Session.messages({ sessionID: session.id })
        const next = msgs.findLast((msg) => msg.info.role === "user")
        expect(next?.info.role).toBe("user")
        if (next?.info.role === "user") {
          expect(next.info.agent).toBe("plan")
        }

        await Session.remove(session.id)
      },
    })
  })

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
    "abort route returns success",
    () =>
      Effect.gen(function* () {
        const test = yield* TestInstance
        const session = yield* Effect.acquireRelease(SessionNs.use.create({}), (created) =>
          SessionNs.use.remove(created.id).pipe(Effect.ignore),
        )

        const res = yield* Effect.promise(() =>
          Promise.resolve(
            Server.Default().app.request(`/session/${session.id}/abort`, {
              method: "POST",
              headers: { "x-opencode-directory": test.directory },
            }),
          ),
        )

        expect(res.status).toBe(200)
        expect(yield* Effect.promise(() => res.json())).toBe(true)
      }),
    { git: true },
  )
})
