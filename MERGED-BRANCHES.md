# Integration Branch Merge Log

**Integration Branch:** `integration/2026-03-05-03-10`
**Created:** 2026-03-05

## Merged Branches

| Branch | Remote | Commit | Status | Date |
|--------|--------|--------|--------|------|
| split-config-fixes | upstream | a295e66b54 | ✅ Merged | 2026-03-05 |
| fix/system-prompt-directories | origin | 765ba3892c | ✅ Merged | 2026-03-05 |
| fix/remove-dot-true | origin | f639345630 | ✅ Merged | 2026-03-05 |
| fix/rfc2119-question-tool | origin | 052a3d2b6e | ✅ Merged | 2026-03-05 |
| fix/restore-footer | origin | becf0f7c06 | ✅ Merged | 2026-03-05 |
| fix/persist-sidebar | origin | d734627278 | ✅ Merged | 2026-03-05 |
| fix/autocompletion-filtered-order | origin | bd0c110737 | ✅ Merged | 2026-03-05 |
| fix/modal-menus-filtered-order | origin | b332b21949 | ✅ Merged | 2026-03-05 |

## Merge Log

### 1. split-config-fixes (upstream)
- **Commit:** a295e66b54
- **Message:** carry over legacy custom tui config
- **Files Changed:**
  - packages/opencode/src/config/migrate-tui-config.ts
  - packages/opencode/src/config/tui.ts
  - packages/opencode/test/config/tui.test.ts
- **Status:** ✅ Successfully merged with no conflicts
- **Tests:** ✅ All tests passed

### 2. fix/system-prompt-directories (origin)
- **Commit:** 765ba3892c
- **Message:** fix: system prompt directories
- **Files Changed:**
  - packages/opencode/src/session/system.ts
- **Status:** ✅ Successfully merged with no conflicts

### 3. fix/remove-dot-true (origin)
- **Commit:** f639345630
- **Message:** Merge branch 'dev' into fix/remove-dot-true
- **Files Changed:**
  - packages/opencode/src/config/config.ts
  - packages/opencode/src/skill/skill.ts
  - packages/opencode/src/tool/registry.ts
- **Status:** ✅ Successfully merged with no conflicts

### 4. fix/rfc2119-question-tool (origin)
- **Commit:** 052a3d2b6e
- **Message:** Merge branch 'dev' into fix/rfc2119-question-tool
- **Files Changed:**
  - packages/opencode/src/tool/question.txt
- **Status:** ✅ Successfully merged with no conflicts

### 5. fix/restore-footer (origin)
- **Commit:** becf0f7c06
- **Message:** Merge branch 'dev' into fix/restore-footer
- **Files Changed:**
  - packages/opencode/src/cli/cmd/tui/routes/session/index.tsx
- **Status:** ✅ Successfully merged with no conflicts

### 6. fix/persist-sidebar (origin)
- **Commit:** d734627278
- **Message:** Merge branch 'dev' into fix/persist-sidebar
- **Files Changed:**
  - packages/opencode/src/cli/cmd/tui/context/kv.tsx
  - packages/opencode/src/cli/cmd/tui/routes/session/index.tsx
- **Status:** ✅ Successfully merged with no conflicts

### 7. fix/autocompletion-filtered-order (origin)
- **Commit:** bd0c110737
- **Message:** feat: Apply smart sorting to autocomplete
- **Files Changed:**
  - packages/app/src/components/prompt-input.tsx
  - packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx
  - packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx
  - packages/opencode/src/util/smart-sort.ts (new)
  - packages/ui/src/hooks/use-filtered-list.tsx
- **Status:** ✅ Successfully merged with no conflicts

### 8. fix/modal-menus-filtered-order (origin)
- **Commit:** b332b21949
- **Message:** Revert: Remove out-of-scope autocompletion changes
- **Files Changed:**
  - packages/opencode/src/cli/cmd/tui/component/prompt/autocomplete.tsx
  - packages/opencode/src/cli/cmd/tui/ui/dialog-select.tsx
  - packages/ui/src/hooks/use-filtered-list.tsx
- **Status:** ✅ Merged with conflicts resolved
- **Conflicts:** Resolved in 3 files, kept smartCompare from integration branch
