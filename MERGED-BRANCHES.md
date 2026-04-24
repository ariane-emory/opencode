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
| ☐ | 28 | fix/persist-sidebar | origin | TBD | This branch is meant not only to make the sidebar display state persistent across restarts if the program but also to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There MUST NOT be a way to return to the auto state after transitioning to the "show" or "hide" state. This change in the sidebar behaviour MUST NOT be clobbered while merging! |
| ☐ | 29 | feat/persist-sidebar-group-folding-states | origin | TBD | Be sure not to let this feature get clobbered by subsequent merges! |
| ☐ | 30 | feat/command-palette-consistency | origin | TBD | This branch is meant to MOVE several items from the Session category to the System category in the command palette. You MUST NOT duplicate them into both categories when resolving merge conflicts! Additionally, if fix/persist-sidebar was merged previously, be sure to properly move the new logic for the sidebar that it added: no return to "auto" after leaving, et cetera |
| ☐ | 31 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 32 | refactor/shared-substitute | origin | TBD | |
| ☐ | 33 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 34 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 35 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 36 | feat/configurable-message-and-session-limit | origin | TBD | Don't forget that both the `experimental._message__limit` and `experimental.session_list_limit` settings should accept either positive integers or the string value "none"! |
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

