# Integration Branch: integration/2026-04-06-13-24

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | 2d2fc335c5 | merged cleanly |
| ☑ | 2 | feat/sinister-quotes | origin | 8c164617a7 | verified SINISTER_PLACEHOLDERS source |
| ☑ | 3 | feat/markdown-renderer | gignit | f2bb02ce81 | conflict resolved in session route imports and markdown rendering |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | 6c0f983f67 | merged cleanly |
| ☑ | 5 | feat/session-grouping | origin | fe4280bb33 | merged cleanly |
| ☑ | 6 | feat/session-bookmarks | origin | ef669d4b73 | combined bookmarks with grouped session title display |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | b8871b4225 | merged after bookmarks; datetime alignment preserved |
| ☑ | 8 | feat/keybindable-commands | origin | 431032c56c | merged cleanly |
| ☑ | 9 | feat/automatic-list-continuation | origin | cef5387a81 | merged cleanly |
| ☑ | 10 | feat/continue-command | origin | 514f4430bf | merged cleanly |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | 0cd1199c59 | merged cleanly |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | b1f5936529 | merged cleanly |
| ☑ | 13 | feat/enable-exa-setting | origin | 750bf1ca6b | combined enable_exa with plan_mode config support |
| ☑ | 14 | feat/canceled-prompts-in-history | origin | 97a94571a4 | kept command palette item and canceled prompt history behavior |
| ☑ | 15 | feat/permission-spinner | origin | fd3b710806 | merged cleanly |
| ☑ | 16 | feat/opencode-expand | origin | 7df86edd87 | merged with existing session prompt command expansion preserved |
| ☑ | 17 | feat/argument-range-syntax | origin | a813a55478 | merged with non-swallowing range placeholder syntax |
| ☑ | 18 | feat/default-arguments | origin | 6a4b0346e9 | combined default placeholders with non-swallowing range syntax |
| ☑ | 19 | fix/preserve-quotes-in-arguments | origin | b3076f0662 | resolved prompt conflict while keeping quote-preserving argument parsing |
| ☑ | 20 | fix/history-navigation-key-commands | origin | 4fa3d4b07b | merged cleanly |
| ☑ | 21 | fix/build-with-short-version | origin | 1cebc3b098 | merged cleanly; short integration timestamp version preserved |
| ☑ | 22 | fix/autocompletion-filtered-order | origin | d09c986062 | resolved prompt conflict while preserving current placeholder and list continuation behavior |
| ☑ | 23 | fix/modal-menus-filtered-order | origin | d8155cff0b | merged cleanly |
| ☑ | 24 | fix/config-package-json-pollution | origin | 022a5c194d | merged cleanly; package.json pollution fix preserved |
| ☑ | 25 | fix/session-list-viewport-jumping | origin | d2679705eb | merged cleanly |
| ☑ | 26 | fix/merging-multiple-configs | origin | b72c6d2068 | merged with RawInfo restoration for config parsing |
| ☑ | 27 | fix/markdown-codeblock-theme-property | origin | 463a752d65 | merged cleanly |
| ☑ | 28 | fix/persist-sidebar | origin | 62a4c67f69 | preserved persistent sidebar state and no-return-to-auto behavior |
| ☑ | 29 | feat/persist-sidebar-group-folding-states | origin | 72912f3c2f | merged cleanly; group folding persistence preserved |
| ☑ | 30 | feat/permission-indicator-in-sidebar | origin | 8731e53a60 | combined grouped title formatting with sidebar permission indicator |
| ☑ | 31 | feat/command-palette-consistency | origin | a0165409e9 | moved palette items to System and preserved persist-sidebar behavior |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | 9c43996c78 | merged with sidebar overlay behavior and header toggle preserved |
| ☑ | 33 | refactor/shared-substitute | origin | 9db11d4503 | resolved substitute conflicts preserving range/default and quote-safe behavior |
| ☑ | 34 | feat/session-id-in-status | origin | c41362a21c | merged cleanly |
| ☑ | 35 | feat/opeoginni--display-message-tps | origin | 76a3367f11 | resolved app conflict and preserved tps toggle |
| ☐ | 36 | feat/kv-diff-style-clean | origin | TBD |  |
| ☐ | 37 | feat/global-compaction-threshold | origin | TBD |  |
| ☐ | 38 | feat/configurable-message-and-session-limit | origin | TBD | Don't forget that both the `experimental._message__limit` and `experimental.session_list_limit` settings should accept either positive integers or the string value "none"! |
| ☐ | 39 | feat/experimental-dont-cache-command-markdown | origin | TBD |  |
| ☐ | 40 | feat/jsonc-user-themes | origin | TBD |  |
| ☐ | 41 | feat/shell-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/improve-bash-tool-git-advice branch, both sets of changes must be synthesized! |
| ☐ | 42 | feat/improve-bash-tool-git-advice | origin | TBD | Make sure to combine this properly with the changes to the bash tool's description that are made in the feat/shell-advice branch, both sets of changes must be synthesized! |
| ☐ | 43 | feat/edit-tool-description | origin | TBD |  |
| ☐ | 44 | feat/renaming-doesnt-close-session-list | origin | TBD |  |
| ☐ | 45 | feat/session-child-toggle-key | origin | TBD |  |
| ☐ | 46 | feat/set-session-title | origin | TBD |  |
| ☐ | 47 | feat/get-session-title | origin | TBD |  |
| ☐ | 48 | feat/no-disabled-lsps-in-sidebar | origin | TBD |  |
| ☐ | 49 | feat/agent-timestamps | origin | TBD |  |
| ☐ | 50 | feat/rewind-modal-option | origin | TBD |  |
| ☐ | 51 | feat/alphabetize-command-palette-groups | origin | TBD |  |
| ☐ | 52 | feat/taller-dialogs | origin | TBD |  |
| ☐ | 53 | feat/add-arianes-themes | origin | TBD |  |
| ☐ | 54 | feat/aspiers--readline-additions | origin | TBD |  |
| ☐ | 55 | feat/sidebar-clock | origin | TBD |  |
| ☐ | 56 | feat/alphabetical-message-modal | origin | TBD |  |
| ☐ | 57 | feat/toggle-sidebar-scrollbar | origin | TBD |  |
| ☐ | 58 | feat/full-datetimes-in-fork-and-timeline-dialogues | origin | TBD |  |
| ☐ | 59 | feat/configurable-maximum-prompt-input-size | origin | TBD |  |
| ☐ | 60 | fix/always-allow-folding-sidebar-mcps | origin | TBD |  |
| ☐ | 61 | feat/clickable-sidebar-mcps | origin | TBD |  |
| ☐ | 62 | feat/clickable-dialogue-mcps | origin | TBD |  |
| ☐ | 63 | feat/clickable-status-mcps | origin | TBD |  |
| ☐ | 64 | feat/ignored-commands | origin | TBD |  |
| ☐ | 65 | feat/dialogue-background-overlay-setting | origin | TBD |  |
| ☐ | 66 | fix/no-split-database | origin | TBD |  |
| ☐ | 67 | feat/elapsed-timer | origin | TBD |  |
| ☐ | 68 | fix/rfc2119-question-tool | origin | TBD |  |
| ☐ | 69 | feat/sidebar-header-accent-colours | origin | TBD |  |
| ☐ | 70 | feat/distinct-title-colour | origin | TBD | Make sure that this change in the title's colouring is made compatible with the reformatting in grouped session titles that comes from the feat/session-grouping branch, **BOTH** the distinct colour for the titles **AND** the formatting of grouped sessions' titles |
| ☐ | 71 | feat/tool-output-colour | origin | TBD |  |
| ☐ | 72 | feat/improve-experimental-plan-mode-prompt | origin | TBD |  |
| ☐ | 73 | fix/input-enter-keybindings | origin | TBD |  |
| ☐ | 74 | fix/escape-from-status | origin | TBD |  |
| ☐ | 75 | fix/restore-footer | origin | TBD | As its name suggests, this feature restores the footer it was removed in a previous version; it must not be allowed to be clobbered by other branches when merging! |
| ☐ | 76 | feat/remove-canned-jokes | origin | TBD |  |
| ☐ | 77 | fix/session-list-delete-selection | origin | TBD |  |
| ☐ | 78 | feat/allow-variant_list-keybinding | origin | TBD |  |
| ☐ | 79 | feat/kimi-with-claude-system-prompt | origin | TBD |  |
| ☐ | 80 | fix/less-bottom-padding | origin | TBD |  |
| ☐ | 81 | fix/no-footer-context-when-sidebar | origin | TBD |  |

