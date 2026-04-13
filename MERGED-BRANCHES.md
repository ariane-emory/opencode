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
| ☑ | 19 | fix/preserve-quotes-in-arguments | origin | 0fc87634cf | Conflict in prompt.ts; kept all exports + added placeholderRegex |
| ☑ | 20 | fix/history-navigation-key-commands | origin | 9de34aa2db | Clean merge |
| ☑ | 21 | fix/build-with-short-version | origin | 8414afb4f8 | Clean merge |
| ☑ | 22 | fix/autocompletion-filtered-order | origin | ff2f89981e | Conflicts in prompt/index.tsx; kept SINISTER_PLACEHOLDERS, listContinuation, placeholder effect |
| ☑ | 23 | fix/modal-menus-filtered-order | origin | 95782d8d89 | Conflicts in autocomplete.tsx, dialog-select.tsx, use-filtered-list.tsx; combined fuzzysort + sortKey prefix sorting |
| ☑ | 24 | fix/config-package-json-pollution | origin | 5b2a8840f2 | Clean merge |
| ☑ | 25 | fix/session-list-viewport-jumping | origin | 1e2a354179 | Clean merge |
| ☑ | 26 | fix/merging-multiple-configs | origin | 133b9837c3 | RawInfo -> Info fix |
| ☑ | 27 | fix/markdown-codeblock-theme-property | origin | 99179e6768 | Clean merge |
| ☑ | 28 | fix/persist-sidebar | origin | 3fd442791f | Conflicts in prompt/index.tsx; kept PLACEHOLDERS, listContinuation, placeholder effect |
| ☑ | 29 | feat/persist-sidebar-group-folding-states | origin | d7bd4cde89 | Clean merge; preserves sidebar group folding state persistence |
| ☑ | 30 | feat/permission-indicator-in-sidebar | origin | 84a45be70f | Conflict in sidebar.tsx; kept grouped title formatting and permission indicator |
| ☑ | 31 | feat/command-palette-consistency | origin | 3ccf770cbe | Moved palette items to System without duplication; synthesized sidebar toggle with persist-sidebar behavior |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | origin | 58a1349960 | Conflict in session/index.tsx; kept header toggle only in Session and preserved System palette deduplication |
| ☑ | 33 | refactor/shared-substitute | origin | a9cea1022a | Conflicts in substitute.ts and prompt.ts; kept full shared substitute feature set with whitespace normalization |
| ☑ | 34 | feat/session-id-in-status | origin | 7cf71aaa68 | Clean merge |
| ☑ | 35 | feat/opeoginni--display-message-tps | origin | 9960c99b04 | Conflict in app.tsx; kept sidebar overlay + added TPS toggle and terminal title toggle |
| ☑ | 36 | feat/kv-diff-style-clean | origin | 3581b11867 | Auto-merged but needed fix: duplicate useKV import + missing tuiConfig in permission.tsx |
| ☑ | 37 | feat/global-compaction-threshold | origin | 7b4b0937f7 | Clean merge |
| ☑ | 38 | feat/configurable-message-and-session-limit | origin | ad7ab9ee4e | Conflicts in config.ts, dialog-session-list.tsx, types.gen.ts; combined grouping+bookmarks with session_list_limit |
| ☑ | 39 | feat/experimental-dont-cache-command-markdown | origin | 2fa3196e3d | Major rewrite of command/index.ts; added mtime-based command cache with cache bypass |
| ☑ | 40 | feat/jsonc-user-themes | origin | 9b0a2983ed | Clean merge |
| ☑ | 41 | feat/shell-advice | origin | fed739a810 | Fixed BashTool.init→initBash, added ${shellName} replaceAll, updated test patterns |
| ☑ | 42 | feat/improve-bash-tool-git-advice | origin | 47ccba0461 | Conflict in bash.txt; kept ${shellName} from HEAD |
| ☑ | 43 | feat/edit-tool-description | origin | b7559dfe84 | Clean merge |
| ☑ | 44 | feat/renaming-doesnt-close-session-list | origin | 0c2a1c416f | Conflict in dialog-session-list.tsx; kept pinKeybind+defaultSessionID, added initialSessionID support |
| ☑ | 45 | feat/session-child-toggle-key | origin | db0c1da68d | Conflict in config.ts; kept session_continue + added session_child_toggle |
| ☑ | 46 | feat/set-session-title | origin | e0a67eb179 | Conflicts in registry.ts; kept planExit+planEnter and added sessiontitle tool |
| ☑ | 47 | feat/get-session-title | origin | b9005be510 | Conflicts in registry.ts; kept bookmark+set-session-title, added get-session-title tool |
| ☑ | 48 | feat/no-disabled-lsps-in-sidebar | origin | fa41989296 | Conflict in sidebar/lsp.tsx; hid LSP section when disabled |
| ☑ | 49 | feat/agent-timestamps | origin | 2645419940 | Conflict in session/index.tsx; kept sidebarOverlay fix + added showAgentTimestamps |
| ☑ | 50 | feat/rewind-modal-option | origin | abe88f82ec | Clean merge |
| ☑ | 51 | feat/alphabetize-command-palette-groups | origin | f8fa5eee34 | Conflicts in dialog-select.tsx; kept smartCompare, removed duplicate sort prop |
| ☑ | 52 | feat/taller-dialogs | origin | 0b17150c65 | Clean merge |
| ☑ | 53 | feat/add-arianes-themes | origin | 47d6511f96 | Clean merge, 54 theme JSON files added |
| ☑ | 54 | feat/aspiers--readline-additions | origin | 26aba7b42d | Conflict in SDK types; added readline keybinds, kept index signature |
| ☑ | 55 | feat/sidebar-clock | origin | 75e30d3ce5 | Conflicts in app.tsx + sidebar.tsx; kept BaseOne branding, added clock toggle |
| ☑ | 56 | feat/alphabetical-message-modal | origin | c4965ee05f | Conflict in dialog-select.tsx; kept smartCompare, added store.filter bypass |
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
19. **fix/preserve-quotes-in-arguments** (0fc87634cf) - Conflict in prompt.ts; kept all exports and added placeholderRegex.
20. **fix/history-navigation-key-commands** (9de34aa2db) - Clean merge, no conflicts.
21. **fix/build-with-short-version** (8414afb4f8) - Clean merge, no conflicts.
22. **fix/autocompletion-filtered-order** (ff2f89981e) - Conflicts in prompt/index.tsx. Kept SINISTER_PLACEHOLDERS, listContinuation, and placeholder effect.
23. **fix/modal-menus-filtered-order** (95782d8d89) - Conflicts in autocomplete.tsx, dialog-select.tsx, and use-filtered-list.tsx. Combined fuzzysort sorting with existing sortKey prefix behavior.
24. **fix/config-package-json-pollution** (5b2a8840f2) - Clean merge, no conflicts.
25. **fix/session-list-viewport-jumping** (1e2a354179) - Clean merge, no conflicts.
26. **fix/merging-multiple-configs** (133b9837c3) - Clean merge plus follow-up fix replacing undefined RawInfo with Info during config parsing.
27. **fix/markdown-codeblock-theme-property** (99179e6768) - Clean merge, no conflicts.
28. **fix/persist-sidebar** (3fd442791f) - Conflicts in prompt/index.tsx. Kept sinister placeholders, list continuation, prompt keybinding filtering, and placeholder resize effect while preserving persistent sidebar behavior.
29. **feat/persist-sidebar-group-folding-states** (d7bd4cde89) - Clean merge, no conflicts.
30. **feat/permission-indicator-in-sidebar** (84a45be70f) - Conflict in sidebar.tsx. Kept both grouped session title parsing and permission indicator memo.
31. **feat/command-palette-consistency** (3ccf770cbe) - Conflicts in app.tsx and session/index.tsx. Moved palette items to System without duplicating them in Session, and kept persistent-sidebar show/hide behavior in the System sidebar toggle.
32. **feat/persistant-sidebar-overlay-behaviour** (58a1349960) - Conflict in session/index.tsx plus follow-up header.tsx fix. Kept only the new Session header toggle, while preserving System ownership of timestamps/thinking/tool-details/scrollbar/generic-output toggles and using `project.workspace.get(...)` in header workspace rendering.
33. **refactor/shared-substitute** (a9cea1022a) - Conflicts in substitute.ts and prompt.ts. Kept full range/default/chained-fallback substitute behavior, added shared whitespace normalization, and removed redundant local prompt-side substitute details.
34. **feat/session-id-in-status** (7cf71aaa68) - Clean merge, no conflicts.
35. **feat/opeoginni--display-message-tps** (9960c99b04) - Conflict in app.tsx command palette. Kept sidebar overlay from HEAD and added TPS toggle + terminal title toggle from feature branch as separate System palette items.
36. **feat/kv-diff-style-clean** (3581b11867) - Auto-merged but had duplicate useKV import and missing tuiConfig variable in permission.tsx. Fixed by removing duplicate import, adding useTuiConfig() call, and correcting getScrollAcceleration argument.
37. **feat/global-compaction-threshold** (7b4b0937f7) - Clean merge, no conflicts.
38. **feat/configurable-message-and-session-limit** (ad7ab9ee4e) - Conflicts in config.ts (combined plan_mode+enable_exa+diff_style with messages_limit+session_list_limit), dialog-session-list.tsx (combined bookmarks+grouping display with session_list_limit), and SDK types.gen.ts (restored HEAD version and added messages_limit+session_list_limit to experimental section).
39. **feat/experimental-dont-cache-command-markdown** (2fa3196e3d) - Conflicts in config.ts (combined experimentalPlanMode+experimentalEnableExa with reloadCommands re-export) and command/index.ts (auto-merge produced broken code; manually rewrote to add mtime-based command cache, findCommandFile, loadSingleCommand, loadFreshCommandsWithMtime helpers, and cache bypass in get/list). Removed .default(true) from cache_command_markdown_files schema to fix test type errors.
40. **feat/jsonc-user-themes** (9b0a2983ed) - Clean merge, no conflicts.
41. **feat/shell-advice** (fed739a810) - Tests used old BashTool.init() API; fixed to use initBash(). Added .replaceAll("${shellName}", name) to bash.ts to properly substitute the new template variable. Updated test patterns to match current description format (Shell: instead of **Shell**:).
42. **feat/improve-bash-tool-git-advice** (47ccba0461) - Conflict in bash.txt PR creation section; kept HEAD's ${shellName} template variable over feature branch's hardcoded "bash".
43. **feat/edit-tool-description** (b7559dfe84) - Clean merge, no conflicts.
44. **feat/renaming-doesnt-close-session-list** (0c2a1c416f) - Conflict in dialog-session-list.tsx. Kept pinKeybind, pinned-aware defaultSessionID sorting, and search-based sessions memo. Added initialSessionID prop support from feature branch.
45. **feat/session-child-toggle-key** (db0c1da68d) - Conflict in config.ts keybinds. Kept session_continue from HEAD and added session_child_toggle from feature branch.
46. **feat/set-session-title** (e0a67eb179) - Conflicts in registry.ts. Kept planExit+planEnter from HEAD (configurable plan mode) and added sessiontitle tool from feature branch. Both bookmarktool and sessiontitletool are now yielded.
47. **feat/get-session-title** (b9005be510) - Conflicts in registry.ts imports and tool map. Added GetCurrentSessionTitleTool as getsessiontitle (separate key from sessiontitle which is SetCurrentSessionTitleTool). Both tools registered in builtin list.
48. **feat/no-disabled-lsps-in-sidebar** (fa41989296) - Conflict in sidebar/lsp.tsx. Took feature branch's approach: wraps LSP section in `<Show when={!off()}>` to hide entirely when LSPs disabled. Removed unused toggle function.
49. **feat/agent-timestamps** (2645419940) - Conflict in session/index.tsx. Kept HEAD's sidebarOverlay-aware contentWidth and added showAgentTimestamps memo from feature branch.
50. **feat/rewind-modal-option** (abe88f82ec) - Clean merge, no conflicts.
51. **feat/alphabetize-command-palette-groups** (f8fa5eee34) - Conflicts in dialog-select.tsx. Kept HEAD's smartCompare sorting. Removed duplicate sort prop from auto-merge.
52. **feat/taller-dialogs** (0b17150c65) - Clean merge, no conflicts.
53. **feat/add-arianes-themes** (47d6511f96) - Clean merge. Added 54 theme JSON files and theme registration in theme.tsx.
54. **feat/aspiers--readline-additions** (26aba7b42d) - Conflict in SDK types.gen.ts. Added readline keybinds (input_lowercase_word, input_uppercase_word, input_capitalize_word, input_yank) and kept [key: string] index signature.
55. **feat/sidebar-clock** (75e30d3ce5) - Conflicts in app.tsx and sidebar.tsx. Kept BaseOne branding in sidebar footer, added sidebar clock toggle as System palette item. Added useKV import and clock display with showSidebarClock memo.
56. **feat/alphabetical-message-modal** (c4965ee05f) - Conflict in dialog-select.tsx. Kept HEAD's smartCompare sorting but added `store.filter` bypass from feature branch (skip sorting when filter is active). Removed duplicate sort prop.
