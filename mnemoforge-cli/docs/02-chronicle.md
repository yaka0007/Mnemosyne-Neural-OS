# Chronicle System

Chronicles are the memory units of MnemoForge. They are structured Markdown files that capture key decisions, sessions, and architectural moments of a project.

> **Rule**: Chronicles are written by the agent. The human identifies the moment. The agent writes and archives.

## Chronicle Styles

| Style | Purpose |
|---|---|
| `session` | End-of-session summary — what was built, what was decided |
| `decision` | A single architectural decision — the why, the trade-offs |
| `reflection` | Agent reflection on patterns, mistakes, or learnings |
| `sweep` | Daily or weekly consolidation across multiple sessions |
| `narcissus` | Agent self-portrait — soul profile, working style |

## Commands

### archive (primary workflow)

Archive an agent-written chronicle into the vault:

```bash
mnemoforge chronicle archive --file "path/to/CHRONICLE-2026-04-05-my-decision.md"
```

The file is copied to `.cli_resonance/<IDE>/<Provider>/` in your vault.

### commit --auto

Generate a draft chronicle from the current session and open it in VS Code:

```bash
mnemoforge chronicle commit --auto
```

### commit (manual)

Create a chronicle interactively:

```bash
mnemoforge chronicle commit --title "My Decision" --type decision
```

### list

List all chronicles in the vault:

```bash
mnemoforge chronicle list
```

### sweep

Generate a daily sweep chronicle consolidating recent entries:

```bash
mnemoforge chronicle sweep
```

## Chronicle File Format

Chronicles are Markdown files with a YAML frontmatter:

```markdown
---
date: 2026-04-05
session: "The name of this session"
ide: Antigravity
provider: Anthropic
workspace: my-project
style: decision
---

# Chronicle — Title

## The Decision

...

## Why

...

---
*Written by Antigravity · 2026-04-05*
```

## Naming Convention

```
CHRONICLE-YYYY-MM-DD-short-slug.md
```

Chronicles are sorted chronologically by filename — no database needed.

## Vault Structure

```
MnemoVault/
  .cli_resonance/
    Antigravity/
      Anthropic/
        CHRONICLE-2026-04-04-proactive-governance.md
        CHRONICLE-2026-04-05-goldwin-chronicle-authorship.md
        CHRONICLE-2026-04-05-workspace-resonance.md
    Cursor/
      Anthropic/
        CHRONICLE-...md
```

Each IDE/Provider combination has its own folder. Chronicles from different agents never mix.
