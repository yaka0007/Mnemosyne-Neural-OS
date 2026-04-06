# Canvas Rules — Assisted Pair Protocol

> **A living ruleset shared between the human developer and the AI agent.**
> Activated once. Always present. Never explained again.

---

## The Problem

In AI-assisted development, the same errors repeat session after session:

- The agent bumps the version without checking npm (`E403 Forbidden`)
- The public repo is not synchronized after a release
- The GitBook docs lag behind the codebase
- The human has to re-explain the rules at the start of every conversation

**Memory is lost between sessions.** The agent starts from scratch. The human starts from scratch.

---

## The Solution: Canvas Rules

A persistent JSON file stored in the vault that encodes two types of rules:

| Type | Audience | Example |
| --- | --- | --- |
| `scope: "agent"` | AI reads and applies | "Always check npm version before bumping" |
| `scope: "human"` | Human checklist | "Use `.\publish.ps1` to publish" |
| `scope: "both"` | Both | "Pipeline: TSC → test → build → publish" |

These rules are **automatically applied** based on context (trigger: publish, mcp, feature...) without the human needing to re-state them.

---

## Canvas File Structure

```json
{
  "project": "mnemoforge-cli",
  "description": "Living rules for the project. Updated across sessions.",
  "last_updated": "2026-04-06",
  "updated_by": "Antigravity",
  "rules": [
    {
      "id": "npm_version_check",
      "label": "Verify npm version before any bump",
      "scope": "both",
      "enabled": true,
      "added": "2026-04-06",
      "trigger": "publish",
      "agent_directive": "Always run `npm view @pkg version` before modifying package.json. npm = source of truth.",
      "human_checklist": "Use .\\publish.ps1 — it auto-bumps from npm."
    }
  ]
}
```

**Vault path**: `MnemoVault/.cli_resonance/canvas/<project>.canvas.json`

---

## How Rules Evolve

During a session, when a new issue is identified:

1. The agent (or human) says: *"this should never happen again"*
2. The agent adds the rule to the canvas JSON in the vault
3. It is active immediately for all future sessions

> **Real-world example:** The rule `terminal_zombie_handling` was added after detecting that long-running terminals block critical commands.

---

## CLI Commands

```bash
# View and toggle rules for a project
mnemoforge canvas rules [project]

# Show only active agent-scoped rules
mnemoforge canvas rules --scope agent --enabled

# Inject active rules into the IDE's SOUL.md
mnemoforge canvas inject [project] --ide cursor
```

---

## Toggle Interface (terminal)

```
  ⬡  Canvas Rules — mnemoforge-cli

  ☑  npm_version_check        Verify npm before any bump              [both]
  ☑  sync_public_repo         Keep Mnemosyne-Neural-OS in sync        [agent]
  ☑  gitbook_sync             Update docs on every feature            [agent]
  ☑  gitbook_in_english       All GitBook docs must be in English     [agent]
  ☑  build_pipeline           TSC → test → build → publish            [both]
  ☑  vault_write_via_node     Use node script for vault writes        [agent]
  ☑  mcp_logs_stderr          MCP logs on stderr only                 [agent]
  ☐  refactor_before_feature  Refactor before each feature            [both]  ← disabled

  [Space] toggle  [Enter] confirm  [Ctrl+C] cancel
```

---

## Philosophy: Assisted Pair Protocol

This system formalizes a new development UX:

```
SESSION 1                   SESSION N
   │                           │
   ├─ New rules discovered      ├─ Canvas loaded
   ├─ Canvas updated ─────────► ├─ Agent applies rules
   └─ Problems solved           └─ Human explains nothing
```

**The human thinks in needs. The agent thinks in rules.**
The canvas is the interface between the two.

### What It Eliminates

- ❌ "Remember to always check npm version before bumping"
- ❌ "Don't forget to sync the public repo"
- ❌ "The MCP must log to stderr"
- ❌ Re-explaining conventions every session

### What It Produces

- ✅ A growing knowledge base per project
- ✅ An auto-generated human checklist from rules
- ✅ An always-current agent context
- ✅ An audit trail of *why* each rule exists (`added`, `trigger`)

---

## Relationship with Soul Profiles

| Soul Profile | Canvas Rules |
| --- | --- |
| Agent behavior | Project operational rules |
| "How I think" | "What I need to know here" |
| Archetype (Architect, Shipper...) | Repo-specific context |
| Session-level | Project-level + persistent |

They are complementary. The Soul Profile defines *who the agent is*. Canvas Rules defines *what the agent must know about this project*.

---

*MnemoForge CLI v1.3.12+ · Vault path: `MnemoVault/.cli_resonance/canvas/`*
