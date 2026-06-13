# Integration Branch: integration/2026-06-07-00-00

## Merge Checklist

| Status | # | Branch Name | PR | Commit Hash | Description |
|--------|---|-------------|------|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | 6549587221 | Fixed Flag.OPENCODE_EXPERIMENTAL_MARKDOWN -> process.env check |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | f7a3822380 | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | 211 | 5bdea8ce92 | Clean merge |
| ☑ | 4 | feat/base-one-rebrand | 52 | a5ae617aa1 | Clean merge - removes animation effects, adds rebrand |
| ☑ | 5 | feat/sinister-quotes | 73 | 0d8ee0de08 | Clean merge - SINISTER_PLACEHOLDERS in packages/ui/src/constants/placeholders.ts |
| ☑ | 6 | feat/session-grouping | 194 | 48c3c69c7e | Clean merge - session grouping in dialog, sidebar, locale util |
| ☑ | 7 | feat/session-bookmarks | 102 | b12b61e3a2 | Conflict resolution: merged parseSessionTitle + pinned sessions |
| ☑ | 8 | fix/dialog-datetime-alignment | 113 | 8469297763 | Conflict: kept alignment comment in locale.ts |
| ☑ | 9 | feat/keybindable-commands | 48 | b8e8d3ccdf | Conflict: merged markdown toggle + customSlashCommands; fixed undefined command.matcher |
| ☑ | 10 | feat/automatic-list-continuation | 112 | 65d3bee6f4 | Conflict: kept KeyEvent type annotation in prompt |
| ☑ | 11 | feat/continue-command | 11 | 66ae0cf8b5 | Conflicts in prompt.ts: kept lastAssistantForLoop + added overrides to runLoop/loop |
| ☑ | 12 | feat/configurable-snapshot-lifespan | 157 | 3d44f08f91 | Clean merge |
| ☑ | 13 | feat/configurable-new-plan-mode | 143 | Clean merge | Adds plan mode config |
| ☑ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | Clean merge (re-merged from updated remote) | Updates plan-mode.txt |
| ☑ | 15 | feat/enable-exa-setting | 259 | 994fc83afa | Conflict in config.ts: combined exports; fixed duplicate makeRuntime import |
| ☑ | 16 | feat/canceled-prompts-in-history | 151 | a37589220b | Conflict in app.tsx: combined markdown toggle + clear_prompt_history + customSlashCommands |
| ☑ | 17 | feat/permission-spinner | 36 | Clean merge | |
| ☑ | 18 | feat/opencode-expand | 67 | Clean merge | Adds expand.ts, config/expand.ts, config/substitute.ts |
| ☑ | 19 | refactor/shared-substitute | 203 | 6fd5bd11e9 | Conflicts in substitute.ts and prompt.ts: simple resolution |
| ☑ | 20 | feat/argument-range-syntax | 149 | 674a0edc52 | Complex conflicts in substitute.ts, prompt.ts, substitute.test.ts; fixed duplicate import |
| ☑ | 21 | feat/default-arguments | 217 | c2fe97f623 | Complex conflicts: synthesized whitespace splitting + range syntax + default arguments |
| ☑ | 22 | fix/history-navigation-key-commands | 237 | Clean merge | |
| ☑ | 23 | fix/build-with-short-version | 240 | Clean merge | Adds version.test.ts |
| ☑ | 24 | fix/autocompletion-filtered-order | 76 | b079b52b7c | Conflicts in prompt/index.tsx; fixed Keybind.Info type |
| ☑ | 25 | fix/modal-menus-filtered-order | 77 | b5c06f033a | Conflicts in autocomplete.tsx, dialog-select.tsx, smart-sort.ts |
| ☑ | 26 | fix/config-package-json-pollution | 176 | 5bbeb3452e | Clean merge |
| ☑ | 27 | fix/session-list-viewport-jumping | 197 | e3ec3e7109 | Clean merge |
| ☑ | 28 | fix/merging-multiple-configs | 205 | 0a9288d5fb | Clean merge - adds deepRemoveDefaults with zod |
| ☑ | 29 | fix/markdown-codeblock-theme-property | 222 | 9faa108abe | Clean merge |
| ☑ | 30 | fix/persist-sidebar | 80 | 298fe1272c | Conflicts in prompt/index.tsx; added zod import to config.ts |
| ☑ | 31 | feat/persist-sidebar-group-folding-states | 98 | 713427806b | Clean merge |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | 71 | 6bdfad3d15 | Clean merge |
| ☑ | 33 | feat/opeoginni--display-message-tps | 83 | 3bc8ed3a82 | Clean merge |
| ☑ | 34 | feat/kv-diff-style-clean | 134 | 83b018fbb2 | Conflict in permission.tsx: kept HEAD imports |
| ☑ | 35 | feat/global-compaction-threshold | 63 | eaad1a9f20 | Clean merge |
| ☑ | 36 | feat/configurable-message-and-session-limit | 177 | f0db1a6fdb | Conflicts in config.ts, dialog-session-list.tsx, types.gen.ts |
| ☑ | 37 | feat/experimental-dont-cache-command-markdown | 252 | 1473858563 | Conflict in command/index.ts: combined imports |
| ☑ | 38 | feat/jsonc-user-themes | 97 | 381bd36a4c | Conflict in config.ts; fixed duplicate import |
| ☑ | 39 | feat/improve-shell-tool-git-advice | 279 | 79405dbaa8 | Clean merge |
| ☑ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | 278 | 26177b1f99 | Clean merge |
| ☑ | 41 | feat/edit-tool-description | 142 | e506d6eb34 | Clean merge |
| ☑ | 42 | feat/renaming-doesnt-close-session-list | 233 | f2ef435578 | Conflict in dialog-session-list.tsx |
| ☑ | 43 | feat/session-child-toggle-key | 238 | a9c6615454 | Clean merge |
| ☑ | 44 | feat/get-session-title | 144 | 3ae82d3948 | Conflict in registry.ts |
| ☑ | 45 | feat/set-session-title | 106 | 1d95b8723f | Conflicts in registry.ts; renamed duplicate keys |
| ☑ | 46 | feat/no-disabled-lsps-in-sidebar | 186 | 3b5ae1e5be | Conflict in sidebar/lsp.tsx |
| ☑ | 47 | fix/inline-datetime-no-padding | 275 | 831e94ad33 | Conflicts in locale.ts; added SessionMessageSynthetic import |
| ☑ | 48 | feat/agent-timestamps | 191 | 0c0773d1cb | Conflicts in locale.ts, index.tsx; added agentTimestamps KV signal + context type |
| ☑ | 49 | feat/rewind-modal-option | 192 | 20bd6a4def | Conflicts in app.tsx, index.tsx, session.ts; kept agent timestamps + sidebar overlay |
| ☑ | 50 | feat/alphabetize-command-palette-groups | 195 | d0f68d273a | Conflict in dialog-select.tsx; kept smartCompare sorting |
| ☑ | 51 | feat/taller-dialogs | 196 | ced2c6c255 | Clean merge |
| ☑ | 52 | feat/add-arianes-themes | 212 | 371d8f8908 | Clean merge, adds 50 theme JSON files |
| ☑ | 53 | feat/sidebar-clock | 207 | 4019aa0179 | Conflicts in app.tsx, footer.tsx, sidebar.tsx |
| ☑ | 54 | feat/alphabetical-message-modal | 219 | 8e738d9b85 | Conflict in dialog-select.tsx |
| ☑ | 55 | feat/toggle-sidebar-scrollbar | 224 | d50ac667b0 | Conflicts in app.tsx, index.tsx |
| ☑ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | 8fe9c715ae | Conflict in locale.ts |
| ☑ | 57 | feat/configurable-maximum-prompt-input-size | 242 | e18ee2707b | Conflicts in config.ts, types.gen.ts |
| ☑ | 58 | feat/clickable-sidebar-mcps | 227 | 3254b391cc | Conflict in mcp.tsx |
| ☑ | 59 | feat/clickable-dialogue-mcps | 225 | 42bf1cf27a | Clean merge |
| ☑ | 60 | feat/clickable-status-mcps | 241 | e67a58c180 | Bug fix: removed nonexistent Log import |
| ☑ | 61 | feat/ignored-commands | 216 | 90a2b31fd3 | Clean merge |
| ☑ | 62 | feat/dialogue-background-overlay-setting | 249 | 439f1179a4 | Conflicts in config.ts, types.gen.ts |
| ☑ | 63 | fix/no-split-database | 235 | 5d19cf367a | Clean merge |
| ☑ | 64 | feat/elapsed-timer | 54 | d10a4f7bc6 | Conflicts in index.tsx |
| ☑ | 65 | fix/rfc2119-question-tool | 118 | 7af4885368 | Clean merge |
| ☑ | 66 | feat/sidebar-header-accent-colours | 229 | bcf5bf62f3 | Conflict in lsp.tsx |
| ☑ | 67 | feat/distinct-title-colour | 226 | b54cdc3121 | Conflict in sidebar.tsx; added sessionTitle to theme |
| ☑ | 68 | feat/tool-output-colour | 230 | d7fbe7cd23 | Conflicts in theme.tsx; added toolOutput to theme |
| ☑ | 69 | fix/autocompletion-input-enter-keybindings | 277 | 4a33a35b16 | Clean merge |
| ☑ | 70 | fix/escape-from-status | 245 | 455c877396 | Clean merge |
| ☑ | 71 | fix/restore-footer | 175 | 8bb269c888 | Conflict in index.tsx |
| ☑ | 72 | feat/remove-canned-jokes | 247 | df41ee27ba | Clean merge |
| ☑ | 73 | fix/session-list-delete-selection | 255 | 8036c6349e | Conflicts in dialog-select.tsx |
| ☑ | 74 | feat/kimi-with-claude-system-prompt | 246 | 551783b2a3 | Clean merge |
| ☑ | 75 | fix/less-bottom-padding | 263 | 4c1d215195 | Clean merge |
| ☑ | 76 | fix/session-timestamp-regression | 268 | e6ae3b3bb6 | Clean merge |
| ☑ | 77 | feat/persistent-session-id-in-sidebar-toggle | 276 | e1c862fd75 | Conflicts in app.tsx, sidebar.tsx |
| ☑ | 78 | fix/preserve-quotes-in-arguments | 239 | 2ac352b549 | Conflict in prompt-substitute.test.ts |
| ☑ | 79 | feat/command-palette-consistency | 244 | f162a7f3ab | Conflicts in app.tsx, index.tsx; combined all toggle commands |
| ☑ | 80 | fix/model-selection-follows-favorite | 280 | 6447296136 | Clean merge |
| ☑ | 81 | fix/integration-version-plugin-compatibility | 281 | ce3ef8aa39 | Clean merge |
| ☑ | 82 | fix/hide-session-pinning-feature | 282 | d63365b86a | Conflict in dialog-session-list.tsx |
| ☑ | 83 | fix/variant-list-toast-no-variants | 283 | fe3b04e0b1 | Clean merge |

## Merge Log

(Details of each merge will be appended here as branches are merged.)
