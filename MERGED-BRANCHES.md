# Merged Branches - Integration 2026-03-06

This document tracks all branches merged into the integration branch.

## Successfully Merged (68 branches)

### Upstream
1. **split-config-fixes** (a295e66b54) - Configuration fixes

### Origin Branches
2. **feat/base-one-rebrand** (25529428dc) - BaseOne rebranding
3. **feat/sinister-quotes** (860c7a153b) - Sinister quotes feature
4. **feat/markdown-renderer** (f2bb02ce81) - Markdown renderer improvements
5. **feat/compaction-model** (00b3b7dc7d) - Compaction model with overflow handling
6. **feat/enhanced-compaction-prompt** - Enhanced compaction prompt
7. **add-bash-env-parameter** (taxilian) - Bash environment parameter support
8. **feat/thinking-indicator-hidden** (rcdailey) - Hidden thinking indicator
9. **fix/session-new-prompt-handoff** (AksharP5) - Session prompt handoff fix
10. **feat/session-grouping** - Session grouping feature
11. **feat/session-bookmarks** - Session bookmarks feature
12. **fix/dialog-datetime-alignment** - Dialog datetime alignment fix
13. **feat/keybindable-commands** - Keybindable commands
14. **feat/opencode-expand** - Opencode expand command
15. **feat/automatic-list-continuation** - Automatic list continuation
16. **feat/continue-command** - Continue command
17. **feat/configurable-snapshot-lifespan** - Configurable snapshot lifespan
18. **feat/configurable-new-plan-mode** - Configurable new plan mode
19. **feat/config-imports** - Config imports support
20. **feat/canceled-prompts-in-history** - Canceled prompts in history
21. **feat/permission-spinner** - Permission spinner UI
22. **feat/permission-indicator-in-sidebar** - Permission indicator in sidebar
23. **fix/system-prompt-directories** - System prompt directories fix
24. **fix/remove-dot-true** - Remove .true fix
25. **fix/rfc2119-question-tool** - RFC2119 question tool fix
26. **fix/persist-sidebar** - Persist sidebar state
27. **fix/autocompletion-filtered-order** - Autocompletion filtered order
28. **fix/modal-menus-filtered-order** - Modal menus filtered order
29. **fix/config-package-json-pollution** - Config package.json pollution fix
30. **fix/session-list-viewport-jumping** - Session list viewport jumping fix
31. **fix/merging-multiple-configs** - Merging multiple configs fix
32. **fix/markdown-codeblock-theme-property** - Markdown codeblock theme property
33. **refactor/shared-substitute** - Shared substitute refactor
34. **feat/command-palette-consistecy** - Command palette consistency
35. **feat/session-id-in-status** - Session ID in status
36. **feat/argument-range-syntax** - Argument range syntax ($N, ${N..M})
37. **feat/default-arguments** - Default arguments support (${N:default})
38. **feat/edit-tool-description** - Edit tool description
39. **feat/opeoginni--display-message-tps** - Display message TPS
40. **feat/kv-diff-style-clean** - KV diff style clean
41. **feat/global-compaction-threshold** - Global compaction threshold
42. **feat/configurable-message-and-session-limit** - Configurable message/session limits
43. **feat/experimental-dont-cache-markdown** - Don't cache markdown (experimental)
44. **feat/jsonc-user-themes** - JSONC user themes
45. **feat/persist-sidebar-group-folding-states** - Persist sidebar group folding
46. **feat/persistant-sidebar-overlay-behaviour** - Persist sidebar overlay behavior
47. **feat/shell-advice** - Shell advice improvements
48. **feat/elapsed-timer** - Elapsed timer
49. **feat/set-session-title** - Set session title tool
50. **feat/get-session-title** - Get session title tool
51. **feat/no-disabled-lsps-in-sidebar** - No disabled LSPs in sidebar
52. **feat/agent-timestamps** - Agent timestamps
53. **feat/rewind-modal-option** - Rewind modal option
54. **feat/alphabetize-command-palette-groups** - Alphabetize command palette groups
55. **feat/taller-dialogs** - Taller dialogs
56. **feat/add-arianes-themes** - Add Ariane's themes
57. **feat/aspiers--readline-additions** - Readline additions
58. **feat/sidebar-clock** - Sidebar clock
59. **feat/improve-bash-tool-git-advice** - Improve bash tool git advice
60. **feat/alphabetical-message-modal** - Alphabetical message modal
61. **feat/toggle-sidebar-scrollbar** - Toggle sidebar scrollbar
62. **feat/full-datetimes-in-fork-and-timeline-dialogues** - Full datetimes in dialogs
63. **feat/clickable-sidebar-mcps** - Clickable sidebar MCPs
64. **feat/clickable-dialogue-mcps** - Clickable dialogue MCPs
65. **feat/ignored-commands** - Ignored commands
66. **feat/sidebar-header-accent-colours** - Sidebar header accent colours
67. **feat/distinct-title-colour** - Distinct title colour
68. **feat/tool-output-colour** - Tool output colour
69. **fix/restore-footer** - Restore footer

## Merge Conflicts Resolved

Several branches had merge conflicts that were resolved:

1. **feat/compaction-model** - Combined overflow and compactionModel properties
2. **add-bash-env-parameter** - Combined both env sources in bash.ts
3. **feat/configurable-new-plan-mode** - Combined imports in prompt.ts
4. **feat/canceled-prompts-in-history** - Combined app.tsx menu items
5. **feat/modal-menus-filtered-order** - Combined dialog and prompt changes
6. **feat/merging-multiple-configs** - Combined config.ts comments
7. **feat/command-palette-consistecy** - Combined app.tsx menu items
8. **feat/argument-range-syntax** - Combined substitute.ts features
9. **feat/default-arguments** - Combined with argument-range-syntax features
10. **feat/configurable-message-and-session-limit** - Combined dialog, config, and types
11. **feat/jsonc-user-themes** - Combined config.ts functions
12. **feat/persistant-sidebar-overlay-behaviour** - Combined app.tsx menu items
13. **feat/get-session-title** - Combined registry.ts imports
14. **feat/no-disabled-lsps-in-sidebar** - Combined sidebar.tsx logic
15. **feat/distinct-title-colour** - Combined theme.tsx properties with tool-output-colour

## Notes

- All merges passed typecheck
- Integration branch pushed to origin
- 68 total branches successfully integrated