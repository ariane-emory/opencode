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
| ☐ | 13 | feat/enable-exa-setting | origin | TBD |  |
| ☐ | 14 | feat/canceled-prompts-in-history | origin | TBD | Careful not to clobber this while merging! Merging this branch **MUST** add the new item to the command palette. |
| ☐ | 15 | feat/permission-spinner | origin | TBD |  |
| ☐ | 16 | feat/opencode-expand | origin | TBD |  |
| ☐ | 17 | feat/argument-range-syntax | origin | TBD |  |
| ☐ | 18 | feat/default-arguments | origin | TBD | When merging this branch, make sure that you don't accidentally reintroduce the swallowing behaviour that the feat/argument-range-syntax branch was meant to eliminate. |
| ☐ | 19 | fix/preserve-quotes-in-arguments | origin | TBD |  |
| ☐ | 20 | fix/history-navigation-key-commands | origin | TBD |  |
| ☐ | 21 | fix/build-with-short-version | origin | TBD | Automatically uses short timestamp version for integration branches without requiring OPENCODE_VERSION to be set |
| ☐ | 22 | fix/autocompletion-filtered-order | origin | TBD |  |
| ☐ | 23 | fix/modal-menus-filtered-order | origin | TBD |  |
| ☐ | 24 | fix/config-package-json-pollution | origin | TBD | This branch **MUST** be included in integration branches to prevent package.json pollution with non-SemVer versions |
| ☐ | 25 | fix/session-list-viewport-jumping | origin | TBD |  |
| ☐ | 26 | fix/merging-multiple-configs | origin | TBD |  |
| ☐ | 27 | fix/markdown-codeblock-theme-property | origin | TBD |  |
| ☐ | 28 | fix/persist-sidebar | origin | TBD | This branch is meant not only to make the sidebar display state persistent across bestarts if the progran but also  to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There **MUST NOT** be a way to return to the auto state after transitioning to the "show" or "hide" state. This change in the sidebar behaviour **MUST NOT** be clobbered while merging! |
| ☐ | 29 | feat/persist-sidebar-group-folding-states | origin | TBD | Be sure not to let this feature get clobbered by subsequent merges! |
| ☐ | 30 | feat/permission-indicator-in-sidebar | origin | TBD |  |
| ☐ | 31 | feat/command-palette-consistency | origin | TBD | to prevent recurence of a past mistake: this branch is meant to **MOVE** several items from the Session category to the System category in the command palette. You **MUST NOT** duplicate them into both categories when resolving merge conflicts! Additionally, if fix/persist-sidebar was merged previously, be sue to properly move the new logic for the sidebar that it added: no return to "auto" after leaving, et cetera |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | TBD |  |
| ☐ | 33 | refactor/shared-substitute | origin | TBD |  |
| ☐ | 34 | feat/session-id-in-status | origin | TBD |  |
| ☐ | 35 | feat/opeoginni--display-message-tps | origin | TBD |  |
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
