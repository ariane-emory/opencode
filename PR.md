# fix: use relative paths for external_directory permission patterns

## Summary

This PR fixes the `external_directory` permission to use relative paths instead of absolute paths, making it consistent with other permissions like `edit` and allowing users to configure patterns like `../sibling-project-*`.

## Problem

The `external_directory` permission was using absolute paths internally, which meant user-configured relative path patterns would never match. For example:

```json
{
  "permission": {
    "external_directory": {
      "*": "ask",
      "../sibling-project-*": "allow"
    }
  }
}
```

This config would not work because when accessing `/Users/foo/sibling-project-bar/file.txt` from `/Users/foo/myproject`, the internal pattern would be `/Users/foo/sibling-project-bar/*`, which doesn't match `../sibling-project-*`.

## Solution

Changed `assertExternalDirectory` to compute relative paths using `path.relative(Instance.directory, parentDir)`:

```typescript
// Before
const parentDir = kind === "directory" ? target : path.dirname(target)
const glob = path.join(parentDir, "*")

// After  
const parentDir = kind === "directory" ? target : path.dirname(target)
const relativeParentDir = path.relative(Instance.directory, parentDir)
const glob = path.join(relativeParentDir, "*")
```

Now when accessing `/Users/foo/sibling-project-bar/file.txt` from `/Users/foo/myproject`, the pattern becomes `../sibling-project-bar/*`, which correctly matches `../sibling-project-*`.

## Rationale

1. **Consistency**: The `edit` permission already uses relative paths (`path.relative(Instance.worktree, filePath)`), so `external_directory` should behave the same way

2. **Principle of least surprise**: The documentation shows relative path examples, and users reasonably expect them to work

3. **Portability**: Relative paths work across machines, while absolute paths are machine-specific

4. **Minimal change**: The fix is a single-line addition that converts the path before building the glob pattern

## Changes

- `src/tool/external-directory.ts`: Use `path.relative()` to compute relative path patterns
- `test/tool/external-directory.test.ts`: Updated test expectations for relative paths
- `test/tool/read.test.ts`: Updated test to check for relative path format

## Testing

All existing tests pass with updated expectations:
- `test/tool/external-directory.test.ts` - 5 tests
- `test/tool/read.test.ts` - 26 tests
- `test/tool/bash.test.ts` - 12 tests (unchanged)
- `test/agent/agent.test.ts` - 34 tests

## Note

The `bash` tool has separate `external_directory` logic that still uses absolute paths. This can be addressed in a follow-up PR to keep this change tightly scoped.
