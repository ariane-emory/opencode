# Integration Branch: integration/2026-05-19-16-17

## Merge Checklist

| Status | # | Branch Name | PR | Remote | Commit Hash | Description |
|--------|---|-------------|----|--------|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | origin | 3e7ea8950a | Added missing Flag.OPENCODE_EXPERIMENTAL_MARKDOWN and import |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | origin | eb3bc40415 | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | 211 | origin | 4da0c72432 | Clean merge |
| ☐ | 4 | feat/base-one-rebrand | 52 | origin | TBD | remember that, amongst it's many other changes, this branch is meant to REMOVE the animation effects on the art on the startup screen, and that you MUST NOT do anything that could mess with the background colouring of the art that is displayed after exiting the program! |
| ☐ | 5 | feat/sinister-quotes | 73 | origin | TBD | the placeholders used MUST be the SINISTER_PLACEHOLDERS array in this branch's packages/ui/src/constants/placeholders.ts file, NO OTHER PLACEHOLDER SOURCE/LOCATION IS PERMISSIBLE! |
| ☐ | 6 | feat/session-grouping | 194 | origin | TBD |  |
| ☐ | 7 | feat/session-bookmarks | 102 | origin | TBD |  |
| ☐ | 8 | fix/dialog-datetime-alignment | 113 | origin | TBD | for best results, merge this one immediately after feat/session-bookmarks. This feature MUST not be clobbered; if there is a conflict, it MUST be combined with the other feature with which it is conflicting! |
| ☐ | 9 | feat/keybindable-commands | 48 | origin | TBD |  |
| ☐ | 10 | feat/automatic-list-continuation | 112 | origin | TBD |  |
| ☐ | 11 | feat/continue-command | 11 | origin | TBD |  |
| ☐ | 12 | feat/configurable-snapshot-lifespan | 157 | origin | TBD |  |
| ☐ | 13 | feat/configurable-new-plan-mode | 143 | origin | TBD |  |
| ☐ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | origin | TBD |  |
| ☐ | 15 | feat/enable-exa-setting | 257 | origin | TBD |  |
| ☐ | 16 | feat/canceled-prompts-in-history | 151 | origin | TBD | Careful not to clobber this while merging! Merging this branch MUST add the new item to the command palette. |
| ☐ | 17 | feat/permission-spinner | 36 | origin | TBD |  |
| ☐ | 18 | feat/opencode-expand | 67 | origin | TBD |  |
| ☐ | 19 | refactor/shared-substitute | 203 | origin | TBD |  |
| ☐ | 20 | feat/argument-range-syntax | 149 | origin | TBD |  |
| ☐ | 21 | feat/default-arguments | 217 | origin | TBD | When merging this branch, make sure that you don't accidentally reintroduce the swallowing behaviour that the feat/argument-range-syntax branch was meant to eliminate. |
| ☐ | 22 | fix/history-navigation-key-commands | 237 | origin | TBD |  |
| ☐ | 23 | fix/build-with-short-version | 240 | origin | TBD | Automatically uses short timestamp version for integration branches without requiring OPENCODE_VERSION to be set |
| ☐ | 24 | fix/autocompletion-filtered-order | 76 | origin | TBD |  |
| ☐ | 25 | fix/modal-menus-filtered-order | 77 | origin | TBD |  |
| ☐ | 26 | fix/config-package-json-pollution | 176 | origin | TBD | This branch MUST be included in integration branches to prevent package.json pollution with non-SemVer versions |
| ☐ | 27 | fix/session-list-viewport-jumping | 197 | origin | TBD |  |
| ☐ | 28 | fix/merging-multiple-configs | 205 | origin | TBD |  |
| ☐ | 29 | fix/markdown-codeblock-theme-property | 222 | origin | TBD |  |
| ☐ | 30 | fix/persist-sidebar | 80 | origin | TBD | This branch is meant not only to make the sidebar display state persistent across bestarts if the progran but also  to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There MUST NOT be a way to return to the auto state after transitioning to the "show" or "hide" state. This change in the sidebar behaviour MUST NOT be clobbered while merging! |
| ☐ | 31 | feat/persist-sidebar-group-folding-states | 98 | origin | TBD |  |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | 71 | origin | TBD |  |
| ☐ | 33 | feat/opeoginni--display-message-tps | 83 | origin | TBD |  |
| ☐ | 34 | feat/kv-diff-style-clean | 134 | origin | TBD |  |
| ☐ | 35 | feat/global-compaction-threshold | 63 | origin | TBD |  |
| ☐ | 36 | feat/configurable-message-and-session-limit | 177 | origin | TBD | Don't forget that both the `experimental._message__limit` and `experimental.session_list_limit` settings should accept either positive integers or the string value "none"! |
| ☐ | 37 | feat/experimental-dont-cache-command-markdown | 252 | origin | TBD |  |
| ☐ | 38 | feat/jsonc-user-themes | 97 | origin | TBD |  |
| ☐ | 39 | feat/improve-shell-tool-git-advice | 279 | origin | TBD |  |
| ☐ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | 278 | origin | TBD |  |
| ☐ | 41 | feat/edit-tool-description | 142 | origin | TBD |  |
| ☐ | 42 | feat/renaming-doesnt-close-session-list | 233 | origin | TBD |  |
| ☐ | 43 | feat/session-child-toggle-key | 238 | origin | TBD |  |
| ☐ | 44 | feat/get-session-title | 144 | origin | TBD |  |
| ☐ | 45 | feat/set-session-title | 106 | origin | TBD |  |
| ☐ | 46 | feat/no-disabled-lsps-in-sidebar | 186 | origin | TBD |  |
| ☐ | 47 | fix/inline-datetime-no-padding | 275 | origin | TBD | This branch adds `datetimeCompact()` and `todayTimeOrDateTimeCompact()` to `packages/opencode/src/util/locale.ts`. It MUST be merged before `feat/agent-timestamps` so that the compact datetime functions are available for inline timestamps. |
| ☐ | 48 | feat/agent-timestamps | 191 | origin | TBD | This branch adds inline timestamps to agent messages. It MUST use `Locale.todayTimeOrDateTimeCompact()` instead of `Locale.todayTimeOrDateTime()` for inline timestamps to avoid space-padding on single-digit days (e.g., "5/ 6/2026"). The compact variant is defined in `packages/opencode/src/util/locale.ts` and must be available before this branch is merged. |
| ☐ | 49 | feat/rewind-modal-option | 192 | origin | TBD |  |
| ☐ | 50 | feat/alphabetize-command-palette-groups | 195 | origin | TBD |  |
| ☐ | 51 | feat/taller-dialogs | 196 | origin | TBD |  |
| ☐ | 52 | feat/add-arianes-themes | 212 | origin | TBD |  |
| ☐ | 53 | feat/sidebar-clock | 207 | origin | TBD |  |
| ☐ | 54 | feat/alphabetical-message-modal | 219 | origin | TBD |  |
| ☐ | 55 | feat/toggle-sidebar-scrollbar | 224 | origin | TBD |  |
| ☐ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | origin | TBD |  |
| ☐ | 57 | feat/configurable-maximum-prompt-input-size | 242 | origin | TBD |  |
| ☐ | 58 | feat/clickable-sidebar-mcps | 227 | origin | TBD |  |
| ☐ | 59 | feat/clickable-dialogue-mcps | 225 | origin | TBD |  |
| ☐ | 60 | feat/clickable-status-mcps | 241 | origin | TBD |  |
| ☐ | 61 | feat/ignored-commands | 216 | origin | TBD |  |
| ☐ | 62 | feat/dialogue-background-overlay-setting | 249 | origin | TBD |  |
| ☐ | 63 | fix/no-split-database | 235 | origin | TBD |  |
| ☐ | 64 | feat/elapsed-timer | 54 | origin | TBD |  |
| ☐ | 65 | fix/rfc2119-question-tool | 118 | origin | TBD |  |
| ☐ | 66 | feat/sidebar-header-accent-colours | 229 | origin | TBD |  |
| ☐ | 67 | feat/distinct-title-colour | 226 | origin | TBD | Make sure that this change in the title's colouring is made compatible with the reformatting in grouped session titles that comes from the feat/session-grouping branch, BOTH the distinct colour for the titles AND the formatting of grouped sessions' titles |
| ☐ | 68 | feat/tool-output-colour | 230 | origin | TBD |  |
| ☐ | 69 | fix/autocompletion-input-enter-keybindings | 277 | origin | TBD |  |
| ☐ | 70 | fix/escape-from-status | 245 | origin | TBD |  |
| ☐ | 71 | fix/restore-footer | 175 | origin | TBD | As its name suggests, this feature restores the footer it was removed in a previous version; it must not be allowed to be clobbered by other branches when merging! |
| ☐ | 72 | feat/remove-canned-jokes | 247 | origin | TBD |  |
| ☐ | 73 | fix/session-list-delete-selection | 255 | origin | TBD |  |
| ☐ | 74 | feat/kimi-with-claude-system-prompt | 246 | origin | TBD |  |
| ☐ | 75 | fix/less-bottom-padding | 263 | origin | TBD |  |
| ☐ | 76 | fix/session-timestamp-regression | 268 | origin | TBD |  |
| ☐ | 77 | feat/persistent-session-id-in-sidebar-toggle | 276 | origin | TBD |  |
| ☐ | 78 | fix/preserve-quotes-in-arguments | 239 | origin | TBD |  |
| ☐ | 79 | feat/command-palette-consistency | 244 | origin | TBD | to prevent recurence of a past mistake: this branch is meant to MOVE several items from the Session category to the System category in the command palette. You MUST NOT duplicate them into both categories when resolving merge conflicts! Additionally, if fix/persist-sidebar was merged previously, be sue to properly move the new logic for the sidebar that it added: no return to "auto" after leaving, et cetera |
| ☐ | 80 | fix/model-selection-follows-favorite | 280 | origin | TBD |  |

## Merge Log

