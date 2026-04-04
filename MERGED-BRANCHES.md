# Integration Branch: integration/2026-04-04-00-14

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | 0fd0c0799e | Clean merge |
| ☑ | 2 | feat/sinister-quotes | origin | 622d1cd8dc | Clean merge; bun install needed for ui symlink |
| ☑ | 3 | feat/markdown-renderer | gignit | b065e3d532 | Conflicts in session/index.tsx - combined imports and theme resolution |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | f80c2a55b5 | Clean merge |
| ☑ | 5 | feat/session-grouping | origin | 13db048f67 | Conflicts in sidebar.tsx - combined imports and title grouping logic |
| ☑ | 6 | feat/session-bookmarks | origin | 17ad27d455 | Conflicts in dialog-session-list.tsx and locale.ts - combined grouping+bookmarks, merged date formatting |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | c9704d9d90 | Clean merge |
| ☑ | 8 | feat/keybindable-commands | origin | 9c9bb419bb | Clean merge |
| ☑ | 9 | feat/automatic-list-continuation | origin | effde79144 | Clean merge |
| ☑ | 10 | feat/continue-command | origin | 7ef43c0699 | Clean merge |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | df11b16bb5 | Clean merge |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | ac81705f07 | Clean merge |
| ☑ | 13 | feat/enable-exa-setting | origin | c62dd3417f | Conflicts in config.ts - combined plan_mode and enable_exa settings |
| ☑ | 14 | feat/canceled-prompts-in-history | origin | a7bf927829 | Conflict in app.tsx - combined both command palette items |
| ☑ | 15 | feat/permission-spinner | origin | d8b8b4209c | Clean merge |
| ☑ | 16 | feat/permission-indicator-in-sidebar | origin | 3adb3c7a18 | Conflicts in sidebar.tsx - combined permissions indicator with existing content |
| ☑ | 17 | feat/opencode-expand | origin | 2780051264 | Conflicts resolved |
| ☑ | 18 | feat/argument-range-syntax | origin | 4c77b34916 | Conflicts in substitute.ts - kept extended placeholder syntax with ${N}, ${N..M}, ${..M}, ${N..}, ${..} |
| ☑ | 19 | feat/default-arguments | origin | 6584bb2549 | Clean merge - no swallowing behavior, defaults work correctly |
| ☑ | 20 | fix/preserve-quotes-in-arguments | origin | d8fd29909a | Clean merge - kept substituteArguments, removed quote trimming |
| ☑ | 21 | fix/history-navigation-key-commands | origin | 8a6ba49fa5 | Clean merge |
| ☑ | 22 | fix/build-with-short-version | origin | 3494493cfd | Uses short timestamp version for integration branches |
| ☑ | 23 | fix/autocompletion-filtered-order | origin | 1a09364962 | Conflict resolved - kept integration's prompt/index.tsx |
| ☑ | 24 | fix/modal-menus-filtered-order | origin | e277ebb759 | Clean merge |
| ☑ | 25 | fix/config-package-json-pollution | origin | ab314ae77e | Prevents package.json pollution with non-SemVer versions |
| ☑ | 26 | fix/session-list-viewport-jumping | origin | 1d6b25e544 | |
| ☑ | 27 | fix/merging-multiple-configs | origin | 1ed6e50fcd | |
| ☑ | 28 | fix/markdown-codeblock-theme-property | origin | ef776b1278 | |
| ☑ | 29 | fix/persist-sidebar | origin | b08bb55dcc | Makes sidebar state persistent; removes auto-hide; no return to auto state |
| ☑ | 30 | feat/command-palette-consistency | origin | f2d276bedd | Clean merge |
| ☑ | 31 | refactor/shared-substitute | origin | 13867aa716 | Kept HEAD version with extended placeholder syntax |
| ☑ | 32 | feat/session-id-in-status | origin | e9f9c6c6c0 | Clean merge |
| ☑ | 33 | feat/edit-tool-description | origin | 62fe3955cc | Clean merge |
| ☑ | 34 | feat/opeoginni--display-message-tps | origin | a5fefdc3bc | Clean merge |
| ☑ | 35 | feat/kv-diff-style-clean | origin | 1774dc36d4 | Fixed duplicate useKV import and missing useTuiConfig |
| ☑ | 36 | feat/global-compaction-threshold | origin | 199d2521a3 | Clean merge |
| ☑ | 37 | feat/configurable-message-and-session-limit | origin | b49efb181a | Both experimental.messages_limit and experimental.session_list_limit accept positive integers or "none" |
| ☑ | 38 | feat/experimental-dont-cache-command-markdown | origin | ddbec75d6d | Added reloadCommands export; fixed Instance import and test types |
| ☑ | 39 | feat/jsonc-user-themes | origin | 8ff073e83f | Clean merge - adds support for user-defined themes in JSONC format |
| ☑ | 40 | feat/persist-sidebar-group-folding-states | origin | f8e1e6b974 | Clean merge - preserves sidebar group folding states |
| ☑ | 41 | feat/persistant-sidebar-overlay-behaviour | origin | 013a1de76f | Resolved conflict in app.tsx - combined TPS toggle, terminal title toggle, and sidebar overlay toggle |
| ☑ | 42 | feat/shell-advice | origin | 300b17f22b | Clean merge - added shell advice to bash tool |
| ☑ | 43 | feat/improve-bash-tool-git-advice | origin | c27be67f5d | Resolved conflict in bash.txt - kept ${shellName} variable while incorporating git advice improvements |
| ☑ | 44 | feat/renaming-doesnt-close-session-list | origin | e38481407a | Resolved conflict - kept pinKeybind while incorporating initialSessionID logic |
| ☑ | 45 | feat/session-child-toggle-key | origin | b931561423 | Resolved conflict - kept session_continue while adding session_child_toggle |
| ☑ | 46 | feat/set-session-title | origin | d4dcdb51ae | Clean merge - adds tool to set current session title |
| ☑ | 47 | feat/get-session-title | origin | 4ad9462314 | Resolved conflict - kept both bookmark and session-title tool imports |
| ☑ | 48 | feat/no-disabled-lsps-in-sidebar | origin | 627825c345 | Resolved conflict in lsp.tsx - combined toggle function with Show when !off wrapper |
| ☑ | 49 | feat/agent-timestamps | origin | 4e28fafa37 | Resolved conflict - combined sidebar overlay width calc with agent timestamps |
| ☑ | 50 | feat/rewind-modal-option | origin | TBD | Clean merge |
| ☑ | 51 | feat/alphabetize-command-palette-groups | origin | b1755a163f | Resolved conflicts in dialog-select.tsx - kept smartCompare for sorting |
| ☑ | 52 | feat/taller-dialogs | origin | b0f485a2e4 | Clean merge |
| ☑ | 53 | feat/add-arianes-themes | origin | 31b3f4bd034 | Clean merge - adds Ariane's theme files |
| ☑ | 54 | feat/aspiers--readline-additions | origin | e5cc689f11 | Resolved conflicts in types.gen.ts - added readline keybinds |
| ☑ | 55 | feat/sidebar-clock | origin | 1ff685909c | Resolved conflict in sidebar.tsx - fixed missing hasProviders/gettingStartedDismissed definitions |
| ☑ | 56 | feat/alphabetical-message-modal | origin | daf7776cd1 | Resolved conflicts in dialog-select.tsx - kept smartCompare, combined conditional sorting |
| ☑ | 57 | feat/toggle-sidebar-scrollbar | origin | af5718c111 | Resolved conflicts in sidebar.tsx, app.tsx, index.tsx - combined overlay + scrollbar props |
| ☑ | 58 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | 73b8c84de0 | Resolved conflict in locale.ts - used MONTHS array approach |
| ☑ | 59 | feat/configurable-maximum-prompt-input-size | origin | c770635c63 | Resolved conflicts in config.ts and types.gen.ts - combined all experimental fields |
| ☑ | 60 | fix/always-allow-folding-sidebar-mcps | origin | 685870c95b | Clean merge |
| ☑ | 61 | feat/clickable-sidebar-mcps | origin | 12d51068be | Resolved conflict in mcp.tsx - kept folding toggle + loading signal |
| ☑ | 62 | feat/clickable-dialogue-mcps | origin | 885955b41b | Clean merge |
| ☑ | 63 | feat/clickable-status-mcps | origin | 075ad7cc66 | Clean merge |
| ☑ | 64 | feat/ignored-commands | origin | 45977ac328 | Resolved conflict in config.ts - kept ignored + catchall |
| ☑ | 65 | feat/dialogue-background-overlay-setting | origin | b9f6564df3 | Resolved conflicts in config.ts and types.gen.ts - combined all experimental fields |
| ☑ | 66 | fix/no-split-database | origin | 279a39ee7d | Clean merge |
| ☑ | 67 | feat/elapsed-timer | origin | 43b96e2390 | Resolved import order conflict in index.tsx |
| ☑ | 68 | fix/system-prompt-directories | origin | 88fe534d9f | Clean merge |
| ☑ | 69 | fix/rfc2119-question-tool | origin | ea608d4a0c | Clean merge |
| ☑ | 70 | feat/sidebar-header-accent-colours | origin | 3486765354 | Resolved conflict in lsp.tsx - kept folding + applied accent colour |
| ☑ | 71 | feat/distinct-title-colour | origin | 37cd8fcd7c | Resolved conflict in sidebar.tsx - kept grouping title format with sessionTitle colour |
| ☑ | 72 | feat/tool-output-colour | origin | 1e6fd1d5f2 | Resolved conflicts in theme.tsx - combined sessionTitle + toolOutput theme colours |
| ☑ | 73 | feat/improve-experimental-plan-mode-prompt | origin | 10a0a51be5 | Clean merge |
| ☑ | 74 | fix/input-enter-keybindings | origin | 7c0cff33a1 | Clean merge |
| ☑ | 75 | fix/escape-from-status | origin | 96a18ffb1e | Clean merge |
| ☐ | 76 | fix/restore-footer | origin | TBD | Restores footer; must not be clobbered |
| ☐ | 77 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 78 | fix/session-list-delete-selection | origin | TBD | |

## Merge Log

_Merge log entries will be added here as branches are merged._

_2025-04-04 01:15 UTC_ - Merged branch 20 (fix/preserve-quotes-in-arguments) - d8fd29909a
- Resolved conflict: packages/opencode/src/session/prompt.ts
- Resolution: Kept substituteArguments function, removed quote trimming from args
- Result: Quotes in arguments are now preserved

_2025-04-04 01:16 UTC_ - Merged branch 21 (fix/history-navigation-key-commands) - 8a6ba49fa5
- Clean merge

_2025-04-04 01:17 UTC_ - Merged branch 22 (fix/build-with-short-version) - 3494493cfd
- Clean merge

_2025-04-04 01:18 UTC_ - Merged branch 23 (fix/autocompletion-filtered-order) - 1a09364962
- Conflict resolved: packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx
- Resolution: Kept integration's version (HEAD) to preserve placeholders and list continuation features
- Typecheck: Passed
