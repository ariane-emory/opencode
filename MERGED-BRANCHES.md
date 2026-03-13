# Integration Branch: integration/2026-03-13-17-35

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | split-config-fixes | upstream | ba7217e31a | MUST use only local copy, do NOT pull from upstream |
| ☑ | 2 | feat/base-one-rebrand | origin | 0d70355b2c | Fixed duplicate declaration |
| ☑ | 3 | feat/sinister-quotes | origin | c60037c16f | Placeholders MUST be SINISTER_PLACEHOLDERS array |
| ☑ | 4 | feat/markdown-renderer | gignit | d0127e9d23 | |
| ☑ | 5 | feat/thinking-indicator-hidden | rcdailey | 6467fe92a4 | |
| ☑ | 6 | fix/session-new-prompt-handoff | AksharP5 | c43ddee3e6 | |
| ☑ | 7 | feat/session-grouping | origin | 5415ffcd17 | |
| ☑ | 8 | feat/session-bookmarks | origin | 564bae0610 | Combined with feat/session-grouping |
| ☑ | 9 | fix/dialog-datetime-alignment | origin | d1109e0472 | Merge immediately after feat/session-bookmarks |
| ☑ | 10 | feat/keybindable-commands | origin | f99a25f078 | Fixed merge conflict marker |
| ☑ | 11 | feat/automatic-list-continuation | origin | 9a95e4092f | |
| ☑ | 12 | feat/continue-command | origin | 74b4b0a200 | |
| ☑ | 13 | feat/configurable-snapshot-lifespan | origin | 3a20a27e3d | |
| ☑ | 14 | feat/configurable-new-plan-mode | origin | 70981be8a4 | |
| ☑ | 15 | feat/config-imports | origin | af377a4012 | |
| ☑ | 16 | feat/canceled-prompts-in-history | origin | f75ea0d06a | Conflict resolved |
| ☑ | 17 | feat/permission-spinner | origin | 0a8f76bbb2 | |
| ☑ | 18 | feat/permission-indicator-in-sidebar | origin | 564e6bc456 | |
| ☑ | 19 | feat/opencode-expand | origin | 86e6fa2964 | Conflict resolved |
| ☑ | 20 | feat/argument-range-syntax | origin | e09a3c2c4c | Conflicts resolved, key fix for swallowing |
| ☐ | 21 | feat/default-arguments | origin | TBD | Don't reintroduce swallowing behaviour |
| ☐ | 22 | fix/preserve-quotes-in-arguments | origin | TBD | |
| ☐ | 23 | fix/history-navigation-key-commands | origin | TBD | |
| ☐ | 24 | fix/build-with-short-version | origin | TBD | Auto uses short timestamp for integration branches |
| ☐ | 25 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 26 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 27 | fix/config-package-json-pollution | origin | TBD | MUST include to prevent package.json pollution |
| ☐ | 28 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 29 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 30 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 31 | fix/persist-sidebar | origin | TBD | |
| ☐ | 32 | feat/command-palette-consistecy | origin | TBD | MOVE items from Session to System category |
| ☐ | 33 | refactor/shared-substitute | origin | TBD | |
| ☐ | 34 | feat/session-id-in-status | origin | TBD | |
| ☐ | 35 | feat/edit-tool-description | origin | TBD | |
| ☐ | 36 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 37 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 38 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 39 | feat/configurable-message-and-session-limit | origin | TBD | |
| ☐ | 40 | feat/experimental-dont-cache-markdown | origin | TBD | |
| ☐ | 41 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 42 | feat/persist-sidebar-group-folding-states | origin | TBD | |
| ☐ | 43 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 44 | feat/shell-advice | origin | TBD | |
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
| ☐ | 57 | feat/improve-bash-tool-git-advice | origin | TBD | |
| ☐ | 58 | feat/alphabetical-message-modal | origin | TBD | |
| ☐ | 59 | feat/toggle-sidebar-scrollbar | origin | TBD | |
| ☐ | 60 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD | |
| ☐ | 61 | feat/configurable-maximum-prompt-input-size | origin | TBD | |
| ☐ | 62 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 63 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 64 | feat/clickable-status-mcps | origin | TBD | |
| ☐ | 65 | feat/ignored-commands | origin | TBD | |
| ☐ | 66 | fix/no-split-database | origin | TBD | |
| ☐ | 67 | feat/elapsed-timer | origin | TBD | |
| ☐ | 68 | fix/system-prompt-directories | origin | TBD | |
| ☐ | 69 | fix/remove-dot-true | origin | TBD | |
| ☐ | 70 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 71 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 72 | feat/distinct-title-colour | origin | TBD | |
| ☐ | 73 | feat/tool-output-colour | origin | TBD | |
| ☐ | 74 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 75 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 76 | fix/restore-footer | origin | TBD | Restores footer, must not be clobbered |

## Merge Log

| # | Branch | Merged At | Commit | Notes |
|---|--------|-----------|--------|-------|
| 1 | split-config-fixes | 2026-03-13 | ba7217e31a | Resolved conflict in migrate-tui-config.ts |
| 2 | feat/base-one-rebrand | 2026-03-13 | 0d70355b2c | Fixed duplicate OPENCODE_DISABLE_FILETIME_CHECK declaration |
| 3 | feat/sinister-quotes | 2026-03-13 | c60037c16f | Clean merge, verified SINISTER_PLACEHOLDERS array |
| 4 | feat/markdown-renderer | 2026-03-13 | d0127e9d23 | Clean merge from gignit |
| 5 | feat/thinking-indicator-hidden | 2026-03-13 | 6467fe92a4 | Clean merge from rcdailey |
| 6 | fix/session-new-prompt-handoff | 2026-03-13 | c43ddee3e6 | Clean merge from AksharP5 |
| 7 | feat/session-grouping | 2026-03-13 | 5415ffcd17 | Clean merge |
| 8 | feat/session-bookmarks | 2026-03-13 | 564bae0610 | Combined session-grouping and bookmarks features |
| 9 | fix/dialog-datetime-alignment | 2026-03-13 | d1109e0472 | Clean merge |
| 10 | feat/keybindable-commands | 2026-03-13 | f99a25f078 | Fixed merge conflict marker |
| 11 | feat/automatic-list-continuation | 2026-03-13 | 9a95e4092f | Clean merge |
| 12 | feat/continue-command | 2026-03-13 | 74b4b0a200 | Clean merge |
| 13 | feat/configurable-snapshot-lifespan | 2026-03-13 | 3a20a27e3d | Clean merge |
| 14 | feat/configurable-new-plan-mode | 2026-03-13 | 70981be8a4 | Clean merge |
| 15 | feat/config-imports | 2026-03-13 | af377a4012 | Clean merge |
| 16 | feat/canceled-prompts-in-history | 2026-03-13 | f75ea0d06a | Conflict in app.tsx resolved |
| 17 | feat/permission-spinner | 2026-03-13 | 0a8f76bbb2 | Clean merge |
| 18 | feat/permission-indicator-in-sidebar | 2026-03-13 | 564e6bc456 | Clean merge |
| 19 | feat/opencode-expand | 2026-03-13 | 86e6fa2964 | Conflict in prompt.ts resolved |
| 20 | feat/argument-range-syntax | 2026-03-13 | e09a3c2c4c | Multiple conflicts resolved, key feature |