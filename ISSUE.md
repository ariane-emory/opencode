# `external_directory` permission patterns don't support relative paths

## Description

The `external_directory` permission does not work with relative path patterns, unlike other permissions like `edit`. This is inconsistent with the documented behavior and prevents users from configuring granular permissions for sibling directories.

## Steps to Reproduce

1. Create an `opencode.json` config with a relative path pattern for `external_directory`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "permission": {
    "external_directory": {
      "*": "ask",
      "../sibling-project-*": "allow"
    }
  }
}
```

2. Attempt to access a file in a sibling directory matching the pattern (e.g., `../sibling-project-foo/file.txt`)

3. OpenCode still prompts for permission instead of allowing access

## Expected Behavior

Based on the [permissions documentation](https://opencode.ai/docs/permissions/#granular-rules-object-syntax), relative path patterns should work for `external_directory` the same way they work for `edit`:

```json
{
  "permission": {
    "edit": {
      "*": "deny",
      "packages/web/src/content/docs/*.mdx": "allow"
    }
  }
}
```

Users would reasonably expect that `../sibling-project-*` would match sibling directories.

## Actual Behavior

The `external_directory` permission uses absolute paths internally (e.g., `/Users/foo/sibling-project-foo/*`), so a relative pattern like `../sibling-project-*` never matches.

## Root Cause

In `src/tool/external-directory.ts`, the `assertExternalDirectory` function constructs permission patterns using the absolute path:

```typescript
const parentDir = kind === "directory" ? target : path.dirname(target)
const glob = path.join(parentDir, "*")  // This is an absolute path
```

The `edit` permission, by contrast, uses relative paths:

```typescript
patterns: [path.relative(Instance.worktree, filePath)]
```

## Impact

- Users cannot pre-configure access to external directories using intuitive relative paths
- The behavior is inconsistent with other permission types
- Workaround requires knowing and specifying full absolute paths, which are machine-specific

## Environment

- OpenCode version: 1.x
- OS: All platforms
