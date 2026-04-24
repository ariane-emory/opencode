# Integration Branch: integration/2026-04-24-15-55

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | e700d7124f | Clean merge |
| ☑ | 2 | feat/sinister-quotes | origin | ddbb34d144 | Clean merge - SINISTER_PLACEHOLDERS array preserved |
| ☑ | 3 | feat/markdown-renderer | gignit | d7eaf15518 | Resolved conflicts in run.ts, session/index.tsx, ui.ts |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | f925e9e39f | Clean merge |
| ☑ | 5 | feat/session-grouping | origin | 69dcd12f42 | Clean merge |
| ☑ | 6 | feat/session-bookmarks | origin | 47bbd57c79 | Resolved conflicts in dialog-session-list.tsx and locale.ts - combined session grouping and bookmarks features |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | 8055e7ac95 | Resolved conflict in locale.ts - kept comment about padding |
| ☑ | 8 | feat/keybindable-commands | origin | 7c84e63b8b | Clean merge |
| ☑ | 9 | feat/automatic-list-continuation | origin | e3151d89ae | Clean merge |
| ☑ | 10 | feat/continue-command | origin | 8e932fd89c | Resolved conflict in prompt.ts - kept lastAssistantForLoop from HEAD with overrides parameter from branch |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | 5c5ff6d8ed | Clean merge |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | 52f8616638 | Clean merge |
| ☑ | 13 | feat/enable-exa-setting | origin | c85220aea2 | Resolved conflict in config.ts - kept both plan_mode and enable_exa settings, kept all HEAD exports plus experimentalEnableExa |
| ☑ | 14 | feat/canceled-prompts-in-history | origin | efd98982e7 | Resolved conflict in app.tsx - kept both markdown toggle and clear prompt history toggle in command palette |
| ☑ | 15 | feat/permission-spinner | origin | 7ee14f1001 | Clean merge |
| ☑ | 16 | feat/opencode-expand | origin | d07b3c790b | Clean merge |
| ☑ | 17 | feat/argument-range-syntax | origin | 461a3681a3 | Resolved conflicts in substitute.ts, prompt.ts, substitute.test.ts - kept branch's extended placeholder syntax with no swallowing |
| ☑ | 18 | feat/default-arguments | origin | 05b55ff8e4 | Combined with feat/argument-range-syntax - kept all placeholder syntaxes ($N, ${N}, ${N..M}, ${N:default}, ${N..M:default}) with no swallowing |
| ☑ | 19 | fix/preserve-quotes-in-arguments | origin | 242433752a | Clean merge |
| ☑ | 20 | fix/history-navigation-key-commands | origin | 55b2e1087c | Clean merge |
| ☑ | 21 | fix/build-with-short-version | origin | 84744e0f48 | Clean merge - automatically uses short timestamp version for integration branches |
| ☑ | 22 | fix/autocompletion-filtered-order | origin | 22fcbe6a0f | Resolved conflicts in prompt/index.tsx - kept list continuation and prompt keybindings |
| ☑ | 23 | fix/modal-menus-filtered-order | origin | f907cd1440 | Resolved conflicts in autocomplete.tsx and dialog-select.tsx - kept tieredMatch, added fuzzysort and smartCompare |
| ☑ | 24 | fix/config-package-json-pollution | origin | d41810aff2 | Clean merge |
| ☑ | 25 | fix/session-list-viewport-jumping | origin | 743d09f87c | Clean merge |
| ☑ | 26 | fix/merging-multiple-configs | origin | 5db6c14997 | Clean merge |
| ☑ | 27 | fix/markdown-codeblock-theme-property | origin | 5877ece0c1 | Clean merge |
| ☑ | 28 | fix/persist-sidebar | origin | 5345da3a88 | Resolved conflicts in prompt/index.tsx - kept sinister placeholders, list continuation, and placeholder resize effects |
| ☑ | 29 | feat/persist-sidebar-group-folding-states | origin | da1c9b4f7b | Clean merge |
| ☑ | 30 | feat/command-palette-consistency | origin | 8d04d61abb | Resolved conflicts in app.tsx and session/index.tsx - moved all toggles to System category, removed duplicates from Session |
| ☑ | 31 | feat/persistant-sidebar-overlay-behaviour | origin | a762938e54 | Clean merge |
| ☑ | 32 | refactor/shared-substitute | origin | aaeca2d9f8 | Resolved conflicts in substitute.ts and prompt.ts - combined extended placeholders with shared substitute |
| ☑ | 33 | feat/opeoginni--display-message-tps | origin | 640904c05c | Resolved conflict in app.tsx - added TPS toggle alongside sidebar overlay toggle |
| ☑ | 34 | feat/kv-diff-style-clean | origin | 1c17e6b999 | Clean merge - fixed duplicate useKV import in permission.tsx |
| ☑ | 35 | feat/global-compaction-threshold | origin | c483d04c28 | Clean merge |
| ☑ | 36 | feat/configurable-message-and-session-limit | origin | 6d062d25ef | Resolved conflicts in dialog-session-list.tsx, config.ts, types.gen.ts - combined session grouping/bookmarks with configurable limit |
| ☐ | 37 | feat/experimental-dont-cache-command-markdown | origin | TBD | |
| ☐ | 38 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 39 | feat/improve-bash-tool-git-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/shell-advice branch, both sets of changes must be synthesized! |
| ☐ | 40 | feat/shell-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/improve-bash-tool-git-advice branch, both sets of changes must be synthesized! NO shells must be blacklisted! |
| ☐ | 41 | feat/edit-tool-description | origin | TBD | |
| ☐ | 42 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 43 | feat/session-child-toggle-key | origin | TBD | |
| ☐ | 44 | feat/set-session-title | origin | TBD | |
| ☐ | 45 | feat/get-session-title | origin | TBD | |
| ☐ | 46 | feat/no-disabled-lsps-in-sidebar | origin | TBD | Remember, the whole purpose of this branch is to cause the LSPs to not be displayed in the sidebar at all when the LSPs have been disabled in the configuration. Make sure that you don't clobber this while merging! |
| ☐ | 47 | feat/agent-timestamps | origin | TBD | |
| ☐ | 48 | feat/rewind-modal-option | origin | TBD | |
| ☐ | 49 | feat/alphabetize-command-palette-groups | origin | TBD | |
| ☐ | 50 | feat/taller-dialogs | origin | TBD | |
| ☐ | 51 | feat/add-arianes-themes | origin | TBD | |
| ☐ | 52 | feat/aspiers--readline-additions | origin | TBD | |
| ☐ | 53 | feat/sidebar-clock | origin | TBD | |
| ☐ | 54 | feat/alphabetical-message-modal | origin | TBD | |
| ☐ | 55 | feat/toggle-sidebar-scrollbar | origin | TBD | |
| ☐ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD | |
| ☐ | 57 | feat/configurable-maximum-prompt-input-size | origin | TBD | |
| ☐ | 58 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 59 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 60 | feat/clickable-status-mcps | origin | TBD | |
| ☐ | 61 | feat/ignored-commands | origin | TBD | |
| ☐ | 62 | feat/dialogue-background-overlay-setting | origin | TBD | |
| ☐ | 63 | fix/no-split-database | origin | TBD | |
| ☐ | 64 | feat/elapsed-timer | origin | TBD | |
| ☐ | 65 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 66 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 67 | feat/distinct-title-colour | origin | TBD | Make sure that this change in the title's colouring is made compatible with the reformatting in grouped session titles that comes from the feat/session-grouping branch, BOTH the distinct colour for the titles AND the formatting of grouped sessions' titles |
| ☐ | 68 | feat/tool-output-colour | origin | TBD | |
| ☐ | 69 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 70 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 71 | fix/escape-from-status | origin | TBD | |
| ☐ | 72 | fix/restore-footer | origin | TBD | As its name suggests, this feature restores the footer it was removed in a previous version; it must not be allowed to be clobbered by other branches when merging! |
| ☐ | 73 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 74 | fix/session-list-delete-selection | origin | TBD | |
| ☐ | 75 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 76 | fix/less-bottom-padding | origin | TBD | |
| ☐ | 77 | fix/no-footer-context-when-sidebar | origin | TBD | |
| ☐ | 78 | fix/session-timestamp-regression | origin | TBD | |
| ☐ | 79 | fix/prompt-input-retention | origin | TBD | |

