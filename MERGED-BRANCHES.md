# Integration Branch: integration/2026-04-06-13-34

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | 65630d99c8 | |
| ☑ | 2 | feat/sinister-quotes | origin | fa31ef54a8 | Placeholders MUST be SINISTER_PLACEHOLDERS array |
| ☑ | 3 | feat/markdown-renderer | gignit | 18fc650f63 | |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | 0e23fd92a3 | |
| ☑ | 5 | feat/session-grouping | origin | 76f03e32f6 | |
| ☑ | 6 | feat/session-bookmarks | origin | fcaa059532 | |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | TBD | Merge immediately after feat/session-bookmarks |
| ☑ | 8 | feat/keybindable-commands | origin | TBD | |
| ☑ | 9 | feat/automatic-list-continuation | origin | TBD | |
| ☑ | 10 | feat/continue-command | origin | TBD | |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | TBD | |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | TBD | |
| ☑ | 13 | feat/enable-exa-setting | origin | TBD | |
| ☑ | 14 | feat/canceled-prompts-in-history | origin | TBD | Careful not to clobber this while merging! Merging this branch MUST add the new item to the command palette |
| ☑ | 15 | feat/permission-spinner | origin | TBD | |
| ☑ | 16 | feat/opencode-expand | origin | TBD | |
| ☑ | 17 | feat/argument-range-syntax | origin | TBD | |
| ☑ | 18 | feat/default-arguments | origin | 90988219a8 | Make sure that you don't accidentally reintroduce the swallowing behaviour that the feat/argument-range-syntax branch was meant to eliminate |
| ☑ | 19 | fix/preserve-quotes-in-arguments | origin | dfdfe161ce | |
| ☑ | 20 | fix/history-navigation-key-commands | origin | dd74c7306a | |
| ☑ | 21 | fix/build-with-short-version | origin | 301acb9b5d | Automatically uses short timestamp version for integration branches without requiring OPENCODE_VERSION to be set |
| ☑ | 22 | fix/autocompletion-filtered-order | origin | 3665c35e79 | |
| ☑ | 23 | fix/modal-menus-filtered-order | origin | 5a994bb6e0 | |
| ☑ | 24 | fix/config-package-json-pollution | origin | 062bb2c6ed | MUST be included in integration branches to prevent package.json pollution with non-SemVer versions |
| ☑ | 25 | fix/session-list-viewport-jumping | origin | 062bb2c6ed | |
| ☑ | 26 | fix/merging-multiple-configs | origin | 062bb2c6ed | |
| ☑ | 27 | fix/markdown-codeblock-theme-property | origin | 062bb2c6ed | |
| ☑ | 28 | fix/persist-sidebar | origin | 062bb2c6ed | This branch is meant not only to make the sidebar display state persistent across restarts but also to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There MUST NOT be a way to return to the auto state after transitioning to the "show" or "hide" state |
| ☑ | 29 | feat/persist-sidebar-group-folding-states | origin | 28ce4a061b | Be sure not to let this feature get clobbered by subsequent merges! |
| ☑ | 30 | feat/permission-indicator-in-sidebar | origin | 28ce4a061b | |
| ☑ | 31 | feat/command-palette-consistency | origin | 28ce4a061b | MOVE several items from the Session category to the System category in the command palette - do NOT duplicate them into both categories |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | 28ce4a061b | |
| ☑ | 33 | refactor/shared-substitute | origin | 6a6db6d2a2 | |
| ☑ | 34 | feat/session-id-in-status | origin | 9a48738c38 | |
| ☑ | 35 | feat/opeoginni--display-message-tps | origin | 29170db8dc | |
| ☑ | 36 | feat/kv-diff-style-clean | origin | aaa55e9bc2 | |
| ☑ | 37 | feat/global-compaction-threshold | origin | 6e06f493a2 | |
| ☑ | 38 | feat/configurable-message-and-session-limit | origin | aeac3ae564 | experimental._message_limit and experimental.session_list_limit should accept either positive integers or the string value "none" |
| ☑ | 39 | feat/experimental-dont-cache-command-markdown | origin | ddbec75d6d | |
| ☑ | 40 | feat/jsonc-user-themes | origin | 5b00433c6a | |
| ☑ | 41 | feat/shell-advice | origin | 4cd99cf01b | Combine properly with changes from feat/improve-bash-tool-git-advice branch |
| ☑ | 42 | feat/improve-bash-tool-git-advice | origin | d06fde5930 | Combine properly with changes from feat/shell-advice branch |
| ☑ | 43 | feat/edit-tool-description | origin | bb465f6b17 | |
| ☑ | 44 | feat/renaming-doesnt-close-session-list | origin | 52fc9dc290 | |
| ☑ | 45 | feat/session-child-toggle-key | origin | 8d6f008dbb | |
| ☑ | 46 | feat/set-session-title | origin | 89fd8e62bc | |
| ☑ | 47 | feat/get-session-title | origin | 95ab1ba7dc | |
| ☑ | 48 | feat/no-disabled-lsps-in-sidebar | origin | ff678f48ad | |
| ☑ | 49 | feat/agent-timestamps | origin | a2598e22a8 | |
| ☑ | 50 | feat/rewind-modal-option | origin | fd2787f481 | |
| ☑ | 51 | feat/alphabetize-command-palette-groups | origin | c2e1ee9af0 | |
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
| ☐ | 70 | feat/distinct-title-colour | origin | TBD | Make sure this change in title colouring is compatible with reformatting from feat/session-grouping |
| ☐ | 71 | feat/tool-output-colour | origin | TBD | |
| ☐ | 72 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 73 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 74 | fix/escape-from-status | origin | TBD | |
| ☐ | 75 | fix/restore-footer | origin | TBD | Restore footer that was removed in previous version - must not be clobbered |
| ☐ | 76 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 77 | fix/session-list-delete-selection | origin | TBD | |
| ☐ | 78 | feat/allow-variant_list-keybinding | origin | TBD | |
| ☐ | 79 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 80 | fix/less-bottom-padding | origin | TBD | |
| ☐ | 81 | fix/no-footer-context-when-sidebar | origin | TBD | |
