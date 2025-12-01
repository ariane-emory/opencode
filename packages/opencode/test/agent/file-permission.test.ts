import { test, expect } from "bun:test"
import { Agent } from "../../src/agent/agent"

test("resolveFilePermission returns string permission directly", () => {
  expect(Agent.resolveFilePermission("allow", "/path/to/file.md")).toBe("allow")
  expect(Agent.resolveFilePermission("deny", "/path/to/file.ts")).toBe("deny")
  expect(Agent.resolveFilePermission("ask", "/path/to/file.js")).toBe("ask")
})

test("resolveFilePermission matches glob patterns", () => {
  const permission = {
    "*.md": "allow" as const,
    "*": "deny" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/docs/README.md")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("deny")
  expect(Agent.resolveFilePermission(permission, "/config.json")).toBe("deny")
})

test("resolveFilePermission uses first matching pattern", () => {
  const permission = {
    "*.md": "deny" as const,
    "*": "allow" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/docs/README.md")).toBe("deny")
  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("allow")
})

test("resolveFilePermission matches based on basename", () => {
  const permission = {
    "*.test.ts": "ask" as const,
    "*.ts": "allow" as const,
    "*": "deny" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/deep/path/to/file.test.ts")).toBe("ask")
  expect(Agent.resolveFilePermission(permission, "/src/module/index.ts")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/README.md")).toBe("deny")
})

test("resolveFilePermission defaults to allow when no pattern matches", () => {
  const permission = {
    "*.md": "deny" as const,
    "*.txt": "ask" as const,
  }

  // .ts file doesn't match any pattern, should default to allow
  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("allow")
})

test("resolveFilePermission handles wildcard patterns", () => {
  const permission = {
    "test*": "ask" as const,
    "*.spec.ts": "ask" as const,
    "*": "allow" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/src/test-utils.ts")).toBe("ask")
  expect(Agent.resolveFilePermission(permission, "/src/module.spec.ts")).toBe("ask")
  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("allow")
})

test("resolveFilePermission documentation writer scenario", () => {
  // Documentation writer: can only write markdown files
  const permission = {
    "*.md": "allow" as const,
    "*": "deny" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/docs/API.md")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/README.md")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("deny")
  expect(Agent.resolveFilePermission(permission, "/config.json")).toBe("deny")
})

test("resolveFilePermission code writer scenario", () => {
  // Code writer: can write code but not documentation
  const permission = {
    "*.md": "deny" as const,
    "*": "allow" as const,
  }

  expect(Agent.resolveFilePermission(permission, "/src/index.ts")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/config.json")).toBe("allow")
  expect(Agent.resolveFilePermission(permission, "/README.md")).toBe("deny")
  expect(Agent.resolveFilePermission(permission, "/docs/guide.md")).toBe("deny")
})
