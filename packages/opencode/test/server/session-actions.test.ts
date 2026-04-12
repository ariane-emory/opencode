import { afterEach, describe, expect, mock, spyOn, test } from "bun:test"
import { Instance } from "../../src/project/instance"
import { Server } from "../../src/server/server"
import { Session } from "../../src/session"
import { MessageV2 } from "../../src/session/message-v2"
import { ModelID, ProviderID } from "../../src/provider/schema"
import { MessageID, PartID, type SessionID } from "../../src/session/schema"
import { SessionPrompt } from "../../src/session/prompt"
import { Log } from "../../src/util/log"
import { tmpdir } from "../fixture/fixture"

Log.init({ print: false })

afterEach(async () => {
  mock.restore()
  await Instance.disposeAll()
})

async function user(sessionID: SessionID, text: string, model = "test") {
  const msg = await Session.updateMessage({
    id: MessageID.ascending(),
    role: "user",
    sessionID,
    agent: "build",
    model: { providerID: ProviderID.make("test"), modelID: ModelID.make(model) },
    time: { created: Date.now() },
  })
  await Session.updatePart({
    id: PartID.ascending(),
    sessionID,
    messageID: msg.id,
    type: "text",
    text,
  })
  return msg
}

async function assistant(sessionID: SessionID, parentID: string, opts?: Partial<MessageV2.Assistant>) {
  const msg = await Session.updateMessage({
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
  await Session.updatePart({
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
describe("session action routes", () => {
  test("abort route calls SessionPrompt.cancel", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const cancel = spyOn(SessionPrompt, "cancel").mockResolvedValue()
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/abort`, { method: "POST" })

        expect(res.status).toBe(200)
        expect(await res.json()).toBe(true)
        expect(cancel).toHaveBeenCalledWith(session.id)

        await Session.remove(session.id)
      },
    })
  })
  test("continue route calls SessionPrompt.continue_", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const msg = await user(session.id, "hello")
        const cont = spyOn(SessionPrompt, "continue_").mockResolvedValue(result(session.id, msg.id))
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/continue`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })

        expect(res.status).toBe(200)
        expect(await res.json()).toBe(true)
        expect(cont).toHaveBeenCalledWith({ sessionID: session.id, agent: undefined, model: undefined })

        await Session.remove(session.id)
      },
    })
  })

  test("continue route passes selected agent and model override", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const msg = await user(session.id, "hello")
        const cont = spyOn(SessionPrompt, "continue_").mockResolvedValue(result(session.id, msg.id))
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/continue`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent: "plan",
            model: {
              providerID: "test",
              modelID: "next",
            },
          }),
        })

        expect(res.status).toBe(200)
        expect(cont).toHaveBeenCalledWith({
          sessionID: session.id,
          agent: "plan",
          model: {
            providerID: "test",
            modelID: "next",
          },
        })

        await Session.remove(session.id)
      },
    })
  })

  test("continue route works without body", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const msg = await user(session.id, "hello")
        const cont = spyOn(SessionPrompt, "continue_").mockResolvedValue(result(session.id, msg.id))
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/continue`, {
          method: "POST",
        })

        expect(res.status).toBe(200)
        expect(cont).toHaveBeenCalledWith({ sessionID: session.id, agent: undefined, model: undefined })

        await Session.remove(session.id)
      },
    })
  })

  test("continue route returns 400 when session is busy", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const cont = spyOn(SessionPrompt, "continue_").mockRejectedValue(new Session.BusyError(session.id))
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/continue`, {
          method: "POST",
        })

        expect(res.status).toBe(400)
        expect(cont).toHaveBeenCalled()

        await Session.remove(session.id)
      },
    })
  })

  test("continue route returns 400 when nothing can continue", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const cont = spyOn(SessionPrompt, "continue_").mockRejectedValue(new Session.NothingToContinueError(session.id))
        const app = Server.Default().app

        const res = await app.request(`/session/${session.id}/continue`, {
          method: "POST",
        })

        expect(res.status).toBe(400)
        expect(cont).toHaveBeenCalled()

        await Session.remove(session.id)
      },
    })
  })
})

describe("continue logic", () => {
  test("throws when no assistant message exists", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        await user(session.id, "hello")

        const err = await SessionPrompt.continue_({ sessionID: session.id }).then(
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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        await assistant(session.id, usr.id, { finish: "stop" })

        const err = await SessionPrompt.continue_({ sessionID: session.id }).then(
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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        await assistant(session.id, usr.id, {
          finish: "stop",
          error: { name: "MessageAbortedError", data: { message: "cancelled" } },
        })

        const err = await SessionPrompt.continue_({ sessionID: session.id }).then(
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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        const ast = await assistant(session.id, usr.id, { finish: "stop" })

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

        const err = await SessionPrompt.continue_({ sessionID: session.id }).then(
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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello", "old")
        await assistant(session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          model: {
            providerID: ProviderID.make("test"),
            modelID: ModelID.make("new"),
          },
        }).catch(() => undefined)

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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        await assistant(session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
        }).catch(() => undefined)

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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello", "old")
        await assistant(session.id, usr.id, { finish: undefined })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
          model: {
            providerID: ProviderID.make("test"),
            modelID: ModelID.make("new"),
          },
        }).catch(() => undefined)

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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        await assistant(session.id, usr.id, { finish: undefined })

        const err = await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "general",
        }).then(
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
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const usr = await user(session.id, "hello")
        await assistant(session.id, usr.id, { finish: "stop" })

        await SessionPrompt.continue_({
          sessionID: session.id,
          agent: "plan",
        }).catch(() => undefined)

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
    const err = new Session.NothingToContinueError("test-session-id")
    expect(err).toBeInstanceOf(Error)
    expect(err.sessionID).toBe("test-session-id")
    expect(err.message).toBe("Nothing to continue in session test-session-id")
  })

  test("InvalidContinueAgentError exposes the agent", () => {
    const err = new Session.InvalidContinueAgentError("general")
    expect(err).toBeInstanceOf(Error)
    expect(err.agent).toBe("general")
    expect(err.message).toBe("Invalid continue agent: general")
  })
})
