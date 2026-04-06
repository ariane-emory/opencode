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
| ☐ | 9 | feat/automatic-list-continuation | origin | TBD | |
| ☐ | 10 | feat/continue-command | origin | TBD | |
| ☐ | 11 | feat/configurable-snapshot-lifespan | origin | TBD | |
| ☐ | 12 | feat/configurable-new-plan-mode | origin | TBD | |
| ☐ | 13 | feat/enable-exa-setting | origin | TBD | |
| ☐ | 14 | feat/canceled-prompts-in-history | origin | TBD | Careful not to clobber; must add new item to command palette |
| ☐ | 15 | feat/permission-spinner | origin | TBD | |
| ☐ | 16 | feat/opencode-expand | origin | TBD | |
| ☐ | 17 | feat/argument-range-syntax | origin | TBD | |
| ☐ | 18 | feat/default-arguments | origin | TBD | Don't reintroduce swallowing behaviour that feat/argument-range-syntax eliminated |
| ☐ | 19 | fix/preserve-quotes-in-arguments | origin | TBD | |
| ☐ | 20 | fix/history-navigation-key-commands | origin | TBD | |
| ☐ | 21 | fix/build-with-short-version | origin | TBD | Automatically uses short timestamp version for integration branches |
| ☐ | 22 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 23 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 24 | fix/config-package-json-pollution | origin | TBD | Prevents package.json pollution with non-SemVer versions |
| ☐ | 25 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 26 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 27 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 28 | fix/persist-sidebar | origin | TBD | Makes sidebar display state persistent; removes auto-hide on narrow terminal; no return to auto state |
| ☐ | 29 | feat/persist-sidebar-group-folding-states | origin | TBD | Be sure not to let this feature get clobbered |
| ☐ | 30 | feat/permission-indicator-in-sidebar | origin | TBD | |
| ☐ | 31 | feat/command-palette-consistency | origin | TBD | MOVES items from Session to System category; must NOT duplicate; handle persist-sidebar logic |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 33 | refactor/shared-substitute | origin | TBD | |
| ☐ | 34 | feat/session-id-in-status | origin | TBD | |
| ☐ | 35 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 36 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 37 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 38 | feat/configurable-message-and-session-limit | origin | TBD | Both _message__limit and session_list_limit must accept positive integers or "none" |
| ☐ | 39 | feat/experimental-dont-cache-command-markdown | origin | TBD | |
| ☐ | 40 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 41 | feat/shell-advice | origin | TBD | Combine with feat/improve-bash-tool-git-advice bash tool description changes |
| ☐ | 42 | feat/improve-bash-tool-git-advice | origin | TBD | Combine with feat/shell-advice bash tool description changes |
| ☐ | 43 | feat/edit-tool-description | origin | TBD | |
| ☐ | 44 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 45 | feat/session-child-toggle-key | origin | TBD | |
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
