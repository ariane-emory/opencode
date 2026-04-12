# Integration Branch: integration/2026-04-12-16-07

## Merge Checklist

| Status | # | Branch Name | Remote | Commit Hash | Description |
|--------|---|-------------|--------|-------------|-------------|
| ☑ | 1 | feat/base-one-rebrand | origin | c00ef72d25 | Clean merge |
| ☑ | 2 | feat/sinister-quotes | origin | 3da0345360 | Clean merge; SINISTER_PLACEHOLDERS in packages/ui/src/constants/placeholders.ts |
| ☑ | 3 | feat/markdown-renderer | gignit | 662868dad9 | Conflicts in index.tsx resolved by combining imports |
| ☑ | 4 | feat/thinking-indicator-hidden | rcdailey | eb31c9f763 | Clean merge |
| ☑ | 5 | feat/session-grouping | origin | 563f7082e0 | Clean merge |
| ☑ | 6 | feat/session-bookmarks | origin | 4821045da6 | Conflicts in dialog-session-list.tsx and locale.ts; combined grouping+bookmarks logic |
| ☑ | 7 | fix/dialog-datetime-alignment | origin | 02ce02f940 | Clean merge |
| ☑ | 8 | feat/keybindable-commands | origin | ecac689eb7 | Clean merge |
| ☑ | 9 | feat/automatic-list-continuation | origin | 95933bacf3 | Clean merge |
| ☑ | 10 | feat/continue-command | origin | cb5af789cb | Clean merge |
| ☑ | 11 | feat/configurable-snapshot-lifespan | origin | 0536072e8b | Clean merge |
| ☑ | 12 | feat/configurable-new-plan-mode | origin | 8a91b599bc | Clean merge |
| ☑ | 13 | feat/enable-exa-setting | origin | e8e038a022 | Conflict in config.ts; combined plan_mode + enable_exa experimental settings |
| ☑ | 14 | withheld/feat/canceled-prompts-in-history | origin | be6b9c61df | Conflict in app.tsx; added both markdown toggle and cleared-prompt-history items to command palette |
| ☑ | 15 | feat/permission-spinner | origin | 1fa4beb230 | Clean merge |
| ☑ | 16 | feat/opencode-expand | origin | a8a6bfada0 | Conflict in prompt.ts; kept both Config and substituteArguments imports |
| ☑ | 17 | feat/argument-range-syntax | origin | a461fe96d6 | Conflicts in substitute.ts and test; took feature branch version (eliminates swallowing, adds range syntax) |
| ☑ | 18 | feat/default-arguments | origin | dbc91d387f | Conflicts in substitute.ts/test/prompt.ts. Combined range+default syntax in substitute.ts; prompt.ts reverted to simple wrapper due to incompatible architecture |
| ☐ | 19 | fix/preserve-quotes-in-arguments | origin | TBD | |
| ☐ | 20 | fix/history-navigation-key-commands | origin | TBD | |
| ☐ | 21 | fix/build-with-short-version | origin | TBD | Automatically uses short timestamp version for integration branches |
| ☐ | 22 | fix/autocompletion-filtered-order | origin | TBD | |
| ☐ | 23 | fix/modal-menus-filtered-order | origin | TBD | |
| ☐ | 24 | fix/config-package-json-pollution | origin | TBD | Prevents package.json pollution with non-SemVer versions |
| ☐ | 25 | fix/session-list-viewport-jumping | origin | TBD | |
| ☐ | 26 | fix/merging-multiple-configs | origin | TBD | |
| ☐ | 27 | fix/markdown-codeblock-theme-property | origin | TBD | |
| ☐ | 28 | fix/persist-sidebar | origin | TBD | Makes sidebar display state persistent; removes auto-hide on narrow terminal; no return to auto state after show/hide |
| ☐ | 29 | feat/persist-sidebar-group-folding-states | origin | TBD | Be sure not to let this get clobbered by subsequent merges |
| ☐ | 30 | feat/permission-indicator-in-sidebar | origin | TBD | |
| ☐ | 31 | feat/command-palette-consistency | origin | TBD | Moves items from Session to System category; do not duplicate into both categories |
| ☐ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | TBD | |
| ☐ | 33 | refactor/shared-substitute | origin | TBD | |
| ☐ | 34 | feat/session-id-in-status | origin | TBD | |
| ☐ | 35 | feat/opeoginni--display-message-tps | origin | TBD | |
| ☐ | 36 | feat/kv-diff-style-clean | origin | TBD | |
| ☐ | 37 | feat/global-compaction-threshold | origin | TBD | |
| ☐ | 38 | feat/configurable-message-and-session-limit | origin | TBD | Both experimental._message__limit and experimental.session_list_limit should accept positive integers or "none" |
| ☐ | 39 | feat/experimental-dont-cache-command-markdown | origin | TBD | |
| ☐ | 40 | feat/jsonc-user-themes | origin | TBD | |
| ☐ | 41 | feat/shell-advice | origin | TBD | Combine with feat/improve-bash-tool-git-advice bash tool description changes |
| ☐ | 42 | feat/improve-bash-tool-git-advice | origin | TBD | Combine with feat/shell-advice bash tool description changes |
| ☐ | 43 | feat/edit-tool-description | origin | TBD | |
| ☐ | 44 | feat/renaming-doesnt-close-session-list | origin | TBD | |
| ☐ | 45 | feat/session-child-toggle-key | origin | TBD | |
| ☐ | 46 | feat/set-session-title | origin | TBD | |
| ☐ | 47 | feat/get-session-title | origin | TBD | |
| ☐ | 48 | feat/no-disabled-lsps-in-sidebar | origin | TBD | |
| ☐ | 49 | feat/agent-timestamps | origin | TBD | |
| ☐ | 50 | feat/rewind-modal-option | origin | TBD | |
| ☐ | 51 | feat/alphabetize-command-palette-groups | origin | TBD | |
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
| ☐ | 70 | feat/distinct-title-colour | origin | TBD | Compatible with feat/session-grouping title formatting; both distinct colour AND grouped session formatting |
| ☐ | 71 | feat/tool-output-colour | origin | TBD | |
| ☐ | 72 | feat/improve-experimental-plan-mode-prompt | origin | TBD | |
| ☐ | 73 | fix/input-enter-keybindings | origin | TBD | |
| ☐ | 74 | fix/escape-from-status | origin | TBD | |
| ☐ | 75 | fix/restore-footer | origin | TBD | Restores footer that was removed; must not be clobbered |
| ☐ | 76 | feat/remove-canned-jokes | origin | TBD | |
| ☐ | 77 | fix/session-list-delete-selection | origin | TBD | |
| ☐ | 78 | feat/kimi-with-claude-system-prompt | origin | TBD | |
| ☐ | 79 | fix/less-bottom-padding | origin | TBD | |
| ☐ | 80 | fix/no-footer-context-when-sidebar | origin | TBD | |

