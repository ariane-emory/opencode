import { describe, expect, test } from "bun:test"
import { SetCurrentSessionTitleTool } from "../../src/tool/set-current-session-title"
import { Instance } from "../../src/project/instance"
import { Session } from "../../src/session"
import { tmpdir } from "../fixture/fixture"

describe("tool.set_current_session_title", () => {
  test("updates session title", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async () => {},
        }

        const result = await tool.execute({ title: "My Test Session" }, ctx)

        expect(result.title).toBe("My Test Session")
        expect(result.output).toContain("My Test Session")

        const updated = await Session.get(session.id)
        expect(updated.title).toBe("My Test Session")
      },
    })
  })

  test("rejects empty title", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async () => {},
        }

        await expect(tool.execute({ title: "" }, ctx)).rejects.toThrow()
      },
    })
  })

  test("rejects title exceeding 255 characters", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async () => {},
        }

        const longTitle = "a".repeat(256)
        await expect(tool.execute({ title: longTitle }, ctx)).rejects.toThrow()
      },
    })
  })

  test("accepts title with exactly 255 characters", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async () => {},
        }

        const maxTitle = "a".repeat(255)
        const result = await tool.execute({ title: maxTitle }, ctx)

        expect(result.title).toBe(maxTitle)
        const updated = await Session.get(session.id)
        expect(updated.title).toBe(maxTitle)
      },
    })
  })

  test("accepts single character title", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async () => {},
        }

        const result = await tool.execute({ title: "X" }, ctx)

        expect(result.title).toBe("X")
        const updated = await Session.get(session.id)
        expect(updated.title).toBe("X")
      },
    })
  })

  test("asks for permission", async () => {
    await using tmp = await tmpdir({ git: true })
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const session = await Session.create({})
        const tool = await SetCurrentSessionTitleTool.init()
        const requests: Array<{ permission: string }> = []
        const ctx = {
          sessionID: session.id,
          messageID: "",
          callID: "",
          agent: "build",
          abort: AbortSignal.any([]),
          messages: [],
          metadata: () => {},
          ask: async (req: { permission: string }) => {
            requests.push(req)
          },
        }

        await tool.execute({ title: "Test Title" }, ctx)

        expect(requests.length).toBe(1)
        expect(requests[0].permission).toBe("set_current_session_title")
      },
    })
  })
})