## Merge Log

- feat/base-one-rebrand: merged 2d2fc335c5; clean merge.
- feat/sinister-quotes: merged 8c164617a7; verified SINISTER_PLACEHOLDERS in packages/ui/src/constants/placeholders.ts.
- feat/markdown-renderer: merged f2bb02ce81; resolved conflict in packages/opencode/src/cli/cmd/tui/routes/session/index.tsx to keep existing session UI behavior and add markdown renderer support.
- feat/thinking-indicator-hidden: merged 6c0f983f67; clean merge.
- feat/session-grouping: merged fe4280bb33; clean merge.
- feat/session-bookmarks: merged ef669d4b73; resolved conflicts in packages/opencode/src/cli/cmd/tui/component/dialog-session-list.tsx and packages/opencode/src/util/locale.ts to keep grouped titles and add bookmark categories.
- fix/dialog-datetime-alignment: merged b8871b4225; kept datetime alignment immediately after bookmarks merge.
- feat/keybindable-commands: merged 431032c56c; clean merge.
- feat/automatic-list-continuation: merged cef5387a81; clean merge.
- feat/continue-command: merged 514f4430bf; clean merge.
- feat/configurable-snapshot-lifespan: merged 0cd1199c59; clean merge.
- feat/configurable-new-plan-mode: merged b1f5936529; clean merge.
- feat/enable-exa-setting: merged 750bf1ca6b; resolved config conflict to keep experimental plan mode and add experimental enable_exa support.
- feat/canceled-prompts-in-history: merged 97a94571a4; resolved app command palette conflict to keep markdown toggle and add cleared-prompt history toggle.
- feat/permission-spinner: merged fd3b710806; clean merge.
- feat/opencode-expand: merged 7df86edd87; resolved session prompt import conflict without dropping existing command expansion logic.
- feat/argument-range-syntax: merged a813a55478; resolved substitute helper conflicts to preserve non-swallowing $N behavior and add range placeholder syntax.
- feat/default-arguments: merged 6a4b0346e9; resolved substitute conflicts to add default placeholders without reintroducing swallowing behavior.
- fix/preserve-quotes-in-arguments: merged b3076f0662; resolved session prompt conflict to keep quote-preserving argument parsing with current substitute helper flow.
- fix/history-navigation-key-commands: merged 4fa3d4b07b; clean merge.
- fix/build-with-short-version: merged 1cebc3b098; clean merge.
- fix/autocompletion-filtered-order: merged d09c986062; resolved prompt conflict to keep existing placeholder/list continuation behavior and add filtered ordering fixes.
- fix/modal-menus-filtered-order: merged d8155cff0b; clean merge.
- fix/config-package-json-pollution: merged 022a5c194d; clean merge.
- fix/session-list-viewport-jumping: merged d2679705eb; clean merge.
- fix/merging-multiple-configs: merged b72c6d2068; restored RawInfo schema for merged config parsing.
- fix/markdown-codeblock-theme-property: merged 463a752d65; clean merge.
- fix/persist-sidebar: merged 62a4c67f69; resolved prompt conflict while preserving persistent sidebar behavior with no return to auto after explicit toggle.
- feat/persist-sidebar-group-folding-states: merged 72912f3c2f; clean merge.
- feat/permission-indicator-in-sidebar: merged 8731e53a60; resolved sidebar conflict to keep grouped title formatting and add permission indicator.
- feat/command-palette-consistency: merged a0165409e9; resolved app and session palette conflicts to move items into System without duplication and preserve no-return-to-auto sidebar behavior.
- feat/persistant-sidebar-overlay-behaviour: merged 9c43996c78; resolved session route conflict to keep overlay behavior and header toggle without reintroducing moved palette items.
- refactor/shared-substitute: merged 9db11d4503; kept shared substitute usage while preserving range/default placeholder support and quote-safe argument handling.
- feat/session-id-in-status: merged c41362a21c; clean merge.
- feat/opeoginni--display-message-tps: merged 76a3367f11; resolved app conflict to keep sidebar overlay and terminal title toggles while adding message TPS toggle.