## Merge Log

1. **feat/base-one-rebrand** (c00ef72d25) - Clean merge, no conflicts.
2. **feat/sinister-quotes** (3da0345360) - Clean merge, no conflicts.
3. **feat/markdown-renderer** (662868dad9) - Conflicts in session/index.tsx: combined imports (StyledText, SyntaxStyle, MacOSScrollAccel from markdown-renderer with existing imports), kept both scroll-acceleration and markdown-renderer imports.
4. **feat/thinking-indicator-hidden** (eb31c9f763) - Clean merge, no conflicts.
5. **feat/session-grouping** (563f7082e0) - Clean merge, no conflicts.
6. **feat/session-bookmarks** (4821045da6) - Conflicts in dialog-session-list.tsx and locale.ts. Combined session-grouping logic (grouped/plain split, parseSessionTitleParts) with session-bookmarks logic (pinned/unpinned, Bookmarks: category). Kept HEAD's locale.ts (today check). Order: Bookmarks -> Grouped -> Unpinned.
7. **fix/dialog-datetime-alignment** (02ce02f940) - Clean merge, no conflicts.
8. **feat/keybindable-commands** (ecac689eb7) - Clean merge, no conflicts.
9. **feat/automatic-list-continuation** (95933bacf3) - Clean merge, no conflicts.
10. **feat/continue-command** (cb5af789cb) - Clean merge, no conflicts.
11. **feat/configurable-snapshot-lifespan** (0536072e8b) - Clean merge, no conflicts.
12. **feat/configurable-new-plan-mode** (8a91b599bc) - Clean merge, no conflicts.
13. **feat/enable-exa-setting** (e8e038a022) - Conflict in config.ts: combined plan_mode and enable_exa experimental settings (both schema fields and accessor functions).
14. **withheld/feat/canceled-prompts-in-history** (be6b9c61df) - Conflict in app.tsx command palette: kept both markdown_all toggle and cleared-prompt-history toggle as separate items.
15. **feat/permission-spinner** (1fa4beb230) - Clean merge, no conflicts.
16. **feat/opencode-expand** (a8a6bfada0) - Conflict in prompt.ts imports: kept both Config and substituteArguments imports.
17. **feat/argument-range-syntax** (a461fe96d6) - Conflicts in substitute.ts and test. Took feature branch's version: $N no longer swallows, added ${N..M}, ${N..}, ${..M}, ${..} range syntax.
18. **feat/default-arguments** (dbc91d387f) - Conflicts in substitute.ts/test/prompt.ts. Combined all regex patterns (range syntax + default args with ${N:default}, ${N..M:default}). Prompt.ts expanded command function was incompatible with Effect-based architecture; kept simple wrapper.
