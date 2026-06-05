# Integration Branch: integration/2026-06-05-08-45

## Merge Checklist

| Status | # | Branch Name | PR | Remote | Commit Hash | Description |
|--------|---|-------------|------|--------|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | origin | 3fb09965c3 | Added Flag import fix for OPENCODE_EXPERIMENTAL_MARKDOWN |
| ☐ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | origin | TBD | |
| ☐ | 3 | feat/aspiers--readline-additions | 211 | origin | TBD | |
| ☐ | 4 | feat/base-one-rebrand | 52 | origin | TBD | REMOVE animation effects on startup art; MUST NOT mess with background colouring of art displayed after exiting |
| ☐ | 5 | feat/sinister-quotes | 73 | origin | TBD | Placeholders MUST be SINISTER_PLACEHOLDERS array |
| ☐ | 6 | feat/session-grouping | 194 | origin | TBD | |
| ☐ | 7 | feat/session-bookmarks | 102 | origin | TBD | |
| ☐ | 8 | fix/dialog-datetime-alignment | 113 | origin | TBD | Merge immediately after feat/session-bookmarks; MUST not be clobbered |
| ☐ | 9 | feat/keybindable-commands | 48 | origin | TBD | |
| ☐ | 10 | feat/automatic-list-continuation | 112 | origin | TBD | |
| ☐ | 11 | feat/continue-command | 11 | origin | TBD | |
| ☐ | 12 | feat/configurable-snapshot-lifespan | 157 | origin | TBD | |
| ☐ | 13 | feat/configurable-new-plan-mode | 143 | origin | TBD | |
| ☐ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | origin | TBD | |
| ☐ | 15 | feat/enable-exa-setting | 257 | origin | TBD | |
| ☐ | 16 | feat/canceled-prompts-in-history | 151 | origin | TBD | MUST add new item to command palette; careful not to clobber |
| ☐ | 17 | feat/permission-spinner | 36 | origin | TBD | |
| ☐ | 18 | feat/opencode-expand | 67 | origin | TBD | |
| ☐ | 19 | refactor/shared-substitute | 203 | origin | TBD | |
| ☐ | 20 | feat/argument-range-syntax | 149 | origin | TBD | |
| ☐ | 21 | feat/default-arguments | 217 | origin | TBD | Don't reintroduce swallowing behaviour that feat/argument-range-syntax eliminated |
| ☐ | 22 | fix/history-navigation-key-commands | 237 | origin | TBD | |
| ☐ | 23 | fix/build-with-short-version | 240 | origin | TBD | Auto uses short timestamp for integration branches |
| ☐ | 24 | fix/autocompletion-filtered-order | 76 | origin | TBD | |
| ☐ | 25 | fix/modal-menus-filtered-order | 77 | origin | TBD | |
| ☐ | 26 | fix/config-package-json-pollution | 176 | origin | TBD | Prevent package.json pollution with non-SemVer versions |
| ☐ | 27 | fix/session-list-viewport-jumping | 197 | origin | TBD | |
| ☐ | 28 | fix/merging-multiple-configs | 205 | origin | TBD | |
| ☐ | 29 | fix/markdown-codeblock-theme-property | 222 | origin | TBD | |
| ☐ | 30 | fix/persist-sidebar | 80 | origin | TBD | Persistent sidebar display state; remove auto-hidden-when-narrow behaviour; no return to auto state after transitioning |
| ☐ | 31 | feat/persist-sidebar-group-folding-states | 98 | origin | TBD | Be sure not to let this feature get clobbered |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | 71 | origin | TBD | |
| ☐ | 33 | feat/opeoginni--display-message-tps | 83 | origin | TBD | |
| ☐ | 34 | feat/kv-diff-style-clean | 134 | origin | TBD | |
| ☐ | 35 | feat/global-compaction-threshold | 63 | origin | TBD | |
| ☐ | 36 | feat/configurable-message-and-session-limit | 177 | origin | TBD | Both experimental._message__limit and experimental.session_list_limit should accept positive integers or "none" |
| ☐ | 37 | feat/experimental-dont-cache-command-markdown | 252 | origin | TBD | |
| ☐ | 38 | feat/jsonc-user-themes | 97 | origin | TBD | |
| ☐ | 39 | feat/improve-shell-tool-git-advice | 279 | origin | TBD | Combine properly with feat/shell-tool-unblacklist-fish changes to shell tool description |
| ☐ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | 278 | origin | TBD | Combine properly with feat/improve-shell-tool-git-advice; NO shells blacklisted |
| ☐ | 41 | feat/edit-tool-description | 142 | origin | TBD | |
| ☐ | 42 | feat/renaming-doesnt-close-session-list | 233 | origin | TBD | |
| ☐ | 43 | feat/session-child-toggle-key | 238 | origin | TBD | |
| ☐ | 44 | feat/get-session-title | 144 | origin | TBD | |
| ☐ | 45 | feat/set-session-title | 106 | origin | TBD | |
| ☐ | 46 | feat/no-disabled-lsps-in-sidebar | 186 | origin | TBD | LSPs not displayed in sidebar when disabled; don't clobber |
| ☐ | 47 | fix/inline-datetime-no-padding | 275 | origin | TBD | Adds datetimeCompact() and todayTimeOrDateTimeCompact(); merge before feat/agent-timestamps |
| ☐ | 48 | feat/agent-timestamps | 191 | origin | TBD | MUST use Locale.todayTimeOrDateTimeCompact() for inline timestamps |
| ☐ | 49 | feat/rewind-modal-option | 192 | origin | TBD | |
| ☐ | 50 | feat/alphabetize-command-palette-groups | 195 | origin | TBD | |
| ☐ | 51 | feat/taller-dialogs | 196 | origin | TBD | |
| ☐ | 52 | feat/add-arianes-themes | 212 | origin | TBD | |
| ☐ | 53 | feat/sidebar-clock | 207 | origin | TBD | |
| ☐ | 54 | feat/alphabetical-message-modal | 219 | origin | TBD | |
| ☐ | 55 | feat/toggle-sidebar-scrollbar | 224 | origin | TBD | |
| ☐ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | origin | TBD | |
| ☐ | 57 | feat/configurable-maximum-prompt-input-size | 242 | origin | TBD | |
| ☐ | 58 | feat/clickable-sidebar-mcps | 227 | origin | TBD | |
| ☐ | 59 | feat/clickable-dialogue-mcps | 225 | origin | TBD | |
| ☐ | 60 | feat/clickable-status-mcps | 241 | origin | TBD | |
| ☐ | 61 | feat/ignored-commands | 216 | origin | TBD | |
| ☐ | 62 | feat/dialogue-background-overlay-setting | 249 | origin | TBD | |
| ☐ | 63 | fix/no-split-database | 235 | origin | TBD | |
| ☐ | 64 | feat/elapsed-timer | 54 | origin | TBD | |
| ☐ | 65 | fix/rfc2119-question-tool | 118 | origin | TBD | |
| ☐ | 66 | feat/sidebar-header-accent-colours | 229 | origin | TBD | |
| ☐ | 67 | feat/distinct-title-colour | 226 | origin | TBD | Must be compatible with session-grouping title formatting |
| ☐ | 68 | feat/tool-output-colour | 230 | origin | TBD | |
| ☐ | 69 | fix/autocompletion-input-enter-keybindings | 277 | origin | TBD | |
| ☐ | 70 | fix/escape-from-status | 245 | origin | TBD | |
| ☐ | 71 | fix/restore-footer | 175 | origin | TBD | Restores footer; must not be clobbered |
| ☐ | 72 | feat/remove-canned-jokes | 247 | origin | TBD | |
| ☐ | 73 | fix/session-list-delete-selection | 255 | origin | TBD | |
| ☐ | 74 | feat/kimi-with-claude-system-prompt | 246 | origin | TBD | |
| ☐ | 75 | fix/less-bottom-padding | 263 | origin | TBD | |
| ☐ | 76 | fix/session-timestamp-regression | 268 | origin | TBD | |
| ☐ | 77 | feat/persistent-session-id-in-sidebar-toggle | 276 | origin | TBD | |
| ☐ | 78 | fix/preserve-quotes-in-arguments | 239 | origin | TBD | |
| ☐ | 79 | feat/command-palette-consistency | 244 | origin | TBD | MOVE items from Session to System category; MUST NOT duplicate into both; properly move persist-sidebar logic |
| ☐ | 80 | fix/model-selection-follows-favorite | 280 | origin | TBD | |
| ☐ | 81 | fix/integration-version-plugin-compatibility | 281 | origin | TBD | |
| ☐ | 82 | fix/hide-session-pinning-feature | 282 | origin | TBD | |
| ☐ | 83 | fix/variant-list-toast-no-variants | 283 | origin | TBD | |

## Merge Log

### Branch 1: feat/gignit--markdown-renderer (PR#273)
- Merged cleanly with --no-ff
- Fix: Added `Flag` import and `OPENCODE_EXPERIMENTAL_MARKDOWN` flag getter to fix typecheck
