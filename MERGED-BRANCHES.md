# Integration Branch: integration/2026-03-24-12-05

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | split-config-fixes | upstream | b8ce3795cd | MUST use only local copy, do NOT pull from upstream - Conflict resolved: combined payload variable with Filesystem.write |
| ☑ | 2 | feat/base-one-rebrand | origin | b75c1f76ed | Merged cleanly, no conflicts |
| ☑ | 3 | feat/sinister-quotes | origin | 7f10644aa5 | Placeholders MUST be SINISTER_PLACEHOLDERS array - Verified SINISTER_PLACEHOLDERS array exists |
| ☑ | 4 | feat/markdown-renderer | gignit | 6a861ff48e | Fixed type error: changed theme.markdownText to tui.theme.markdownText |
| ☑ | 5 | feat/thinking-indicator-hidden | rcdailey | 6b9b2c579f | Merged cleanly, no conflicts |
| ☑ | 6 | fix/session-new-prompt-handoff | AksharP5 | 9cb547ed48 | Merged cleanly, no conflicts |
| ☑ | 7 | feat/session-grouping | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 8 | feat/session-bookmarks | origin | TBD | Conflict: Combined with session-grouping - bookmarks show first, then grouped sessions, then ungrouped |
| ☑ | 9 | fix/dialog-datetime-alignment | origin | TBD | Merged cleanly after session-bookmarks |
| ☑ | 10 | feat/keybindable-commands | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 11 | feat/automatic-list-continuation | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 12 | feat/continue-command | origin | TBD | Merged cleanly but had type errors - Fixed: Use branded types for SessionID, ProviderID, ModelID |
| ☑ | 13 | feat/configurable-snapshot-lifespan | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 14 | feat/configurable-new-plan-mode | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 15 | feat/canceled-prompts-in-history | origin | TBD | Conflict: Kept both command palette items (markdown toggle + clear prompt history) |
| ☑ | 16 | feat/permission-spinner | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 17 | feat/permission-indicator-in-sidebar | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 18 | feat/opencode-expand | origin | TBD | Conflict: Kept both imports (Config + substituteArguments); Fixed leftover conflict marker in bash.ts |
| ☑ | 19 | feat/argument-range-syntax | origin | TBD | Conflict: Extended placeholder support with ${N}, ${N..M}, ${N..}, ${..M}, ${..} syntax |
| ☑ | 20 | feat/default-arguments | origin | TBD | Merged cleanly as part of batch |
| ☑ | 21 | fix/preserve-quotes-in-arguments | origin | TBD | Merged cleanly as part of batch |
| ☑ | 22 | fix/history-navigation-key-commands | origin | TBD | Merged cleanly as part of batch |
| ☑ | 23 | fix/build-with-short-version | origin | TBD | Merged cleanly as part of batch |
| ☑ | 24 | fix/autocompletion-filtered-order | origin | TBD | Merged cleanly as part of batch |
| ☑ | 25 | fix/modal-menus-filtered-order | origin | TBD | Conflict: Resolved 3-way conflicts in prompt/index.tsx - kept SINISTER_PLACEHOLDERS import, listContinuation code, and placeholder resize effect |
| ☑ | 26 | fix/config-package-json-pollution | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 27 | fix/session-list-viewport-jumping | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 28 | fix/merging-multiple-configs | origin | TBD | Conflict: Combined brand fallback comment with RawInfo variable declaration |
| ☑ | 29 | fix/markdown-codeblock-theme-property | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 30 | fix/persist-sidebar | origin | TBD | Conflict: Resolved conflicts in prompt/index.tsx; MUST NOT return to auto state after show/hide |
| ☑ | 31 | feat/command-palette-consistency | origin | TBD | Conflict: Moved items from Session to System category; Resolved app.tsx and session/index.tsx conflicts; Preserved markdown_all_messages and clear_prompt_save_history toggles |
| ☑ | 32 | refactor/shared-substitute | origin | TBD | Merged cleanly (already integrated), resolved leftover merge conflicts from branch 31 |
| ☑ | 33 | feat/session-id-in-status | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 34 | feat/edit-tool-description | origin | TBD | Merged cleanly, no conflicts |
| ☑ | 35 | feat/opeoginni--display-message-tps | origin | TBD | Merged cleanly, adds message TPS display to status |
| ☑ | 36 | feat/kv-diff-style-clean | origin | TBD | Merged cleanly, fixed duplicate useKV import |
| ☑ | 37 | feat/global-compaction-threshold | origin | TBD | Merged cleanly, adds configurable compaction threshold |
| ☑ | 38 | feat/configurable-message-and-session-limit | origin | TBD | Conflict: Combined session grouping/bookmarks with session list limit; kept plan_mode from HEAD + messages_limit/session_list_limit from branch |
| ☑ | 39 | feat/experimental-dont-cache-markdown | origin | TBD | Merged cleanly; Fixed test to include cache_command_markdown_files property |
| ☑ | 40 | feat/jsonc-user-themes | origin | TBD | Conflict: Combined experimentalPlanMode() from HEAD with loadThemeFile() from branch |
| ☑ | 41 | feat/persist-sidebar-group-folding-states | origin | TBD | Merged cleanly, persists sidebar group folding states |
| ☑ | 42 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | Conflict: Added sidebar_overlay toggle to command palette; Removed conflict markers from branch |
| ☑ | 43 | feat/shell-advice | origin | TBD | Merged cleanly, adds shell advice features |
| ☑ | 44 | feat/improve-bash-tool-git-advice | origin | TBD | Conflict: Improved bash.txt PR creation instructions; Combined with feat/shell-advice |
| ☐ | 45 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 46 | feat/session-child-toggle-key | origin | TBD | |
| ☐ | 47 | feat/set-session-title | origin | TBD | |
| ☐ | 48 | feat/get-session-title | origin | TBD | |
| ☐ | 49 | feat/no-disabled-lsps-in-sidebar | origin | TBD | |
| ☐ | 50 | feat/agent-timestamps | origin | TBD | |
| ☐ | 51 | feat/rewind-modal-option | origin | TBD | |
| ☐ | 52 | feat/alphabetize-command-palette-groups | origin | TBD | |
| ☐ | 53 | feat/taller-dialogs | origin | TBD | |
| ☐ | 54 | feat/add-arianes-themes | origin | TBD | |
| ☐ | 55 | feat/aspiers--readline-additions | origin | TBD | |
| ☐ | 56 | feat/sidebar-clock | origin | TBD | |
| ☐ | 57 | feat/alphabetical-message-modal | origin | TBD | |
| ☐ | 58 | feat/toggle-sidebar-scrollbar | origin | TBD | |
| ☐ | 59 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD | |
| ☐ | 60 | feat/configurable-maximum-prompt-input-size | origin | TBD | |
| ☐ | 61 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 62 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 63 | feat/clickable-status-mcps | origin | TBD | |
| ☐ | 64 | feat/ignored-commands | origin | TBD | |
| ☐ | 65 | feat/dialogue-background-overlay-setting | origin | TBD | |
| ☐ | 66 | fix/no-split-database | origin | TBD | |
| ☐ | 67 | feat/elapsed-timer | origin | TBD | |
| ☐ | 68 | fix/system-prompt-directories | origin | TBD | |
| ☐ | 69 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 70 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 71 | feat/distinct-title-colour | origin | TBD | Make compatible with feat/session-grouping title formatting |
| ☐ | 72 | feat/tool-output-colour | origin | TBD | |
| ☐ | 73 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 74 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 75 | fix/escape-from-status | origin | TBD | |
| ☐ | 76 | fix/restore-footer | origin | TBD | MUST NOT be clobbered; restores removed footer |
| ☐ | 77 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 78 | feat/remove-canned-jokes | origin | TBD | |

