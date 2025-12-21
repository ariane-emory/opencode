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
```

### Agents

BaseOne includes two built-in agents you can switch between,
you can switch between these using the `Tab` key.

- **build** - Default, full access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also, included is a **general** subagent for complex searches and multi-step tasks.
This is used internally and can be invoked using `@general` in messages.

### Configuration

BaseOne uses configuration files named `base-one.json` or `base-one.jsonc`. 
For backwards compatibility, it will also look for `opencode.json` and `opencode.jsonc`.

Environment variables use the `BASE_ONE_` prefix, with fallback to `OPENCODE_` for backwards compatibility.

### Contributing

If you're interested in contributing to BaseOne, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

---

**Based on OpenCode** - This is a fork of [OpenCode](https://github.com/sst/opencode) by SST.
