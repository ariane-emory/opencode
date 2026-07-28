# Integration Branch: integration/2026-07-28-10-31

## Merge Checklist

| Status | # | Branch Name | PR | Remote | Commit Hash | Description |
|--------|---|-------------|----|--------|-------------|-------------|
| ☑ | 1 | feat/gignit--markdown-renderer | 273 | origin | 9e8d9399d6 |  |
| ☑ | 2 | feat/rcdailey--thinking-indicator-hidden | 274 | origin | 13bf8acedd |  |
| ☑ | 3 | feat/aspiers--readline-additions | 211 | origin | 1253def43a |  |
| ☑ | 4 | feat/base-one-rebrand | 52 | origin | db4aee7497 | **MERGE ADVICE:** remember that, amongst it's many other changes, this branch is meant to **REMOVE** the animation effects on the art on the startup screen, and that you **MUST NOT** do anything that could mess with the background colouring of the art that is displayed after exiting the program! |
| ☑ | 5 | feat/sinister-quotes | 73 | origin | e535c3d9a1 | **MERGE ADVICE:** the placeholders used **MUST** be the SINISTER_PLACEHOLDERS array in this branch's packages/ui/src/constants/placeholders.ts file, **NO OTHER PLACEHOLDER SOURCE/LOCATION IS PERMISSIBLE!** |
| ☑ | 6 | feat/session-grouping | 194 | origin | 8e5f39713a |  |
| ☑ | 7 | feat/session-bookmarks | 102 | origin | a263aa1a80 |  |
| ☑ | 8 | fix/dialog-datetime-alignment | 113 | origin | a263aa1a80 | **MERGE ADVICE:** for best results, merge this one immediately after feat/session-bookmarks. This feature **MUST** not be clobbered; if there is a conflict, it **MUST** be combined with the other feature with which it is conflicting! |
| ☑ | 9 | feat/keybindable-commands | 48 | origin | 2ecfcfbe8b |  |
| ☑ | 10 | feat/automatic-list-continuation | 112 | origin | de346e48ec |  |
| ☑ | 11 | feat/continue-command | 11 | origin | 84b43ca782 |  |
| ☑ | 12 | feat/configurable-snapshot-lifespan | 157 | origin | 659a28ec81 |  |
| ☑ | 13 | feat/configurable-new-plan-mode | 143 | origin | e1f3da296f |  |
| ☑ | 14 | feat/improve-experimental-plan-mode-prompt | 232 | origin | b383ecac32 |  |
| ☑ | 15 | feat/enable-exa-setting | 257 | origin | b35ff7e9b9 |  |
| ☑ | 16 | feat/canceled-prompts-in-history | 151 | origin | 316f78482b | **MERGE ADVICE:** Careful not to clobber this while merging! Merging this branch **MUST** add the new item to the command palette. |
| ☑ | 17 | feat/permission-spinner | 36 | origin | ade8ff1bd6 |  |
| ☑ | 18 | feat/opencode-expand | 67 | origin | 138533a7da |  |
| ☑ | 19 | refactor/shared-substitute | 203 | origin | f974b1463a |  |
| ☑ | 20 | feat/argument-range-syntax | 149 | origin | a0525f508d |  |
| ☑ | 21 | feat/default-arguments | 217 | origin | ed078b0c0e | **MERGE ADVICE:** When merging this branch, make sure that you don't accidentally reintroduce the swallowing behaviour that the feat/argument-range-syntax branch was meant to eliminate. |
| ☑ | 22 | fix/history-navigation-key-commands | 237 | origin | 83587e8b18 |  |
| ☑ | 23 | fix/build-with-short-version | 240 | origin | e2124d8b6d | **MERGE ADVICE:** Automatically uses short timestamp version for integration branches without requiring OPENCODE_VERSION to be set |
| ☑ | 24 | fix/autocompletion-filtered-order | 76 | origin | 4439faee88 |  |
| ☑ | 25 | fix/modal-menus-filtered-order | 77 | origin | 39484336db |  |
| ☑ | 26 | fix/config-package-json-pollution | 176 | origin | 73f4d21ae0 | **MERGE ADVICE:** This branch **MUST** be included in integration branches to prevent package.json pollution with non-SemVer versions |
| ☑ | 27 | fix/session-list-viewport-jumping | 197 | origin | 101e9ee5a3 |  |
| ☑ | 28 | fix/markdown-codeblock-theme-property | 222 | origin | f9dd032207 |  |
| ☑ | 29 | fix/persist-sidebar | 80 | origin | f209bf47b0 | **MERGE ADVICE:** This branch is meant not only to make the sidebar display state persistent across bestarts if the progran but also  to remove the normal behaviour where the sidebar is hidden when the terminal is not wide enough! There **MUST NOT** be a way to return to the auto state after transitioning to the "show" or "hide" state. This change in the sidebar behaviour **MUST NOT** be clobbered while merging! Also this branch is meant to remove the behaviour where the sidebar is automatically hidden if the window becomes too narrow. You **MUST NOT** remove this behaviour. This behaviour **MUST** be preserved, whether the sidebar is displayed or not **MUST NOT** be affected by how wide the window is! |
| ☑ | 30 | feat/persist-sidebar-group-folding-states | 98 | origin | db34980225 | **MERGE ADVICE**: Be sure not to let this feature get clobbered by subsequent merges! |
| ☑ | 31 | feat/persistant-sidebar-overlay-behaviour | 71 | origin | a410807f89 |  |
| ☑ | 32 | feat/opeoginni--display-message-tps | 83 | origin | d93a441a86 |  |
| ☑ | 33 | feat/kv-diff-style-clean | 134 | origin | 87742cb9b5 |  |
| ☑ | 34 | feat/global-compaction-threshold | 63 | origin | 22ad65bf35 |  |
| ☑ | 35 | feat/configurable-message-and-session-limit | 177 | origin | bae819cb08 | **MERGE ADVICE:** Don't forget that both the `experimental._message__limit` and `experimental.session_list_limit` settings should accept either positive integers or the string value "none"! |
| ☑ | 36 | feat/experimental-dont-cache-command-markdown | 252 | origin | 4546e13933 |  |
| ☑ | 37 | feat/jsonc-user-themes | 97 | origin | a5ee12f6ea |  |
| ☑ | 38 | feat/improve-shell-tool-git-advice | 279 | origin | f547c3566c | **MERGE ADVICE**: Make sure to combine this properly with the changes to the shell tool's description that are made in the feat/shell-advice branch, both sets of changes must be synthesized! |
| ☑ | 39 | feat/shell-tool-unblacklist-fish-and-extend-dynamic-naming | 278 | origin | c5e977bc94 | **MERGE ADVICE**: Make sure to combine this properly with the changes to the shell tool's description that are made in the feat/improve-shell-tool-git-advice branch, both sets of changes must be synthesized! **NO** shells must be blacklisted! |
| ☑ | 40 | feat/edit-tool-description | 142 | origin | 86c50efcc0 |  |
| ☑ | 41 | feat/renaming-doesnt-close-session-list | 233 | origin | 8f49c83759 |  |
| ☑ | 42 | feat/session-child-toggle-key | 238 | origin | 3b988c33a7 |  |
| ☑ | 43 | feat/get-session-title | 144 | origin | cb6c410357 |  |
| ☑ | 44 | feat/set-session-title | 106 | origin | 52f8093f36 |  |
| ☑ | 45 | feat/no-disabled-lsps-in-sidebar | 186 | origin | fd6dafc3ad | **MERGE ADVICE**: Remember, the whole purpose of this branch is to cause the LSPs to not be displayed in the sidebar at all when the LSPs have been disabled in the configuration. Make sure that you don't clobber this while merging! |
| ☑ | 46 | fix/inline-datetime-no-padding | 275 | origin | d559772e1a | **MERGE ADVICE:** This branch adds `datetimeCompact()` and `todayTimeOrDateTimeCompact()` to `packages/opencode/src/util/locale.ts`. It **MUST** be merged before `feat/agent-timestamps` so that the compact datetime functions are available for inline timestamps. |
| ☑ | 47 | feat/agent-timestamps | 191 | origin | dd8e6fe96f | **MERGE ADVICE:** This branch adds inline timestamps to agent messages. It **MUST** use `Locale.todayTimeOrDateTimeCompact()` instead of `Locale.todayTimeOrDateTime()` for inline timestamps to avoid space-padding on single-digit days (e.g., "5/ 6/2026"). The compact variant is defined in `packages/opencode/src/util/locale.ts` and must be available before this branch is merged. |
| ☑ | 48 | feat/rewind-modal-option | 192 | origin | b716861908 |  |
| ☑ | 49 | feat/alphabetize-command-palette-groups | 195 | origin | 8f19a7bff1 |  |
| ☑ | 50 | feat/taller-dialogs | 196 | origin | 2d967be592 |  |
| ☑ | 51 | feat/add-arianes-themes | 212 | origin | da222b9b9c |  |
| ☑ | 52 | feat/sidebar-clock | 207 | origin | b1c12b3cf4 |  |
| ☑ | 53 | feat/alphabetical-message-modal | 219 | origin | d8f2a2f0bd |  |
| ☑ | 54 | feat/toggle-sidebar-scrollbar | 224 | origin | aa58e3945d |  |
| ☑ | 55 | feat/full-datetimes-in-fork-and-timeline-dialogues | 223 | origin | 8f4925b857 |  |
| ☑ | 56 | feat/configurable-maximum-prompt-input-size | 242 | origin | 6fd377b14d |  |
| ☑ | 57 | feat/clickable-sidebar-mcps | 227 | origin | 7814fa088c |  |
| ☑ | 58 | feat/clickable-dialogue-mcps | 225 | origin | 0b46554428 |  |
| ☑ | 59 | feat/clickable-status-mcps | 241 | origin | 989cd83f23 |  |
| ☑ | 60 | feat/ignored-commands | 216 | origin | ce6a9011f6 |  |
| ☑ | 61 | feat/dialogue-background-overlay-setting | 249 | origin | feced8d935 |  |
| ☑ | 62 | fix/no-split-database | 235 | origin | 093e05d0de |  |
| ☑ | 63 | feat/elapsed-timer | 54 | origin | 20e7aae3b9 |  |
| ☑ | 64 | fix/rfc2119-question-tool | 118 | origin | 75627a4e31 |  |
| ☑ | 65 | feat/sidebar-header-accent-colours | 229 | origin | e7d4ede053 |  |
| ☑ | 66 | feat/distinct-title-colour | 226 | origin | 8e5f39713a | **MERGE ADVICE:** Make sure that this change in the title's colouring is made compatible with the reformatting in grouped session titles that comes from the feat/session-grouping branch, **BOTH** the distinct colour for the titles **AND** the formatting of grouped sessions' titles |
| ☑ | 67 | feat/tool-output-colour | 230 | origin | 02a85b9a6c |  |
| ☑ | 68 | fix/textarea-input-enter-keybindings | 286 | origin | ee49072a46 |  |
| ☑ | 69 | fix/escape-from-status | 245 | origin | 43d59ac921 |  |
| ☑ | 70 | fix/restore-footer | 175 | origin | ccf27019a5 | **MERGE ADVICE:** As its name suggests, this feature restores the footer it was removed in a previous version; it must not be allowed to be clobbered by other branches when merging! |
| ☑ | 71 | fix/session-list-delete-selection | 255 | origin | c3fc2f6921 |  |
| ☑ | 72 | feat/kimi-with-claude-system-prompt | 246 | origin | 54ae398c89 |  |
| ☑ | 73 | fix/less-bottom-padding | 263 | origin | d85d73e1bd |  |
| ☑ | 74 | fix/session-timestamp-regression | 268 | origin | 416087efe2 |  |
| ☑ | 75 | feat/persistent-session-id-in-sidebar-toggle | 276 | origin | 59e65d4561 |  |
| ☑ | 76 | fix/preserve-quotes-in-arguments | 239 | origin | 7422e6053f |  |
| ☑ | 77 | feat/command-palette-consistency | 244 | origin | 934001e0a1 | **MERGE ADVICE:** to prevent recurence of a past mistake: this branch is meant to **MOVE** several items from the Session category to the System category in the command palette. You **MUST NOT** duplicate them into both categories when resolving merge conflicts! Additionally, if fix/persist-sidebar was merged previously, be sue to properly move the new logic for the sidebar that it added: no return to "auto" after leaving, et cetera |
| ☑ | 78 | fix/model-selection-follows-favorite | 280 | origin | 9b5184bbe9 |  |
| ☑ | 79 | fix/integration-version-plugin-compatibility | 281 | origin | 0c4124e41a |  |
| ☑ | 80 | fix/hide-session-pinning-feature | 282 | origin | 53d2097d4f |  |
| ☐ | 81 | fix/dev-mode-version-fallback | 284 | origin | TBD |  |
| ☐ | 82 | fix/embed-skill-file-in-binary | 285 | origin | TBD |  |
| ☐ | 83 | fix/dialog-prompt-submit-hints | 287 | origin | TBD |  |

## Merge Log

Detailed notes on each merge will be appended here as branches are merged.
