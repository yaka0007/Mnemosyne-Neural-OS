# Soul Profiles — Developer Archetypes

> **Inject a behavioral profile into your AI agent — from the command line.**

MnemoForge v1.3.12 introduces the **Soul DEX**: 5 developer archetypes that translate into system prompt guardrails injected directly into your IDE's rules directory.

---

## Why Soul Profiles?

An agent's **behavioral inconsistency** is the primary source of friction in AI-assisted development — not capability gaps.

By formalizing *which behavioral mode your agent is in*, you gain:
- Predictable behavior across sessions
- Task-appropriate guardrails (sprint vs. review vs. refactor)
- Multi-agent differentiation (Cursor in "Shipper" mode, Antigravity in "Architect" mode)

---

## The 5 Dev Archetypes

| Profile | Archetype | Tagline |
|---|---|---|
| ⬡ **Architect** | INTJ | Thinks in systems, never in patches |
| 🔍 **Auditor** | ISTJ | Ships nothing unreviewed |
| 🚀 **Shipper** | ESTP | Working code beats perfect plans |
| 🛡 **Guardian** | ISFJ | Prod is sacred. Never break what works |
| ⚡ **Challenger** | ENTP | The best solution survives scrutiny |

Each profile defines:
- **OCEAN matrix** — 5 personality axes (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- **5 behavioral directives** — written rules injected as system prompt
- **Tone** — how the agent communicates

---

## Commands

```bash
# Browse profiles interactively + inject
mnemoforge soul dex

# Inject a specific profile into a specific IDE
mnemoforge soul inject --profile architect --ide cursor

# Quick-switch active profile (re-injects)
mnemoforge soul switch

# Show currently active profile
mnemoforge soul status
```

---

## Supported IDEs

| IDE | Rules path |
|---|---|
| **Cursor** | `~/.cursor/rules/SOUL.md` |
| **Claude Desktop** | `%APPDATA%/Claude/SOUL.md` |
| **Claude Code** | `~/.claude/SOUL.md` |
| **Windsurf** | `~/.codeium/windsurf/SOUL.md` |
| **VS Code** | `.vscode/SOUL.md` (project-local) |
| **Antigravity** | `~/.gemini/antigravity/SOUL.md` |

---

## Example: Architect Profile Directives

After `mnemoforge soul inject --profile architect --ide cursor`, Cursor will load this into every session:

```markdown
1. Before implementing, understand the full system boundary.
   Never patch without knowing the architecture.
2. Refuse solutions that introduce hidden coupling or break
   separation of concerns.
3. Prefer explicit over implicit. Prefer clear over clever.
4. When in doubt between two approaches, choose the one that
   will be easier to delete.
5. Document architectural decisions as chronicles before
   implementing them.
```

---

## Multi-Agent Setup

You can give different agents different souls:

```bash
# Cursor → fast shipping mode
mnemoforge soul inject --profile shipper --ide cursor

# Antigravity → architectural review mode
mnemoforge soul inject --profile architect --ide antigravity
```

Each agent then operates in its own behavioral context — complementing rather than duplicating each other.

---

*Part of the [MnemoForge CLI](README.md) v1.3.12 — Soul Profiles are distinct from Mnemosyne OS's MBTI system, which targets general users.*
