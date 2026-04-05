# Workspace Memory

The workspace is the **external safety memory** of a project. It survives IDE resets, session truncations, and agent changes.

> Even if the IDE has its own memory system, an external backup is a critical safety net. Experience shows that agents — even well-trained ones — can forget project-specific decisions between sessions.

## The Problem It Solves

Without workspace memory:
- Agent changes → all context lost
- Session truncation → key decisions forgotten
- Multiple agents on same project → contradicting decisions

With `WORKSPACE.json`:
- Any agent reads the rules before starting work
- Decisions are preserved independently of any IDE
- The project teaches itself to new agents automatically

## Setup

Place a `WORKSPACE.json` in your project root under `.cli_resonance/`:

```
your-project/
  .cli_resonance/
    WORKSPACE.json    ← the safety memory
    vault.json        ← vault config (IDE/provider)
```

## WORKSPACE.json Format

```json
{
  "project": "my-project",
  "version": "1.0.0",
  "workspace_version": "0.1",

  "npm": {
    "scope": "@my_org",
    "package": "@my_org/my-package",
    "rules": [
      "Never create packages outside the @my_org scope",
      "Always use --access public when publishing"
    ]
  },

  "architecture": {
    "rules": [
      "Chronicles are written by the agent, never by the human",
      "The human identifies the moment, the agent writes"
    ]
  },

  "dev": {
    "rules": [
      "Always verify dist/ with grep after a TypeScript refactor",
      "Run mnemoforge --help after each npm link"
    ]
  },

  "neural_coding": {
    "principles": [
      "P1 — Everything is documented at the moment of its creation",
      "P2 — Agent executes, human thinks architecture",
      "P3 — Rules evolve with each system mistake"
    ]
  },

  "last_updated": "2026-04-05",
  "updated_by": "Antigravity (agent)"
}
```

## Commands

### workspace show

Display the workspace as an **agent briefing** — run this at the start of every session:

```bash
mnemoforge workspace show
```

Output:
```
⬡  MnemoWorkspace — Agent Briefing

  Project  : my-project
  Version  : 1.0.0

  ▸ npm
    • Never create packages outside the @my_org scope

  ▸ architecture
    • Chronicles are written by the agent, never by the human

  ▸ neural_coding.principles
    • P1 — Everything is documented at the moment of its creation

  Last updated: 2026-04-05 by Antigravity (agent)
```

### workspace add-rule

Append a rule learned from a mistake or decision:

```bash
mnemoforge workspace add-rule "Never rename the vault config without migrating chronicles" --section architecture
```

The rule is immediately written to `WORKSPACE.json`. The system learns in real time.

## The Learning Loop

```
Mistake happens
  ↓
workspace add-rule "what went wrong and why"
  ↓
WORKSPACE.json updated
  ↓
Next session: workspace show
  ↓
Agent reads the rule → mistake impossible
```

This is Neural Coding applied to project memory: **the system learns from its own errors**.
