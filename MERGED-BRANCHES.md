# Integration Branch: integration/2026-04-06-14-10

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | 0669b5b183 | Clean merge |
| ☑ | 2 | feat/sinister-quotes | origin | 748c770400 | Clean merge |
| ☑ | 3 | feat/markdown-renderer | gignit | 82e0ce00e7 | Conflicts in session/index.tsx: combined imports and theme destructuring |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | b455d2be4d | Clean merge |
| ☑ | 5 | feat/session-grouping | origin | 868424d1dd | Clean merge |
| ☑ | 6 | feat/session-bookmarks | origin | 06b87d8259 | Conflicts in dialog-session-list.tsx and locale.ts; combined grouping+bookmarks |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | d39c0f3db2 | Clean merge |
| ☑ | 8 | feat/keybindable-commands | origin | b908b3d54f | Clean merge |
| ☑ | 9 | feat/automatic-list-continuation | origin | 27d59b47ed | Clean merge |
| ☑ | 10 | feat/continue-command | origin | f3269808e1 | Clean merge |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | 474515455f | Clean merge |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | 4f1656c416 | Clean merge |
| ☑ | 13 | feat/enable-exa-setting | origin | d15eec432b | Conflicts in config.ts: combined plan_mode and enable_exa fields |
| ☑ | 14 | feat/canceled-prompts-in-history | origin | effacea859 | Conflict in app.tsx: kept both menu items |
| ☑ | 15 | feat/permission-spinner | origin | 476faf9c42 | Clean merge |
| ☑ | 16 | feat/opencode-expand | origin | 47a26a17f0 | Minor conflict in prompt.ts: combined imports |
| ☑ | 17 | feat/argument-range-syntax | origin | 335c653c6e | Conflicts in substitute.ts and test; took feature branch version |
| ☑ | 18 | feat/default-arguments | origin | 1ada6754ec | Restored prompt.ts to pre-merge; substitute.ts changes kept from feature branch |
| ☑ | 19 | fix/preserve-quotes-in-arguments | origin | 39207ad0cf | Conflict in prompt.ts; kept substituteArguments re-export for tests |
| ☑ | 20 | fix/history-navigation-key-commands | origin | a49b2075fe | Clean |
| ☑ | 21 | fix/build-with-short-version | origin | e0b3c0a7b4 | Clean |
| ☑ | 22 | fix/autocompletion-filtered-order | origin | feb179574b | Conflicts in prompt/index.tsx; kept HEAD additions from previous merges |
| ☑ | 23 | fix/modal-menus-filtered-order | origin | 479300198a | Conflicts in autocomplete, dialog-select, use-filtered-list; used fuzzysort approach |
| ☑ | 24 | fix/config-package-json-pollution | origin | 6a015e7dd4 | Clean |
| ☑ | 25 | fix/session-list-viewport-jumping | origin | 821e88d3e8 | Clean |
| ☑ | 26 | fix/merging-multiple-configs | origin | aa2c9160d1 | Fixed RawInfo -> Info reference |
| ☑ | 27 | fix/markdown-codeblock-theme-property | origin | 5876652e45 | Clean |
| ☑ | 28 | fix/persist-sidebar | origin | a752929233 | Kept our prompt/index.tsx; feature changes in kv.tsx and session/index.tsx |
| ☑ | 29 | feat/persist-sidebar-group-folding-states | origin | 6a4d9a5943 | Kept HEAD prompt.ts; sidebar fold persistence changes clean |
| ☑ | 30 | feat/permission-indicator-in-sidebar | origin | 18a0efc7e0 | Combined titleParts + permissions memos in sidebar.tsx |
| ☑ | 31 | feat/command-palette-consistency | origin | 4e35784d76 | Moved timestamps/thinking/tooldetails/scrollbar/generic_tool_output to System; kept sidebar toggle in Session with persist-sidebar logic |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | 70b618c620 | Kept only showHeader toggle (others already moved to System by #31) |
| ☑ | 33 | refactor/shared-substitute | origin | e0eebcc3f5 | Kept our richer substitute.ts (with default/range syntax); removed duplicate placeholderRegex from prompt.ts namespace |
| ☑ | 34 | feat/session-id-in-status | origin | 851c958fa4 | Clean merge |
| ☑ | 35 | feat/opeoginni--display-message-tps | origin | a0f8fd0ca0 | Combined sidebar overlay + tps + terminal title toggles in app.tsx |
| ☑ | 36 | feat/kv-diff-style-clean | origin | 7ab7053a0f | Fixed duplicate useKV import, missing useLocal import, and undefined config ref in permission.tsx |
| ☑ | 37 | feat/global-compaction-threshold | origin | 844958ed40 | Clean merge |
| ☑ | 38 | feat/configurable-message-and-session-limit | origin | a7e638e8ba | Combined grouping/bookmarks + session_list_limit; kept plan_mode/enable_exa/diff_style in config |
| ☑ | 39 | feat/experimental-dont-cache-command-markdown | origin | a0bfb553b6 | Fixed malformed feature-branch `command/index.ts`, kept `reloadCommands`, and updated test config for `cache_command_markdown_files` | 
| ☑ | 40 | feat/jsonc-user-themes | origin | a8a7a6886e | Clean merge |
| ☑ | 41 | feat/shell-advice | origin | 7337a80d05 | Merged cleanly; bash tool description still must be synthesized with #42 |
| ☑ | 42 | feat/improve-bash-tool-git-advice | origin | face3f41d5 | Synthesized bash tool guidance with #41: kept shell advice and updated git/PR base-branch wording |
| ☑ | 43 | feat/edit-tool-description | origin | 5e083c7b90 | Clean merge |
| ☑ | 44 | feat/renaming-doesnt-close-session-list | origin | 07c1e61a3f | Kept bookmark keybind/current session selection and preserved session-list reopen after rename |
| ☑ | 45 | feat/session-child-toggle-key | origin | d2fd381a59 | Combined new child-toggle keybind with existing session-continue keybind |
| ☐ | 46 | feat/set-session-title | origin | TBD | |
| ☐ | 47 | feat/get-session-title | origin | TBD | |
| ☐ | 48 | feat/no-disabled-lsps-in-sidebar | origin | TBD | |
| ☐ | 49 | feat/agent-timestamps | origin | TBD | |
| ☐ | 50 | feat/rewind-modal-option | origin | TBD | |
| ☐ | 51 | feat/alphabetize-command-palette-groups | origin | TBD | |
| ☐ | 52 | feat/taller-dialogs | origin | TBD | |
| ☐ | 53 | feat/add-arianes-themes | origin | TBD | |
| ☐ | 54 | feat/aspiers--readline-additions | origin | TBD | |
| ☐ | 55 | feat/sidebar-clock | origin | TBD | |
| ☐ | 56 | feat/alphabetical-message-modal | origin | TBD | |
| ☐ | 57 | feat/toggle-sidebar-scrollbar | origin | TBD | |
| ☐ | 58 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD | |
| ☐ | 59 | feat/configurable-maximum-prompt-input-size | origin | TBD | |
| ☐ | 60 | fix/always-allow-folding-sidebar-mcps | origin | TBD | |
| ☐ | 61 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 62 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 63 | feat/clickable-status-mcps | origin | TBD | |
| ☐ | 64 | feat/ignored-commands | origin | TBD | |
| ☐ | 65 | feat/dialogue-background-overlay-setting | origin | TBD | |
| ☐ | 66 | fix/no-split-database | origin | TBD | |
| ☐ | 67 | feat/elapsed-timer | origin | TBD | |
| ☐ | 68 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 69 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 70 | feat/distinct-title-colour | origin | TBD | Must be compatible with feat/session-grouping grouped session title formatting |
| ☐ | 71 | feat/tool-output-colour | origin | TBD | |
| ☐ | 72 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 73 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 74 | fix/escape-from-status | origin | TBD | |
| ☐ | 75 | fix/restore-footer | origin | TBD | Restores footer; must not be clobbered |
| ☐ | 76 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 77 | fix/session-list-delete-selection | origin | TBD | |
| ☐ | 78 | feat/allow-variant_list-keybinding | origin | TBD | |
| ☐ | 79 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 80 | fix/less-bottom-padding | origin | TBD | |
| ☐ | 81 | fix/no-footer-context-when-sidebar | origin | TBD | |

## Merge Log

_Merge details will be added as branches are processed._
