# Integration Branch: integration/2026-06-07-00-00

## Merge Checklist

| Status | # | Branch Name | PR | Commit Hash | Description |
|--------|---|-------------|------|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | 6549587221 | Fixed Flag.OPENCODE_EXPERIMENTAL_MARKDOWN -> process.env check |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | f7a3822380 | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | 211 | 5bdea8ce92 | Clean merge |
| ☑ | 4 | feat/base-one-rebrand | 52 | a5ae617aa1 | Clean merge - removes animation effects, adds rebrand |
| ☑ | 5 | feat/sinister-quotes | 73 | 0d8ee0de08 | Clean merge - SINISTER_PLACEHOLDERS in packages/ui/src/constants/placeholders.ts |
| ☑ | 6 | feat/session-grouping | 194 | 48c3c69c7e | Clean merge - session grouping in dialog, sidebar, locale util |
| ☑ | 7 | feat/session-bookmarks | 102 | b12b61e3a2 | Conflict resolution: merged parseSessionTitle + pinned sessions |
| ☑ | 8 | fix/dialog-datetime-alignment | 113 | 8469297763 | Conflict: kept alignment comment in locale.ts |
| ☑ | 9 | feat/keybindable-commands | 48 | b8e8d3ccdf | Conflict: merged markdown toggle + customSlashCommands; fixed undefined command.matcher |
| ☑ | 10 | feat/automatic-list-continuation | 112 | 65d3bee6f4 | Conflict: kept KeyEvent type annotation in prompt |
| ☑ | 11 | feat/continue-command | 11 | 66ae0cf8b5 | Conflicts in prompt.ts: kept lastAssistantForLoop + added overrides to runLoop/loop |
| ☑ | 12 | feat/configurable-snapshot-lifespan | 157 | 3d44f08f91 | Clean merge |
| ☑ | 13 | feat/configurable-new-plan-mode | 143 | Clean merge | Adds plan mode config |
| ☑ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | Clean merge | Updates plan-mode.txt |
| ☑ | 15 | feat/enable-exa-setting | 259 | 994fc83afa | Conflict in config.ts: combined exports; fixed duplicate makeRuntime import |
| ☑ | 16 | feat/canceled-prompts-in-history | 151 | a37589220b | Conflict in app.tsx: combined markdown toggle + clear_prompt_history + customSlashCommands |
| ☑ | 17 | feat/permission-spinner | 36 | Clean merge | |
| ☑ | 18 | feat/opencode-expand | 67 | Clean merge | Adds expand.ts, config/expand.ts, config/substitute.ts |
| ☑ | 19 | refactor/shared-substitute | 203 | 6fd5bd11e9 | Conflicts in substitute.ts and prompt.ts: simple resolution |
| ☑ | 20 | feat/argument-range-syntax | 149 | 674a0edc52 | Complex conflicts in substitute.ts, prompt.ts, substitute.test.ts; fixed duplicate import |
| ☑ | 21 | feat/default-arguments | 217 | c2fe97f623 | Complex conflicts: synthesized whitespace splitting + range syntax + default arguments |
| ☑ | 22 | fix/history-navigation-key-commands | 237 | Clean merge | |
| ☑ | 23 | fix/build-with-short-version | 240 | Clean merge | Adds version.test.ts |
| ☑ | 24 | fix/autocompletion-filtered-order | 76 | b079b52b7c | Conflicts in prompt/index.tsx; fixed Keybind.Info type |
| ☐ | 25 | fix/modal-menus-filtered-order | 77 | TBD | |
| ☐ | 26 | fix/config-package-json-pollution | 176 | TBD | Prevents package.json pollution with non-SemVer versions |
| ☐ | 27 | fix/session-list-viewport-jumping | 197 | TBD | |
| ☐ | 28 | fix/merging-multiple-configs | 205 | TBD | |
| ☐ | 29 | fix/markdown-codeblock-theme-property | 222 | TBD | |
| ☐ | 30 | fix/persist-sidebar | 80 | TBD | Persistent sidebar state; **MUST NOT** return to auto state after show/hide; sidebar **MUST NOT** be affected by window width |
| ☐ | 31 | feat/persist-sidebar-group-folding-states | 98 | TBD | Do not let this get clobbered |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | 71 | TBD | |
| ☐ | 33 | feat/opeoginni--display-message-tps | 83 | TBD | |
| ☐ | 34 | feat/kv-diff-style-clean | 134 | TBD | |
| ☐ | 35 | feat/global-compaction-threshold | 63 | TBD | |
| ☐ | 36 | feat/configurable-message-and-session-limit | 177 | TBD | Both `experimental._message__limit` and `experimental.session_list_limit` **MUST** accept positive integers or "none" |
| ☐ | 37 | feat/experimental-dont-cache-command-markdown | 252 | TBD | |
| ☐ | 38 | feat/jsonc-user-themes | 97 | TBD | |
| ☐ | 39 | feat/improve-shell-tool-git-advice | 279 | TBD | **MUST** combine with feat/shell-tool-unblacklist-fish changes |
| ☐ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | 278 | TBD | **MUST** combine with feat/improve-shell-tool-git-advice changes; **NO** shells blacklisted |
| ☐ | 41 | feat/edit-tool-description | 142 | TBD | |
| ☐ | 42 | feat/renaming-doesnt-close-session-list | 233 | TBD | |
| ☐ | 43 | feat/session-child-toggle-key | 238 | TBD | |
| ☐ | 44 | feat/get-session-title | 144 | TBD | |
| ☐ | 45 | feat/set-session-title | 106 | TBD | |
| ☐ | 46 | feat/no-disabled-lsps-in-sidebar | 186 | TBD | LSPs **MUST NOT** display when disabled in config; do not clobber |
| ☐ | 47 | fix/inline-datetime-no-padding | 275 | TBD | Adds `datetimeCompact()` and `todayTimeOrDateTimeCompact()` to locale.ts; **MUST** be merged before feat/agent-timestamps |
| ☐ | 48 | feat/agent-timestamps | 191 | TBD | **MUST** use `Locale.todayTimeOrDateTimeCompact()` for inline timestamps |
| ☐ | 49 | feat/rewind-modal-option | 192 | TBD | |
| ☐ | 50 | feat/alphabetize-command-palette-groups | 195 | TBD | |
| ☐ | 51 | feat/taller-dialogs | 196 | TBD | |
| ☐ | 52 | feat/add-arianes-themes | 212 | TBD | |
| ☐ | 53 | feat/sidebar-clock | 207 | TBD | |
| ☐ | 54 | feat/alphabetical-message-modal | 219 | TBD | |
| ☐ | 55 | feat/toggle-sidebar-scrollbar | 224 | TBD | |
| ☐ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | TBD | |
| ☐ | 57 | feat/configurable-maximum-prompt-input-size | 242 | TBD | |
| ☐ | 58 | feat/clickable-sidebar-mcps | 227 | TBD | |
| ☐ | 59 | feat/clickable-dialogue-mcps | 225 | TBD | |
| ☐ | 60 | feat/clickable-status-mcps | 241 | TBD | |
| ☐ | 61 | feat/ignored-commands | 216 | TBD | |
| ☐ | 62 | feat/dialogue-background-overlay-setting | 249 | TBD | |
| ☐ | 63 | fix/no-split-database | 235 | TBD | |
| ☐ | 64 | feat/elapsed-timer | 54 | TBD | |
| ☐ | 65 | fix/rfc2119-question-tool | 118 | TBD | |
| ☐ | 66 | feat/sidebar-header-accent-colours | 229 | TBD | |
| ☐ | 67 | feat/distinct-title-colour | 226 | TBD | **MUST** be compatible with feat/session-grouping title formatting |
| ☐ | 68 | feat/tool-output-colour | 230 | TBD | |
| ☐ | 69 | fix/autocompletion-input-enter-keybindings | 277 | TBD | |
| ☐ | 70 | fix/escape-from-status | 245 | TBD | |
| ☐ | 71 | fix/restore-footer | 175 | TBD | Restores footer removed in previous version; **MUST NOT** be clobbered |
| ☐ | 72 | feat/remove-canned-jokes | 247 | TBD | |
| ☐ | 73 | fix/session-list-delete-selection | 255 | TBD | |
| ☐ | 74 | feat/kimi-with-claude-system-prompt | 246 | TBD | |
| ☐ | 75 | fix/less-bottom-padding | 263 | TBD | |
| ☐ | 76 | fix/session-timestamp-regression | 268 | TBD | |
| ☐ | 77 | feat/persistent-session-id-in-sidebar-toggle | 276 | TBD | |
| ☐ | 78 | fix/preserve-quotes-in-arguments | 239 | TBD | |
| ☐ | 79 | feat/command-palette-consistency | 244 | TBD | **MOVE** items from Session to System category; **MUST NOT** duplicate into both categories |
| ☐ | 80 | fix/model-selection-follows-favorite | 280 | TBD | |
| ☐ | 81 | fix/integration-version-plugin-compatibility | 281 | TBD | |
| ☐ | 82 | fix/hide-session-pinning-feature | 282 | TBD | |
| ☐ | 83 | fix/variant-list-toast-no-variants | 283 | TBD | |

## Merge Log

(Details of each merge will be appended here as branches are merged.)
