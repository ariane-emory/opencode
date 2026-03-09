# Integration Branch: integration/2026-03-08-21-02

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | split-config-fixes | upstream | 0124f3f2e7 | MUST use only local copy, do NOT pull from upstream |
| ☑ | 2 | feat/base-one-rebrand | origin | 438aa56e79 | |
| ☑ | 3 | feat/sinister-quotes | origin | c7c6fa4a5e | Placeholders MUST be SINISTER_PLACEHOLDERS array |
| ☑ | 4 | feat/markdown-renderer | gignit | ba49b599a4 | |
| ☑ | 5 | feat/thinking-indicator-hidden | rcdailey | 2ac23aaf96 | |
| ☑ | 6 | fix/session-new-prompt-handoff | AksharP5 | a6272a2b90 | |
| ☑ | 7 | feat/session-grouping | origin | c3290272e6 | |
| ☑ | 8 | feat/session-bookmarks | origin | 907ee2299b | |
| ☑ | 9 | fix/dialog-datetime-alignment | origin | 292589d2ea | Merge immediately after feat/session-bookmarks |
| ☑ | 10 | feat/keybindable-commands | origin | d49a465e0b | |
| ☑ | 11 | feat/opencode-expand | origin | 92996787f8 | |
| ☐ | 12 | feat/automatic-list-continuation | origin | TBD | |
| ☐ | 13 | feat/continue-command | origin | TBD | |
| ☐ | 14 | feat/configurable-snapshot-lifespan | origin | TBD | |
| ☐ | 15 | feat/configurable-new-plan-mode | origin | TBD | |
| ☐ | 16 | feat/config-imports | origin | TBD | |
| ☐ | 17 | feat/canceled-prompts-in-history | origin | TBD | |
| ☐ | 18 | feat/permission-spinner | origin | TBD | |
| ☐ | 19 | feat/permission-indicator-in-sidebar | origin | TBD | |
| ☐ | 20 | fix/no-split-database | origin | TBD | |
| ☐ | 21 | fix/system-prompt-directories | origin | TBD | |
| ☐ | 22 | fix/remove-dot-true | origin | TBD | |
| ☐ | 23 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 24 | fix/persist-sidebar | origin | TBD | |
| ☐ | 25 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 26 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 27 | fix/config-package-json-pollution | origin | TBD | MUST be included to prevent package.json pollution |
| ☐ | 28 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 29 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 30 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 31 | refactor/shared-substitute | origin | TBD | |
| ☐ | 32 | feat/command-palette-consistecy | origin | TBD | MOVE items from Session to System category, do NOT duplicate |
| ☐ | 33 | feat/session-id-in-status | origin | TBD | |
| ☐ | 34 | feat/argument-range-syntax | origin | TBD | |
| ☐ | 35 | feat/default-arguments | origin | TBD | |
| ☐ | 36 | feat/edit-tool-description | origin | TBD | |
| ☐ | 37 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 38 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 39 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 40 | feat/configurable-message-and-session-limit | origin | TBD | |
| ☐ | 41 | feat/experimental-dont-cache-markdown | origin | TBD | |
| ☐ | 42 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 43 | feat/persist-sidebar-group-folding-states | origin | TBD | |
| ☐ | 44 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 45 | feat/shell-advice | origin | TBD | |
| ☐ | 46 | feat/elapsed-timer | origin | TBD | |
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
| ☐ | 61 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 62 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 63 | feat/ignored-commands | origin | TBD | |
| ☐ | 64 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 65 | feat/distinct-title-colour | origin | TBD | |
| ☐ | 66 | feat/tool-output-colour | origin | TBD | |
| ☐ | 67 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 68 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 69 | fix/restore-footer | origin | TBD | Restores the footer that was removed, must not be clobbered |

## Merge Log

| # | Branch | Commit | Merge Status | Notes |
|---|--------|--------|--------------|-------|
| 1 | split-config-fixes | 0124f3f2e7 | ✅ Merged | Resolved conflict in migrate-tui-config.ts |
| 2 | feat/base-one-rebrand | 438aa56e79 | ✅ Merged | Clean merge |
| 3 | feat/sinister-quotes | c7c6fa4a5e | ✅ Merged | Clean merge |
| 4 | feat/markdown-renderer | ba49b599a4 | ✅ Merged | Clean merge |
| 5 | feat/thinking-indicator-hidden | 2ac23aaf96 | ✅ Merged | Clean merge |
| 6 | fix/session-new-prompt-handoff | a6272a2b90 | ✅ Merged | Clean merge |
| 7 | feat/session-grouping | c3290272e6 | ✅ Merged | Clean merge |
| 8 | feat/session-bookmarks | 907ee2299b | ✅ Merged | Combined with session-grouping |
| 9 | fix/dialog-datetime-alignment | 292589d2ea | ✅ Merged | Clean merge |
| 10 | feat/keybindable-commands | d49a465e0b | ✅ Merged | Clean merge |
| 11 | feat/opencode-expand | 92996787f8 | ✅ Merged | Clean merge |
| feat/automatic-list-continuation | e7b48c0e9f | ✅ Merged | Clean merge |
