# Integration Branch: integration/2026-04-18-10-00

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | 59324c1f2c | |
| ☑ | 2 | feat/sinister-quotes | origin | c7db46f47d | Placeholders MUST be SINISTER_PLACEHOLDERS array |
| ☐ | 3 | feat/markdown-renderer | gignit | TBD | |
| ☐ | 4 | feat/thinking-indicator-hidden | rcdailey | TBD | |
| ☐ | 5 | feat/session-grouping | origin | TBD | |
| ☐ | 6 | feat/session-bookmarks | origin | TBD | |
| ☐ | 7 | fix/dialog-datetime-alignment | origin | TBD | Merge immediately after feat/session-bookmarks |
| ☐ | 8 | feat/keybindable-commands | origin | TBD | |
| ☐ | 9 | feat/automatic-list-continuation | origin | TBD | |
| ☐ | 10 | feat/continue-command | origin | TBD | |
| ☐ | 11 | feat/configurable-snapshot-lifespan | origin | TBD | |
| ☐ | 12 | feat/configurable-new-plan-mode | origin | TBD | |
| ☐ | 13 | feat/enable-exa-setting | origin | TBD | |
| ☐ | 14 | feat/canceled-prompts-in-history | origin | TBD | Careful not to clobber this while merging! Merging this branch MUST add the new item to the command palette. |
| ☐ | 15 | feat/permission-spinner | origin | TBD | |
| ☐ | 16 | feat/opencode-expand | origin | TBD | |
| ☐ | 17 | feat/argument-range-syntax | origin | TBD | |
| ☐ | 18 | feat/default-arguments | origin | TBD | When merging this branch, make sure that you don't accidentally reintroduce the swallowing behaviour that the feat/argument-range-syntax branch was meant to eliminate. |
| ☐ | 19 | fix/preserve-quotes-in-arguments | origin | TBD | |
| ☐ | 20 | fix/history-navigation-key-commands | origin | TBD | |
| ☐ | 21 | fix/build-with-short-version | origin | TBD | Automatically uses short timestamp version for integration branches without requiring OPENCODE_VERSION to be set |
| ☐ | 22 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 23 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 24 | fix/config-package-json-pollution | origin | TBD | This branch MUST be included in integration branches to prevent package.json pollution with non-SemVer versions |
| ☐ | 25 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 26 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 27 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 28 | fix/persist-sidebar | origin | TBD | This branch is meant not only to make the sidebar display state persistent across restarts of the program but also to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There MUST NOT be a way to return to the auto state after transitioning to the "show" or "hide" state. This change in the sidebar behaviour MUST NOT be clobbered while merging! |
| ☐ | 29 | feat/persist-sidebar-group-folding-states | origin | TBD | Be sure not to let this feature get clobbered by subsequent merges! |
| ☐ | 30 | feat/command-palette-consistency | origin | TBD | This branch is meant to MOVE several items from the Session category to the System category in the command palette. You MUST NOT duplicate them into both categories when resolving merge conflicts! Additionally, if fix/persist-sidebar was merged previously, be sure to properly move the new logic for the sidebar that it added: no return to "auto" after leaving, et cetera |
| ☐ | 31 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 32 | refactor/shared-substitute | origin | TBD | |
| ☐ | 33 | feat/session-id-in-status | origin | TBD | |
| ☐ | 34 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 35 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 36 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 37 | feat/configurable-message-and-session-limit | origin | TBD | Don't forget that both the `experimental._message__limit` and `experimental.session_list_limit` settings should accept either positive integers or the string value "none"! |
| ☐ | 38 | feat/experimental-dont-cache-command-markdown | origin | TBD | |
| ☐ | 39 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 40 | feat/shell-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/improve-bash-tool-git-advice branch, both sets of changes must be synthesized! |
| ☐ | 41 | feat/improve-bash-tool-git-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/shell-advice branch, both sets of changes must be synthesized! |
| ☐ | 42 | feat/edit-tool-description | origin | TBD | |
| ☐ | 43 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 44 | feat/session-child-toggle-key | origin | TBD | |
| ☐ | 45 | feat/set-session-title | origin | TBD | |
| ☐ | 46 | feat/get-session-title | origin | TBD | |
| ☐ | 47 | feat/no-disabled-lsps-in-sidebar | origin | TBD | |
| ☐ | 48 | feat/agent-timestamps | origin | TBD | |
| ☐ | 49 | feat/rewind-modal-option | origin | TBD | |
| ☐ | 50 | feat/alphabetize-command-palette-groups | origin | TBD | |
| ☐ | 51 | feat/taller-dialogs | origin | TBD | |
| ☐ | 52 | feat/add-arianes-themes | origin | TBD | |
| ☐ | 53 | feat/aspiers--readline-additions | origin | TBD | |
| ☐ | 54 | feat/sidebar-clock | origin | TBD | |
| ☐ | 55 | feat/alphabetical-message-modal | origin | TBD | |
| ☐ | 56 | feat/toggle-sidebar-scrollbar | origin | TBD | |
| ☐ | 57 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD | |
| ☐ | 58 | feat/configurable-maximum-prompt-input-size | origin | TBD | |
| ☐ | 59 | feat/clickable-sidebar-mcps | origin | TBD | |
| ☐ | 60 | feat/clickable-dialogue-mcps | origin | TBD | |
| ☐ | 61 | feat/clickable-status-mcps | origin | TBD | |
| ☐ | 62 | feat/ignored-commands | origin | TBD | |
| ☐ | 63 | feat/dialogue-background-overlay-setting | origin | TBD | |
| ☐ | 64 | fix/no-split-database | origin | TBD | |
| ☐ | 65 | feat/elapsed-timer | origin | TBD | |
| ☐ | 66 | fix/rfc2119-question-tool | origin | TBD | |
| ☐ | 67 | feat/sidebar-header-accent-colours | origin | TBD | |
| ☐ | 68 | feat/distinct-title-colour | origin | TBD | Make sure that this change in the title's colouring is made compatible with the reformatting in grouped session titles that comes from the feat/session-grouping branch, BOTH the distinct colour for the titles AND the formatting of grouped sessions' titles |
| ☐ | 69 | feat/tool-output-colour | origin | TBD | |
| ☐ | 70 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 71 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 72 | fix/escape-from-status | origin | TBD | |
| ☐ | 73 | fix/restore-footer | origin | TBD | As its name suggests, this feature restores the footer that was removed in a previous version; it must not be allowed to be clobbered by other branches when merging! |
| ☐ | 74 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 75 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 76 | fix/less-bottom-padding | origin | TBD | |
| ☐ | 77 | fix/session-list-delete-selection | origin | TBD | |
| ☐ | 78 | fix/no-footer-context-when-sidebar | origin | TBD | |

## Merge Log

| # | Branch | Commit | Notes |
|---|--------|--------|-------|
| 1 | feat/base-one-rebrand | 59324c1f2c | Clean merge |
| 2 | feat/sinister-quotes | c7db46f47d | Clean merge |
