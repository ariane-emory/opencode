# Integration Branch: integration/2026-05-30-22-14

## Merge Checklist

| Status | # | Branch Name | PR | Commit Hash | Description |
|--------|---|-------------|-----|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | #273 | 7b80805817 | Clean merge. Added Flag import and OPENCODE_EXPERIMENTAL_MARKDOWN flag to fix typecheck |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | #274 | 6b73b95e2d | Clean merge |
| ☑ | 3 | feat/aspiers--readline-additions | #211 | bb14ba2683 | Clean merge |
| ☑ | 4 | feat/base-one-rebrand | #52 | 0e32fc1d4f | Conflict in flag.ts; resolved by using rebrand's envWithFallback pattern for OPENCODE_EXPERIMENTAL_MARKDOWN |
| ☑ | 5 | feat/sinister-quotes | #73 | 5f47279b87 | Clean merge |
| ☑ | 6 | feat/session-grouping | #194 | 0c90151e44 | Clean merge |
| ☑ | 7 | feat/session-bookmarks | #102 | edff0bada6 | Conflicts in dialog-session-list.tsx and locale.ts; resolved by combining grouping + bookmarks logic |
| ☑ | 8 | fix/dialog-datetime-alignment | #113 | 5f44e0f3e2 | Comment-only conflict in locale.ts |
| ☑ | 9 | feat/keybindable-commands | #48 | 5370f13130 | Conflicts in app.tsx; combined markdown toggle + customSlashCommands with smart .map() |
| ☑ | 10 | feat/automatic-list-continuation | #112 | 1cf04fb348 | Type annotation conflict in prompt/index.tsx |
| ☑ | 11 | feat/continue-command | #11 | 979c39cab7 | Conflicts in prompt.ts; combined lastAssistantForLoop with runLoop overrides |
| ☑ | 12 | feat/configurable-snapshot-lifespan | #157 | de13786b3c | Conflict in config.ts; expanded snapshot schema from Boolean to Union |
| ☑ | 13 | feat/configurable-new-plan-mode | #143 | d47d9b2a88 | Clean merge |
| ☑ | 14 | feat/improve-experimental-plan-mode-prompt | #232 | 917273b33c | Clean merge |
| ☑ | 15 | feat/enable-exa-setting | #257 | 3fcd6187c4 | Two conflicts in config.ts; combined plan_mode + enable_exa |
| ☑ | 16 | feat/canceled-prompts-in-history | #151 | 67c0551af5 | Conflict in app.tsx; added clear_prompt_history toggle |
| ☑ | 17 | feat/permission-spinner | #36 | dac0e0932c | Clean merge |
| ☑ | 18 | feat/opencode-expand | #67 | 101b7fe2f1 | Clean merge |
| ☑ | 19 | refactor/shared-substitute | #203 | 63ffbf02e6 | Comment-only conflict in substitute.ts, import conflict in prompt.ts |
| ☑ | 20 | feat/argument-range-syntax | #149 | 4d2c630a21 | 3-file conflict; replaced substitute.ts with range syntax version |
| ☑ | 21 | feat/default-arguments | #217 | 3fdf0805c3 | 3 conflicts; combined range syntax + default values in substitute |
| ☑ | 22 | fix/history-navigation-key-commands | #237 | 31fa1f40dc | Clean merge |
| ☑ | 23 | fix/build-with-short-version | #240 | c6a52e6ef9 | Clean merge |
| ☑ | 24 | fix/autocompletion-filtered-order | #76 | ca2e557ca9 | 3 conflicts in prompt/index.tsx; kept HEAD features |
| ☑ | 25 | fix/modal-menus-filtered-order | #77 | 33a258d76d | 3 conflicts; added smartCompare/tieredMatch with compareVersionTokens |
| ☑ | 26 | fix/config-package-json-pollution | #176 | ece887cff7 | Clean merge |
| ☑ | 27 | fix/session-list-viewport-jumping | #197 | 712d925c25 | Clean merge |
| ☑ | 28 | fix/merging-multiple-configs | #205 | 29cfc43455 | Clean merge; added missing zod import |
| ☑ | 29 | fix/markdown-codeblock-theme-property | #222 | 95a2d95bfe | Clean merge |
| ☑ | 30 | fix/persist-sidebar | #80 | a827d195d8 | 3 conflicts in prompt/index.tsx; kept HEAD features |
| ☑ | 31 | feat/persist-sidebar-group-folding-states | #98 | 2ec7053336 | Clean merge |
| ☑ | 32 | feat/persistant-sidebar-overlay-behaviour | #71 | f88520eab1 | Clean merge |
| ☑ | 33 | feat/opeoginni--display-message-tps | #83 | 9c9f52b7d4 | Clean merge |
| ☑ | 34 | feat/kv-diff-style-clean | #134 | 640df0fa67 | Import conflict in permission.tsx; kept HEAD imports + branch useKV |
| ☑ | 35 | feat/global-compaction-threshold | #63 | 2d053ac4e7 | Clean merge |
| ☑ | 36 | feat/configurable-message-and-session-limit | #177 | 47856775fa | 3 conflicts; combined plan_mode/enable_exa + messages_limit/session_list_limit |
| ☑ | 37 | feat/experimental-dont-cache-command-markdown | #252 | 67aa3b4274 | 2 conflicts; combined imports and experimental config fields |
| ☑ | 38 | feat/jsonc-user-themes | #97 | dc04d58651 | Import conflict in config.ts; fixed duplicate containsPath import |
| ☑ | 39 | feat/improve-shell-tool-git-advice | #279 | dd7afb4dba | Clean merge |
| ☑ | 40 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | #278 | cf8efe50cc | Clean merge |
| ☑ | 41 | feat/edit-tool-description | #142 | 3352c36d98 | Clean merge |
| ☑ | 42 | feat/renaming-doesnt-close-session-list | #233 | 68e98e216f | Conflict in dialog-session-list.tsx; combined grouping + pinned + initialSessionID |
| ☑ | 43 | feat/session-child-toggle-key | #238 | ad6e64fee2 | Clean merge |
| ☑ | 44 | feat/get-session-title | #144 | 65ad17c25d | Conflict in registry.ts; combined all yield tools |
| ☑ | 45 | feat/set-session-title | #106 | 6fb217e05d | 3 conflicts in registry.ts; renamed tool properties to avoid duplicates |
| ☑ | 46 | feat/no-disabled-lsps-in-sidebar | #186 | 098dfc005c | Conflict in lsp.tsx; combined toggle/open-close with Show wrapper |
| ☑ | 47 | fix/inline-datetime-no-padding | #275 | 8294f84d2e | 2 conflicts in locale.ts; added datetimeCompact and todayTimeOrDateTimeCompact |
| ☑ | 48 | feat/agent-timestamps | #191 | 43c0d58c1b | 2 conflicts; added agentTimestamps KV signal and showAgentTimestamps |
| ☑ | 49 | feat/rewind-modal-option | #192 | 7416d94c2a | 4 conflicts; added SessionBusyError to rewind endpoint |
| ☑ | 50 | feat/alphabetize-command-palette-groups | #195 | 38ebe3b756 | 3 conflicts in dialog-select.tsx; kept smartCompare + take import |
| ☑ | 51 | feat/taller-dialogs | #196 | 0b5640ee96 | Clean merge |
| ☑ | 52 | feat/add-arianes-themes | #212 | b89c9b9e8a | Clean merge (51 theme files) |
| ☑ | 53 | feat/sidebar-clock | #207 | 01560d576a | 3 conflicts; added sidebar_clock toggle to app.tsx commands |
| ☑ | 54 | feat/alphabetical-message-modal | #219 | 5574787601 | 3 conflicts in dialog-select.tsx; kept HEAD imports |
| ☑ | 55 | feat/toggle-sidebar-scrollbar | #224 | 84bc7f26b8 | 2 conflicts; added sidebar_scrollbar toggle |
| ☑ | 56 | feat/full-datetimes-in-fork-and-timeline-dialogues | #223 | 682803c92d | 2 conflicts in locale.ts; adopted MONTHS array + paddedDay |
| ☑ | 57 | feat/configurable-maximum-prompt-input-size | #242 | 155b289dda | 2 conflicts; kept both experimental fields and max_prompt_input_lines |
| ☑ | 58 | feat/clickable-sidebar-mcps | #227 | 33b19946d9 | Conflict in mcp.tsx; combined KV toggle + loading signal |
| ☑ | 59 | feat/clickable-dialogue-mcps | #225 | 20479f292f | Clean merge |
| ☑ | 60 | feat/clickable-status-mcps | #241 | e7523ae64c | Clean merge |
| ☑ | 61 | feat/ignored-commands | #216 | d8431b2795 | Conflict in command.ts; kept ConfigBoolean + added ignored field |
| ☑ | 62 | feat/dialogue-background-overlay-setting | #249 | 63e65d8ce7 | 2 conflicts; kept all fields from both sides |
| ☑ | 63 | fix/no-split-database | #235 | 31eaf41ea8 | Clean merge |
| ☑ | 64 | feat/elapsed-timer | #54 | 67ad9b0a90 | 2 conflicts; kept both TPS and elapsed timer displays |
| ☑ | 65 | fix/rfc2119-question-tool | #118 | 53e76262d4 | Clean merge |
| ☑ | 66 | feat/sidebar-header-accent-colours | #229 | b17d498843 | Conflict in lsp.tsx; changed header colour to theme().accent |
| ☑ | 67 | feat/distinct-title-colour | #226 | 649b1eb3c9 | Conflict in sidebar.tsx; kept session grouping + sessionTitle colour |
| ☑ | 68 | feat/tool-output-colour | #230 | 887076b466 | 3 conflicts in theme.tsx; added sessionTitle and toolOutput to ThemeJson |
| ☑ | 69 | fix/autocompletion-input-enter-keybindings | #277 | a1b35f940b | Clean merge |
| ☑ | 70 | fix/escape-from-status | #245 | f3af594e2b | Clean merge |
| ☑ | 71 | fix/restore-footer | #175 | 8f7e0e9516 | Conflict in session/index.tsx; added Footer with sidebarVisible guard |
| ☑ | 72 | feat/remove-canned-jokes | #247 | 6c5828200f | Clean merge |
| ☑ | 73 | fix/session-list-delete-selection | #255 | 503e6dc1fa | 3 conflicts in dialog-select.tsx; added moveTo/skipAutoScroll |
| ☑ | 74 | feat/kimi-with-claude-system-prompt | #246 | 2075e1a9dd | Clean merge |
| ☑ | 75 | fix/less-bottom-padding | #263 | 3680e5a470 | Clean merge |
| ☑ | 76 | fix/session-timestamp-regression | #268 | 3489bab142 | Clean merge |
| ☑ | 77 | feat/persistent-session-id-in-sidebar-toggle | #276 | 752cbd38bd | 2 conflicts; added sidebar_session_id toggle |
| ☑ | 78 | fix/preserve-quotes-in-arguments | #239 | 3b853ffbf6 | Conflict in test file; kept both test suites |
| ☑ | 79 | feat/command-palette-consistency | #244 | 8637c57ed2 | 6 conflicts in app.tsx; moved session toggles to System category |
| ☑ | 80 | fix/model-selection-follows-favorite | #280 | 2aa0916676 | Clean merge |
| ☑ | 81 | fix/integration-version-plugin-compatibility | #281 | 4fae654de3 | Clean merge |
| ☑ | 82 | fix/hide-session-pinning-feature | #282 | 97b991ea9b | 4 conflicts in dialog-session-list.tsx; kept full pinning UI |

