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
| ☐ | 13 | feat/configurable-snapshot-lifespan | origin | TBD | |
| ☐ | 14 | feat/configurable-new-plan-mode | origin | TBD | |
| ☐ | 15 | feat/canceled-prompts-in-history | origin | TBD | Careful not to clobber; MUST add new item to command palette |
| ☐ | 16 | feat/permission-spinner | origin | TBD | |
| ☐ | 17 | feat/permission-indicator-in-sidebar | origin | TBD | |
| ☐ | 18 | feat/opencode-expand | origin | TBD | |
| ☐ | 19 | feat/argument-range-syntax | origin | TBD | |
| ☐ | 20 | feat/default-arguments | origin | TBD | Don't reintroduce swallowing behaviour from feat/argument-range-syntax |
| ☐ | 21 | fix/preserve-quotes-in-arguments | origin | TBD | |
| ☐ | 22 | fix/history-navigation-key-commands | origin | TBD | |
| ☐ | 23 | fix/build-with-short-version | origin | TBD | Auto uses short timestamp for integration branches |
| ☐ | 24 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 25 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 26 | fix/config-package-json-pollution | origin | TBD | MUST be included to prevent package.json pollution |
| ☐ | 27 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 28 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 29 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 30 | fix/persist-sidebar | origin | TBD | MUST NOT return to auto state after show/hide; MUST NOT be clobbered |
| ☐ | 31 | feat/command-palette-consistency | origin | TBD | MOVE items from Session to System; NO duplication; handle fix/persist-sidebar logic |
| ☐ | 32 | refactor/shared-substitute | origin | TBD | |
| ☐ | 33 | feat/session-id-in-status | origin | TBD | |
| ☐ | 34 | feat/edit-tool-description | origin | TBD | |
| ☐ | 35 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 36 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 37 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 38 | feat/configurable-message-and-session-limit | origin | TBD | experimental._message_limit and experimental.session_list_limit accept "none" or positive integers |
| ☐ | 39 | feat/experimental-dont-cache-markdown | origin | TBD | |
| ☐ | 40 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 41 | feat/persist-sidebar-group-folding-states | origin | TBD | |
| ☐ | 42 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 43 | feat/shell-advice | origin | TBD | Combine with feat/improve-bash-tool-git-advice |
| ☐ | 44 | feat/improve-bash-tool-git-advice | origin | TBD | Combine with feat/shell-advice |
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

