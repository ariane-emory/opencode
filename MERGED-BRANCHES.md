# Integration Branch: integration/2026-05-13-14-25

## Merge Checklist

| Status | # | Branch Name | PR | Remote | Commit Hash | Description |
|--------|---|-------------|--------|----|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | origin | 0b32419385 | Clean merge |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | origin | d38a36c8f1 | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | 211 | origin | 970eadce1e | Clean merge |
| ☑ | 4 | feat/base-one-rebrand | 52 | origin | d519ad267e | Conflicts: removed bg-pulse import from dialog-retry-action, fixed test type mismatches (active->beta status) |
| ☑ | 5 | feat/sinister-quotes | 73 | origin | d468d5c2af | Clean merge |
| ☑ | 6 | feat/session-grouping | 194 | origin | 73f6cf8c9b | Clean merge |
| ☑ | 7 | feat/session-bookmarks | 102 | origin | 21c114d05a | Conflicts: combined session-grouping + bookmarks features in dialog-session-list.tsx, locale.ts |
| ☑ | 8 | fix/dialog-datetime-alignment | 113 | origin | 99e7eada9e | Conflicts: locale.ts comment |
| ☐ | 9 | feat/keybindable-commands | 48 | origin | TBD | |
| ☐ | 10 | feat/automatic-list-continuation | 112 | origin | TBD | |
| ☐ | 11 | feat/continue-command | 11 | origin | TBD | |
| ☐ | 12 | feat/configurable-snapshot-lifespan | 157 | origin | TBD | |
| ☐ | 13 | feat/configurable-new-plan-mode | 143 | origin | TBD | |
| ☐ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | origin | TBD | |
| ☐ | 15 | feat/enable-exa-setting | 257 | origin | TBD | |
| ☐ | 16 | feat/canceled-prompts-in-history | 151 | origin | TBD | MUST add new item to command palette. Careful not to clobber! |
| ☐ | 17 | feat/permission-spinner | 36 | origin | TBD | |
| ☐ | 18 | feat/opencode-expand | 67 | origin | TBD | |
| ☐ | 19 | refactor/shared-substitute | 203 | origin | TBD | |
| ☐ | 20 | feat/argument-range-syntax | 149 | origin | TBD | |
| ☐ | 21 | feat/default-arguments | 217 | origin | TBD | Don't reintroduce swallowing behaviour that feat/argument-range-syntax eliminated! |
| ☐ | 22 | fix/history-navigation-key-commands | 237 | origin | TBD | |
| ☐ | 23 | fix/build-with-short-version | 240 | origin | TBD | Uses short timestamp version for integration branches without requiring OPENCODE_VERSION |
| ☐ | 24 | fix/autocompletion-filtered-order | 76 | origin | TBD | |
| ☐ | 25 | fix/modal-menus-filtered-order | 77 | origin | TBD | |
| ☐ | 26 | fix/config-package-json-pollution | 176 | origin | TBD | MUST be included to prevent package.json pollution with non-SemVer versions |
| ☐ | 27 | fix/session-list-viewport-jumping | 197 | origin | TBD | |
| ☐ | 28 | fix/merging-multiple-configs | 205 | origin | TBD | |
| ☐ | 29 | fix/markdown-codeblock-theme-property | 222 | origin | TBD | |
| ☐ | 30 | fix/persist-sidebar | 80 | origin | TBD | Persistent sidebar state across restarts. Removes auto-hide when terminal not wide enough. No return to auto state after show/hide! |
| ☐ | 31 | feat/persist-sidebar-group-folding-states | 98 | origin | TBD | Don't let this get clobbered by subsequent merges! |
| ☐ | 32 | feat/command-palette-consistency | 244 | origin | TBD | MOVE items from Session to System category. MUST NOT duplicate into both! Properly move sidebar logic from fix/persist-sidebar. |
| ☐ | 33 | feat/persistant-sidebar-overlay-behaviour | 71 | origin | TBD | |
| ☐ | 34 | feat/opeoginni--display-message-tps | 83 | origin | TBD | |
| ☐ | 35 | feat/kv-diff-style-clean | 134 | origin | TBD | |
| ☐ | 36 | feat/global-compaction-threshold | 63 | origin | TBD | |
| ☐ | 37 | feat/configurable-message-and-session-limit | 177 | origin | TBD | Both experimental._message__limit and experimental.session_list_limit accept positive integers or "none"! |
| ☐ | 38 | feat/experimental-dont-cache-command-markdown | 252 | origin | TBD | |
| ☐ | 39 | feat/jsonc-user-themes | 97 | origin | TBD | |
| ☐ | 40 | feat/improve-bash-tool-git-advice | 215 | origin | TBD | Combine with feat/shell-advice bash tool description changes! |
| ☐ | 41 | feat/shell-advice | 28 | origin | TBD | Combine with feat/improve-bash-tool-git-advice bash tool description changes! NO shells blacklisted! |
| ☐ | 42 | feat/edit-tool-description | 142 | origin | TBD | |
| ☐ | 43 | feat/renaming-doesnt-close-session-list | 233 | origin | TBD | |
| ☐ | 44 | feat/session-child-toggle-key | 238 | origin | TBD | |
| ☐ | 45 | feat/get-session-title | 144 | origin | TBD | |
| ☐ | 46 | feat/set-session-title | 106 | origin | TBD | |
| ☐ | 47 | feat/no-disabled-lsps-in-sidebar | 186 | origin | TBD | LSPs not displayed in sidebar when disabled in config. Don't clobber! |
| ☐ | 48 | fix/inline-datetime-no-padding | 275 | origin | TBD | Adds datetimeCompact() and todayTimeOrDateTimeCompact(). MUST be merged before feat/agent-timestamps! |
| ☐ | 49 | feat/agent-timestamps | 191 | origin | TBD | MUST use Locale.todayTimeOrDateTimeCompact() for inline timestamps, not todayTimeOrDateTime()! |
| ☐ | 50 | feat/rewind-modal-option | 192 | origin | TBD | |
| ☐ | 51 | feat/alphabetize-command-palette-groups | 195 | origin | TBD | |
| ☐ | 52 | feat/taller-dialogs | 196 | origin | TBD | |
| ☐ | 53 | feat/add-arianes-themes | 212 | origin | TBD | |
| ☐ | 54 | feat/sidebar-clock | 207 | origin | TBD | |
| ☐ | 55 | feat/alphabetical-message-modal | 219 | origin | TBD | |
| ☐ | 56 | feat/toggle-sidebar-scrollbar | 224 | origin | TBD | |
| ☐ | 57 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | origin | TBD | |
| ☐ | 58 | feat/configurable-maximum-prompt-input-size | 242 | origin | TBD | |
| ☐ | 59 | feat/clickable-sidebar-mcps | 227 | origin | TBD | |
| ☐ | 60 | feat/clickable-dialogue-mcps | 225 | origin | TBD | |
| ☐ | 61 | feat/clickable-status-mcps | 241 | origin | TBD | |
| ☐ | 62 | feat/ignored-commands | 216 | origin | TBD | |
| ☐ | 63 | feat/dialogue-background-overlay-setting | 249 | origin | TBD | |
| ☐ | 64 | fix/no-split-database | 235 | origin | TBD | |
| ☐ | 65 | feat/elapsed-timer | 54 | origin | TBD | |
| ☐ | 66 | fix/rfc2119-question-tool | 118 | origin | TBD | |
| ☐ | 67 | feat/sidebar-header-accent-colours | 229 | origin | TBD | |
| ☐ | 68 | feat/distinct-title-colour | 226 | origin | TBD | Must be compatible with feat/session-grouping grouped title formatting! BOTH distinct colour AND grouped formatting! |
| ☐ | 69 | feat/tool-output-colour | 230 | origin | TBD | |
| ☐ | 70 | fix/input-enter-keybindings | 243 | origin | TBD | |
| ☐ | 71 | fix/escape-from-status | 245 | origin | TBD | |
| ☐ | 72 | fix/restore-footer | 175 | origin | TBD | Restores previously removed footer. MUST NOT be clobbered! |
| ☐ | 73 | feat/remove-canned-jokes | 247 | origin | TBD | |
| ☐ | 74 | fix/session-list-delete-selection | 255 | origin | TBD | |
| ☐ | 75 | feat/kimi-with-claude-system-prompt | 246 | origin | TBD | |
| ☐ | 76 | fix/less-bottom-padding | 263 | origin | TBD | |
| ☐ | 77 | fix/session-timestamp-regression | 268 | origin | TBD | |
| ☐ | 78 | feat/persistent-session-id-in-sidebar-toggle | 276 | origin | TBD | |
| ☐ | 79 | fix/preserve-quotes-in-arguments | 239 | origin | TBD | |

## Merge Log

