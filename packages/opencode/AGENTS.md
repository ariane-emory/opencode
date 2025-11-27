# opencode agent guidelines

## Build/Test Commands

- **Install**: `bun install`
- **Run**: `bun run index.ts`
- **Typecheck**: `bun run typecheck` (npm run typecheck)
- **Test**: `bun test` (runs all tests)
- **Single test**: `bun test test/tool/tool.test.ts` (specific test file)

## Code Style

- **Runtime**: Bun with TypeScript ESM modules
- **Imports**: Use relative imports for local modules, named imports preferred
- **Types**: Zod schemas for validation, TypeScript interfaces for structure
- **Naming**: camelCase for variables/functions, PascalCase for classes/namespaces
- **Error handling**: Use Result patterns, avoid throwing exceptions in tools
- **File structure**: Namespace-based organization (e.g., `Tool.define()`, `Session.create()`)

## Architecture

- **Tools**: Implement `Tool.Info` interface with `execute()` method
- **Context**: Pass `sessionID` in tool context, use `App.provide()` for DI
- **Validation**: All inputs validated with Zod schemas
- **Logging**: Use `Log.create({ service: "name" })` pattern
- **Storage**: Use `Storage` namespace for persistence
- **API Client**: Go TUI communicates with TypeScript server via stainless SDK. When adding/modifying server endpoints in `packages/opencode/src/server/server.ts`, ask the user to generate a new client SDK to proceed with client-side changes.

## Agent Permissions

Agents can have granular file-based permissions using glob patterns for `read`, `write`, and `edit` operations:

### Simple String Permissions (Backward Compatible)

```json
{
  "agent": {
    "my-agent": {
      "permission": {
        "read": "allow",
        "write": "allow",
        "edit": "allow"
      }
    }
  }
}
```

### Glob Pattern Permissions

Use glob patterns to restrict which files an agent can access:

```json
{
  "agent": {
    "doc-writer": {
      "description": "An agent that can only edit documentation",
      "permission": {
        "read": "allow",
        "write": { "*.md": "allow", "*": "deny" },
        "edit": { "*.md": "allow", "*": "deny" }
      }
    },
    "code-writer": {
      "description": "An agent that can edit code but not docs",
      "permission": {
        "read": "allow",
        "write": { "*.md": "deny", "*": "allow" },
        "edit": { "*.md": "deny", "*": "allow" }
      }
    }
  }
}
```

### Permission Behavior

- **Pattern Matching**: Patterns match against the file basename (e.g., `*.md` matches `README.md`, `/docs/guide.md`)
- **First Match Wins**: The first matching pattern determines the permission (patterns are sorted by length, shortest first)
- **Default Behavior**: If no pattern matches, defaults to `"allow"` for backward compatibility
- **Wildcard Support**: Use `*` for wildcard matching (e.g., `test*.ts`, `*.spec.js`)

### Permission Values

- `"allow"`: Operation is permitted without prompting
- `"deny"`: Operation is blocked with an error
- `"ask"`: User is prompted to allow or deny the operation

### Example Use Cases

**Documentation Writer**: Only edits markdown files

```json
{
  "permission": {
    "write": { "*.md": "allow", "*": "deny" },
    "edit": { "*.md": "allow", "*": "deny" },
    "read": "allow"
  }
}
```

**Test File Editor**: Only edits test files

```json
{
  "permission": {
    "write": { "*.test.ts": "allow", "*.spec.ts": "allow", "*": "deny" },
    "edit": { "*.test.ts": "allow", "*.spec.ts": "allow", "*": "deny" },
    "read": "allow"
  }
}
```

**Read-Only Agent**: Can read but not modify

```json
{
  "permission": {
    "read": "allow",
    "write": { "*": "deny" },
    "edit": { "*": "deny" }
  }
}
```
