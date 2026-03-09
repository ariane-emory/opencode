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
| ☑ | 32 | feat/command-palette-consistecy | origin | cc5acbbcce | MOVE items from Session to System category, do NOT duplicate |
| ☐ | 33 | feat/session-id-in-status | origin | TBD | |
| ☑ | 34 | feat/argument-range-syntax | origin | ca389f253b | |
| ☑ | 35 | feat/default-arguments | origin | 824ac6f373 | |
| ☐ | 36 | feat/edit-tool-description | origin | TBD | |
| ☐ | 37 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 38 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 39 | feat/global-compaction-threshold | origin | TBD | |
| ☑ | 40 | feat/configurable-message-and-session-limit | origin | fe1b41cdc8 | |
| ☐ | 41 | feat/experimental-dont-cache-markdown | origin | TBD | |
| ☑ | 42 | feat/jsonc-user-themes | origin | a71660670b | |
| ☐ | 43 | feat/persist-sidebar-group-folding-states | origin | TBD | |
| ☑ | 44 | feat/persistant-sidebar-overlay-behaviour | origin | a34fb99394 | |
| ☑ | 45 | feat/shell-advice | origin | 2c9a233dbd | |
| ☑ | 46 | feat/elapsed-timer | origin | 61fdaadee9 | |
| ☑ | 47 | feat/set-session-title | origin | d6bd74ee8a | |
| ☑ | 48 | feat/get-session-title | origin | 6c19c6b7ce | |
| ☑ | 49 | feat/no-disabled-lsps-in-sidebar | origin | 9d14e97b85 | |
| ☑ | 50 | feat/agent-timestamps | origin | 0e2fe6c943 | |
| ☑ | 51 | feat/rewind-modal-option | origin | 849db18407 | |
| ☑ | 52 | feat/alphabetize-command-palette-groups | origin | 555453d049 | |
| ☑ | 53 | feat/taller-dialogs | origin | 1603c9bf0f | |
| ☑ | 54 | feat/add-arianes-themes | origin | df67d8bad7 | |
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
| feat/continue-command | 2068ddff5b | ✅ Merged | Clean merge |
| feat/configurable-snapshot-lifespan | 9815bdd62f | ✅ Merged | Clean merge |
| feat/configurable-new-plan-mode | e6fccda8d0 | ✅ Merged | Resolved import conflict |
| feat/config-imports | 158cc8f018 | ✅ Merged | Clean merge |
| feat/canceled-prompts-in-history | 60e9174cc9 | ✅ Merged | Resolved app.tsx conflict |
| feat/permission-spinner | 09be54da41 | ✅ Merged | Clean merge |
| feat/permission-indicator-in-sidebar | 91d4278f67 | ✅ Merged | Clean merge |
| fix/no-split-database | 2e90be3d73 | ✅ Merged | Clean merge |
| fix/system-prompt-directories | d462563668 | ✅ Merged | Clean merge |
| fix/remove-dot-true | 8c12e82de4 | ✅ Merged | Clean merge |
| fix/rfc2119-question-tool | 4970fec80b | ✅ Merged | Clean merge |
| fix/persist-sidebar | c0c66cd21b | ✅ Merged | Resolved multiple conflicts in prompt/index.tsx |
| fix/autocompletion-filtered-order | 858e7274c8 | ✅ Merged | Resolved multiple conflicts in prompt/index.tsx |
| fix/modal-menus-filtered-order | b7712432c0 | ✅ Merged | Resolved conflicts in 3 files |
| fix/config-package-json-pollution | 04153c1855 | ✅ Merged | Clean merge |
| fix/session-list-viewport-jumping | 9b383e6912 | ✅ Merged | Clean merge |
| fix/merging-multiple-configs | 4263b5fede | ✅ Merged | Resolved config.ts conflict |
| fix/markdown-codeblock-theme-property | d6ad731d44 | ✅ Merged | Clean merge |
| refactor/shared-substitute | 90750a4faa | ✅ Merged | Clean merge |
| feat/command-palette-consistecy | cc5acbbcce | ✅ Merged | Resolved conflicts in app.tsx and session/index.tsx |
| feat/session-id-in-status | 603e7c0004 | ✅ Merged | Clean merge |
| 34 | feat/argument-range-syntax | ca389f253b | ✅ Merged | Combined range syntax with backward compatible swallowing |
| 35 | feat/default-arguments | 824ac6f373 | ✅ Merged | Combined range syntax with default arguments; implemented swallowing for default arguments |
| feat/edit-tool-description | a42a1489cf | ✅ Merged | Clean merge |
| feat/opeoginni--display-message-tps | 493526c2f3 | ✅ Merged | Clean merge |
| feat/kv-diff-style-clean | 8381302e8e | ✅ Merged | Clean merge |
| feat/global-compaction-threshold | 70f74a2ebb | ✅ Merged | Clean merge |
| 40 | feat/configurable-message-and-session-limit | fe1b41cdc8 | ✅ Merged | Resolved conflicts in dialog-session-list.tsx, config.ts, types.gen.ts |
| feat/experimental-dont-cache-markdown | 8c1f10756b | ✅ Merged | Clean merge |
| 42 | feat/jsonc-user-themes | a71660670b | ✅ Merged | Resolved config.ts conflict; fixed type error in registry.test.ts |
| feat/persist-sidebar-group-folding-states | 92f262db99 | ✅ Merged | Clean merge |
| 44 | feat/persistant-sidebar-overlay-behaviour | a34fb99394 | ✅ Merged | Resolved multiple conflicts in app.tsx and index.tsx |
| 45 | feat/shell-advice | 2c9a233dbd | ✅ Merged | Clean merge |
| 46 | feat/elapsed-timer | 61fdaadee9 | ✅ Merged | Clean merge |
| 47 | feat/set-session-title | d6bd74ee8a | ✅ Merged | Resolved duplicate update implementation in session/index.ts |
| 48 | feat/get-session-title | 6c19c6b7ce | ✅ Merged | Resolved import conflict in tool/registry.ts |
| 49 | feat/no-disabled-lsps-in-sidebar | 9d14e97b85 | ✅ Merged | Resolved conflict in sidebar.tsx and preserved expansion persistence |
| 50 | feat/agent-timestamps | 0e2fe6c943 | ✅ Merged | Resolved contentWidth conflict in session/index.tsx |
| 51 | feat/rewind-modal-option | 849db18407 | ✅ Merged | Resolved openapi.json conflict by regenerating the SDK |
| 52 | feat/alphabetize-command-palette-groups | 555453d049 | ✅ Merged | Resolved conflict in dialog-select.tsx |
| 53 | feat/taller-dialogs | 1603c9bf0f | ✅ Merged | Clean merge |
| 54 | feat/add-arianes-themes | df67d8bad7 | ✅ Merged | Clean merge |
