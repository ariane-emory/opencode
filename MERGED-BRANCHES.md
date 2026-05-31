# Integration Branch: integration/2026-05-30-22-14

## Merge Checklist

| Status | # | Branch Name | PR | Commit Hash | Description |
|--------|---|-------------|-----|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | #273 | 7b80805817 | Clean merge. Added Flag import and OPENCODE_EXPERIMENTAL_MARKDOWN flag to fix typecheck |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | #274 | 6b73b95e2d | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | #211 | bb14ba2683 | Clean merge |
| ☑ | 4 | feat/base-one-rebrand | #52 | 0e32fc1d4f | Conflict in flag.ts; resolved by using rebrand's envWithFallback pattern for OPENCODE_EXPERIMENTAL_MARKDOWN |
| ☐ | 5 | feat/sinister-quotes | #73 | TBD | Placeholders MUST be SINISTER_PLACEHOLDERS array; NO OTHER PLACEHOLDER SOURCE/LOCATION IS PERMISSIBLE |
| ☐ | 6 | feat/session-grouping | #194 | TBD | |
| ☐ | 7 | feat/session-bookmarks | #102 | TBD | |
| ☐ | 8 | fix/dialog-datetime-alignment | #113 | TBD | Merge immediately after feat/session-bookmarks; MUST not be clobbered; combine with conflicting features |
| ☐ | 9 | feat/keybindable-commands | #48 | TBD | |
| ☐ | 10 | feat/automatic-list-continuation | #112 | TBD | |
| ☐ | 11 | feat/continue-command | #11 | TBD | |
| ☐ | 12 | feat/configurable-snapshot-lifespan | #157 | TBD | |
| ☐ | 13 | feat/configurable-new-plan-mode | #143 | TBD | |
| ☐ | 14 | feat/improve-experimental-plan-mode-prompt | #232 | TBD | |
| ☐ | 15 | feat/enable-exa-setting | #257 | TBD | |
| ☐ | 16 | feat/canceled-prompts-in-history | #151 | TBD | MUST add new item to command palette; do not clobber |
| ☐ | 17 | feat/permission-spinner | #36 | TBD | |
| ☐ | 18 | feat/opencode-expand | #67 | TBD | |
| ☐ | 19 | refactor/shared-substitute | #203 | TBD | |
| ☐ | 20 | feat/argument-range-syntax | #149 | TBD | |
| ☐ | 21 | feat/default-arguments | #217 | TBD | Do not reintroduce swallowing behaviour that feat/argument-range-syntax eliminated |
| ☐ | 22 | fix/history-navigation-key-commands | #237 | TBD | |
| ☐ | 23 | fix/build-with-short-version | #240 | TBD | Auto uses short timestamp version for integration branches |
| ☐ | 24 | fix/autocompletion-filtered-order | #76 | TBD | |
| ☐ | 25 | fix/modal-menus-filtered-order | #77 | TBD | |
| ☐ | 26 | fix/config-package-json-pollution | #176 | TBD | Prevent package.json pollution with non-SemVer versions |
| ☐ | 27 | fix/session-list-viewport-jumping | #197 | TBD | |
| ☐ | 28 | fix/merging-multiple-configs | #205 | TBD | |
| ☐ | 29 | fix/markdown-codeblock-theme-property | #222 | TBD | |
| ☐ | 30 | fix/persist-sidebar | #80 | TBD | Sidebar display state persistent across restarts; remove auto-hide on narrow terminal; no return to auto state after transitioning |
| ☐ | 31 | feat/persist-sidebar-group-folding-states | #98 | TBD | Do not let this feature get clobbered by subsequent merges |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | #71 | TBD | |
| ☐ | 33 | feat/opeoginni--display-message-tps | #83 | TBD | |
| ☐ | 34 | feat/kv-diff-style-clean | #134 | TBD | |
| ☐ | 35 | feat/global-compaction-threshold | #63 | TBD | |
| ☐ | 36 | feat/configurable-message-and-session-limit | #177 | TBD | Both experimental._message__limit and experimental.session_list_limit accept positive integers or "none" |
| ☐ | 37 | feat/experimental-dont-cache-command-markdown | #252 | TBD | |
| ☐ | 38 | feat/jsonc-user-themes | #97 | TBD | |
| ☐ | 39 | feat/improve-shell-tool-git-advice | #279 | TBD | Combine with feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming changes to shell tool description |
| ☐ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | #278 | TBD | Combine with feat/improve-shell-tool-git-advice; NO shells must be blacklisted |
| ☐ | 41 | feat/edit-tool-description | #142 | TBD | |
| ☐ | 42 | feat/renaming-doesnt-close-session-list | #233 | TBD | |
| ☐ | 43 | feat/session-child-toggle-key | #238 | TBD | |
| ☐ | 44 | feat/get-session-title | #144 | TBD | |
| ☐ | 45 | feat/set-session-title | #106 | TBD | |
| ☐ | 46 | feat/no-disabled-lsps-in-sidebar | #186 | TBD | LSPs must not be displayed in sidebar when disabled in config |
| ☐ | 47 | fix/inline-datetime-no-padding | #275 | TBD | Adds datetimeCompact() and todayTimeOrDateTimeCompact(); MUST be merged before feat/agent-timestamps |
| ☐ | 48 | feat/agent-timestamps | #191 | TBD | MUST use Locale.todayTimeOrDateTimeCompact() not Locale.todayTimeOrDateTime() |
| ☐ | 49 | feat/rewind-modal-option | #192 | TBD | |
| ☐ | 50 | feat/alphabetize-command-palette-groups | #195 | TBD | |
| ☐ | 51 | feat/taller-dialogs | #196 | TBD | |
| ☐ | 52 | feat/add-arianes-themes | #212 | TBD | |
| ☐ | 53 | feat/sidebar-clock | #207 | TBD | |
| ☐ | 54 | feat/alphabetical-message-modal | #219 | TBD | |
| ☐ | 55 | feat/toggle-sidebar-scrollbar | #224 | TBD | |
| ☐ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | #223 | TBD | |
| ☐ | 57 | feat/configurable-maximum-prompt-input-size | #242 | TBD | |
| ☐ | 58 | feat/clickable-sidebar-mcps | #227 | TBD | |
| ☐ | 59 | feat/clickable-dialogue-mcps | #225 | TBD | |
| ☐ | 60 | feat/clickable-status-mcps | #241 | TBD | |
| ☐ | 61 | feat/ignored-commands | #216 | TBD | |
| ☐ | 62 | feat/dialogue-background-overlay-setting | #249 | TBD | |
| ☐ | 63 | fix/no-split-database | #235 | TBD | |
| ☐ | 64 | feat/elapsed-timer | #54 | TBD | |
| ☐ | 65 | fix/rfc2119-question-tool | #118 | TBD | |
| ☐ | 66 | feat/sidebar-header-accent-colours | #229 | TBD | |
| ☐ | 67 | feat/distinct-title-colour | #226 | TBD | Must be compatible with feat/session-grouping title formatting; BOTH distinct colour AND grouped title formatting |
| ☐ | 68 | feat/tool-output-colour | #230 | TBD | |
| ☐ | 69 | fix/autocompletion-input-enter-keybindings | #277 | TBD | |
| ☐ | 70 | fix/escape-from-status | #245 | TBD | |
| ☐ | 71 | fix/restore-footer | #175 | TBD | Restores footer removed in previous version; must not be clobbered |
| ☐ | 72 | feat/remove-canned-jokes | #247 | TBD | |
| ☐ | 73 | fix/session-list-delete-selection | #255 | TBD | |
| ☐ | 74 | feat/kimi-with-claude-system-prompt | #246 | TBD | |
| ☐ | 75 | fix/less-bottom-padding | #263 | TBD | |
| ☐ | 76 | fix/session-timestamp-regression | #268 | TBD | |
| ☐ | 77 | feat/persistent-session-id-in-sidebar-toggle | #276 | TBD | |
| ☐ | 78 | fix/preserve-quotes-in-arguments | #239 | TBD | |
| ☐ | 79 | feat/command-palette-consistency | #244 | TBD | MOVE items from Session to System category; do NOT duplicate; handle fix/persist-sidebar sidebar logic |
| ☐ | 80 | fix/model-selection-follows-favorite | #280 | TBD | |
| ☐ | 81 | fix/integration-version-plugin-compatibility | #281 | TBD | |
| ☐ | 82 | fix/hide-session-pinning-feature | #282 | TBD | |

## Merge Log

Detailed notes on each merge, including any conflict resolutions.
