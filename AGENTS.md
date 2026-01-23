- To test opencode in `packages/opencode`, run `bun dev`.
- To regenerate the JavaScript SDK, run `./packages/sdk/js/script/build.ts`.
- ALWAYS USE PARALLEL TOOLS WHEN APPLICABLE.
- The default branch in this repo is `dev`.

## Sinister-Quotes Placeholders

The sinister AI-themed placeholder quotes are defined in a single shared location:
- `packages/ui/src/constants/placeholders.ts`

Both the TUI and web app import from this shared module. To add, remove, or modify quotes, edit only this file.

### Placeholder Format Warning

When merging branches that touch prompt placeholder formatting in:
- `packages/opencode/src/cli/cmd/tui/component/prompt/index.tsx`
- `packages/app/src/components/prompt-input.tsx`

**PRESERVE THIS FORMAT** (no "Ask anything" prefix, no extra quotes):
```tsx
placeholder={... : `${PLACEHOLDERS[store.placeholder]}`}
// or for web app:
: `${PLACEHOLDERS[store.placeholder]}`}
```

**REJECT THIS FORMAT** (old format that must NOT be kept):
```tsx
placeholder={... : `Ask anything... "${PLACEHOLDERS[store.placeholder]}"`}
```

A test in `test/tui/sinister-quotes.test.ts` validates this - merges that clobber the format will fail tests.
