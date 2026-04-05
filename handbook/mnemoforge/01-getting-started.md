# Getting Started

## Installation

```bash
npm install -g @mnemosyne_os/forge
```

Verify:

```bash
mnemoforge --version
```

## Initialize the Vault

The vault is where your chronicles are stored. Run once per machine:

```bash
mnemoforge chronicle init
```

You will be asked to configure:

| Field | Description | Example |
|---|---|---|
| **IDE** | The AI assistant you use | `Antigravity`, `Cursor`, `ClaudeCode` |
| **Provider** | The model provider | `Anthropic`, `GoogleDeepMind`, `OpenAI` |
| **Vault path** | Where chronicles are stored | `~/Documents/MnemoVault` |
| **Style** | Default chronicle style | `session`, `decision`, `reflection` |

Chronicles will be stored at:

```
~/Documents/MnemoVault/.cli_resonance/<IDE>/<Provider>/
```

## Initialize the Workspace

From your project root, create a `WORKSPACE.json` — the project's safety memory:

```bash
# Create manually or copy the template
# .cli_resonance/WORKSPACE.json
```

Then verify it loads correctly:

```bash
mnemoforge workspace show
```

This is the **agent briefing** — any AI opening this project should run this first.

## Quick Workflow

```bash
# 1. Agent writes a chronicle (a key moment during work)
#    → handbook/chronicles/CHRONICLE-2026-04-05-my-decision.md

# 2. Archive it to the vault
mnemoforge chronicle archive --file "handbook/chronicles/CHRONICLE-2026-04-05-my-decision.md"

# 3. Done — it's now in .cli_resonance/IDE/Provider/
```
