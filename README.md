<p align="center">
  <picture>
    <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
    <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
    <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="BaseOne logo">
  </picture>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">A fork of <a href="https://github.com/sst/opencode">OpenCode</a></p>

---

### Installation

```bash
# From source
git clone https://github.com/ariane-emory/base-one.git
cd base-one
bun install
bun dev

# YOLO
curl -fsSL https://opencode.ai/install | bash

# Package managers
npm i -g opencode-ai@latest        # or bun/pnpm/yarn
scoop bucket add extras; scoop install extras/opencode  # Windows
choco install opencode             # Windows
brew install opencode              # macOS and Linux
paru -S opencode-bin               # Arch Linux
mise use -g opencode               # Any OS
nix run nixpkgs#opencode           # or github:anomalyco/opencode for latest dev branch
```


### Agents

BaseOne includes two built-in agents you can switch between,
you can switch between these using the `Tab` key.

- **build** - Default, full access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also, included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

### Configuration

BaseOne uses configuration files named `base-one.json` or `base-one.jsonc`. 
For backwards compatibility, it will also look for `opencode.json` and `opencode.jsonc`.

Environment variables use the `BASE_ONE_` prefix, with fallback to `OPENCODE_` for backwards compatibility.

### Contributing

If you're interested in contributing to BaseOne, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on BaseOne

If you are working on a project that's related to BaseOne and is using "base-one" as a part of its name; for example, "base-one-dashboard" or "base-one-mobile", please add a note to your README to clarify that it is not built by the BaseOne team and is not affiliated with us in any way.

### FAQ

#### How is this different from Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Although we recommend the models we provide through [BaseOne Zen](https://opencode.ai/zen); BaseOne can be used with Claude, OpenAI, Google or even local models. As models evolve the gaps between them will close and pricing will drop so being provider-agnostic is important.
- Out of the box LSP support
- A focus on TUI. BaseOne is built by neovim users and the creators of [terminal.shop](https://terminal.shop); we are going to push the limits of what's possible in the terminal.
- A client/server architecture. This for example can allow BaseOne to run on your computer, while you can drive it remotely from a mobile app. Meaning that the TUI frontend is just one of the possible clients.

#### What's the other repo?

The other confusingly named repo has no relation to this one. You can [read the story behind it here](https://x.com/thdxr/status/1933561254481666466).

---

**Based on OpenCode** - This is a fork of [OpenCode](https://github.com/sst/opencode) by SST.