## Merge Log

### Initial Setup
- Created integration branch: integration/2026-03-24-12-05
- Base: dev branch
- Created MERGED-BRANCHES.md checklist

### Branch 1: split-config-fixes
- Commit: b8ce3795cd
- Conflict in packages/opencode/src/config/migrate-tui-config.ts
- Resolution: Combined payload variable definition from split-config-fixes with Filesystem.write from HEAD

### Branch 2: feat/base-one-rebrand
- Commit: b75c1f76ed
- Merged cleanly, no conflicts

### Branch 3: feat/sinister-quotes
- Commit: 7f10644aa5
- Merged cleanly, no conflicts
- Verified SINISTER_PLACEHOLDERS array exists in packages/ui/src/constants/placeholders.ts

### Branch 4: feat/markdown-renderer
- Commit: 6a861ff48e
- Merged cleanly but had type error
- Fix: Changed `theme.markdownText` and `theme.background` to `tui.theme.markdownText` and `tui.theme.background` in session/index.tsx

### Branch 5: feat/thinking-indicator-hidden
- Commit: 6b9b2c579f
- Merged cleanly, no conflicts

### Branch 6: fix/session-new-prompt-handoff
- Commit: 9cb547ed48
- Merged cleanly, no conflicts

### Branch 7: feat/session-grouping
- Merged cleanly, no conflicts

### Branch 8: feat/session-bookmarks
- Conflict in packages/opencode/src/cli/cmd/tui/component/dialog-session-list.tsx
- Conflict in packages/opencode/src/util/locale.ts
- Resolution: Combined session-grouping and session-bookmarks features:
  - Bookmarks show first in the list with "Bookmarks:" category
  - Then grouped sessions (with "|" in title) sorted by group name
  - Then ungrouped sessions sorted by date
  - Used bookmark version of shortDateTime format

### Branch 9: fix/dialog-datetime-alignment
- Merged cleanly after session-bookmarks

### Branch 10: feat/keybindable-commands
- Merged cleanly, no conflicts

### Branch 11: feat/automatic-list-continuation
- Merged cleanly, no conflicts

### Branch 12: feat/continue-command
- Merged cleanly but had type errors
- Fixed type errors:
  - src/server/routes/session.ts: Use SessionID.make() to convert string param to branded type
  - src/server/routes/session.ts: Use ProviderID.zod and ModelID.zod in route validator
  - src/session/prompt.ts: Use ProviderID.zod and ModelID.zod in LoopInput schema

### Branch 13: feat/configurable-snapshot-lifespan
- Merged cleanly, no conflicts

### Branch 14: feat/configurable-new-plan-mode
- Merged cleanly, no conflicts

### Branch 15: feat/canceled-prompts-in-history
- Conflict in packages/opencode/src/cli/cmd/tui/app.tsx
- Resolution: Kept both command palette items - markdown toggle and clear prompt history toggle

### Branch 16: feat/permission-spinner
- Merged cleanly, no conflicts

### Branch 17: feat/permission-indicator-in-sidebar
- Merged cleanly, no conflicts

### Branch 18: feat/opencode-expand
- Conflict in packages/opencode/src/session/prompt.ts (import)
- Conflict in packages/opencode/src/tool/bash.ts (leftover marker)
- Resolution: Kept both imports (Config and substituteArguments); Removed leftover conflict marker