## Merge Log

| # | Branch | Commit | Notes |
|---|--------|--------|-------|
| 1 | feat/base-one-rebrand | e700d7124f | Clean merge |
| 2 | feat/sinister-quotes | ddbb34d144 | Clean merge - SINISTER_PLACEHOLDERS array preserved |
| 3 | feat/markdown-renderer | d7eaf15518 | Resolved conflicts in run.ts, session/index.tsx, ui.ts |
| 4 | feat/thinking-indicator-hidden | f925e9e39f | Clean merge |
| 5 | feat/session-grouping | 69dcd12f42 | Clean merge |
| 6 | feat/session-bookmarks | 47bbd57c79 | Resolved conflicts in dialog-session-list.tsx and locale.ts |
| 7 | fix/dialog-datetime-alignment | 8055e7ac95 | Resolved conflict in locale.ts |
| 8 | feat/keybindable-commands | 7c84e63b8b | Clean merge |
| 9 | feat/automatic-list-continuation | e3151d89ae | Clean merge |
| 10 | feat/continue-command | 8e932fd89c | Resolved conflict in prompt.ts - kept lastAssistantForLoop from HEAD with overrides parameter from branch |
| 11 | feat/configurable-snapshot-lifespan | 5c5ff6d8ed | Clean merge |
| 12 | feat/configurable-new-plan-mode | 52f8616638 | Clean merge |
| 13 | feat/enable-exa-setting | c85220aea2 | Resolved conflict in config.ts - kept both plan_mode and enable_exa settings, kept all HEAD exports plus experimentalEnableExa |
| 14 | feat/canceled-prompts-in-history | efd98982e7 | Resolved conflict in app.tsx - kept both markdown toggle and clear prompt history toggle in command palette |
| 15 | feat/permission-spinner | 7ee14f1001 | Clean merge |
| 16 | feat/opencode-expand | d07b3c790b | Clean merge |
| 17 | feat/argument-range-syntax | 461a3681a3 | Resolved conflicts in substitute.ts, prompt.ts, substitute.test.ts - kept branch's extended placeholder syntax with no swallowing |
| 18 | feat/default-arguments | 05b55ff8e4 | Combined with feat/argument-range-syntax - kept all placeholder syntaxes ($N, ${N}, ${N..M}, ${N:default}, ${N..M:default}) with no swallowing |
| 19 | fix/preserve-quotes-in-arguments | 242433752a | Clean merge |
| 20 | fix/history-navigation-key-commands | 55b2e1087c | Clean merge |
| 21 | fix/build-with-short-version | 84744e0f48 | Clean merge - automatically uses short timestamp version for integration branches |
| 22 | fix/autocompletion-filtered-order | 22fcbe6a0f | Resolved conflicts in prompt/index.tsx |
| 23 | fix/modal-menus-filtered-order | f907cd1440 | Resolved conflicts in autocomplete.tsx and dialog-select.tsx |
| 24 | fix/config-package-json-pollution | d41810aff2 | Clean merge |
| 25 | fix/session-list-viewport-jumping | 743d09f87c | Clean merge |
| 26 | fix/merging-multiple-configs | 5db6c14997 | Clean merge |
| 27 | fix/markdown-codeblock-theme-property | 5877ece0c1 | Clean merge |
| 28 | fix/persist-sidebar | 5345da3a88 | Resolved conflicts in prompt/index.tsx |
| 29 | feat/persist-sidebar-group-folding-states | da1c9b4f7b | Clean merge |
| 30 | feat/command-palette-consistency | 8d04d61abb | Resolved conflicts in app.tsx and session/index.tsx |
| 31 | feat/persistant-sidebar-overlay-behaviour | a762938e54 | Clean merge |
| 32 | refactor/shared-substitute | aaeca2d9f8 | Resolved conflicts in substitute.ts and prompt.ts |
| 33 | feat/opeoginni--display-message-tps | 640904c05c | Resolved conflict in app.tsx |
| 34 | feat/kv-diff-style-clean | 1c17e6b999 | Clean merge |
| 35 | feat/global-compaction-threshold | c483d04c28 | Clean merge |
| 36 | feat/configurable-message-and-session-limit | 6d062d25ef | Resolved conflicts in dialog-session-list.tsx, config.ts, types.gen.ts |