## Merge Statistics

- Total branches: 82
- Clean merges: 41
- Conflicts resolved: 41
- Post-merge fixes: 10+

## Key Integration State

- BaseOne branding throughout (rebrand from #4)
- app.tsx commands: markdown_all, clear_prompt_history, sidebar_clock, sidebar_scrollbar, sidebar_session_id, timestamps, thinking, actions, scrollbar, generic_tool_output, sidebar toggle + customSlashCommands
- dialog-select.tsx: moveTo, skipAutoScroll, scrollToValue in ref type; smartCompare with tieredMatch
- session/index.tsx: TPS display, elapsed timer, agent timestamps, sidebar overlay + scrollbar
- theme.tsx: sessionTitle and toolOutput as optional colour overrides
- lsp.tsx: header uses theme().accent, wrapped in Show when not disabled
- mcp.tsx: KV toggle + loading signal
- locale.ts: MONTHS array, shortDateTime, datetimeCompact, todayTimeOrDateTimeCompact
- registry.ts: getSessionTitle, setSessionTitle, bookmarktool
- config.ts experimental: plan_mode, enable_exa, messages_limit, session_list_limit, cache_command_markdown_files, context_compaction_threshold, continue_loop_on_deny, max_prompt_input_lines, dialogue_background_overlay, ignored commands
- substitute.ts: rangeWithDefault → defaultPlaceholder → extendedPlaceholder → placeholderRegex → $ARGUMENTS processing chain

## Merge Log

All 82 branches successfully merged with typecheck passing across all 25 packages.
