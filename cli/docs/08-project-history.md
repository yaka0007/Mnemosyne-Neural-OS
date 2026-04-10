# Project History

MnemoForge evolves fast. Every version ships new capabilities for the Mnemosyne Neural OS ecosystem.

## Changelog

| Version | Date       | Highlights                                              |
|---------|------------|---------------------------------------------------------|
| v1.4.0  | 2026-04-09 | **Resonance Bridge** — `mnemoforge resonance` (agents/inbox/send/pulse/watch) + `@mnemosync` VS Code Chat Participant |
| v1.3.10 | 2026-04-06 | `config mcp` auto-setup by IDE + bump                  |
| v1.3.9  | 2026-04-06 | MCP server live — `write_chronicle` · `list_chronicles` · `get_vault_info` |
| v1.3.8  | 2026-04-06 | `serve` stub + profile spacing fix                     |
| v1.3.7  | 2026-04-06 | 2-col welcome screen, ANSI-safe layout (W=62)          |
| v1.3.6  | 2026-04-06 | Timeout fix deepseek-r1 (90s), ANSI padV               |
| v1.3.5  | 2026-04-06 | `config` dashboard + Ollama detection + Local AI       |
| v1.3.4  | 2026-04-05 | `config` command registered, `localAI` in VaultConfig  |
| v1.3.3  | 2026-04-05 | `prompt list` interactive selector (Inquirer)          |
| v1.3.2  | 2026-04-05 | `chronicle open` interactive vault browser             |
| v1.3.0  | 2026-04-04 | `forge` REPL mode + prompt engine                      |
| v1.2.5  | 2026-04-04 | Modular refactor + Canvas + Tests (28/28 ✅)           |
| v1.2.4  | 2026-04-04 | Extracted `commands/chronicle/` + `lib/`               |
| v1.2.3  | —          | Monolithic CLI (1148 lines)                            |
| v1.0.0  | 2026-03-26 | Initial concept — MnemoForge vision defined            |

## Architecture Evolution

### v1.0 → v1.2 — Foundation
The CLI started as a monolith. Chronicles, workspace, and scaffolding were all in `cli.ts`. Functional, but hard to extend.

### v1.2.5 — Modular Refactor
Extracted into `commands/`, `lib/`, and dedicated chronicle modules. Added 28 passing tests. This unlocked everything that followed.

### v1.3.x — AI-Native Layer
Added the Local AI pipeline (Ollama), the config dashboard, and the interactive REPL (`forge`). The CLI became a living system, not just a scaffold tool.

### v1.3.9+ — MCP & Agent Integration
The MCP server makes MnemoForge a **first-class citizen in AI agent ecosystems**. Agents can now read and write memory without human intervention.

### v1.4.0 — Resonance Bridge (Multi-Agent Protocol)
The CLI gains a full inter-agent communication layer. `mnemoforge resonance` lets agents send messages, read their inbox, update their pulse, and watch for real-time changes — all via a file-based protocol, zero infrastructure. The `@mnemosync` VS Code Chat Participant injects Resonance context directly into Cursor AI's chat. `mnemoforge init` now bootstraps the Resonance data directory automatically.

> *"Your AI agents, finally talking to each other."*

## What's Next

| Milestone | Target | Description |
|---|---|---|
| `@resonance-bridge/sdk` | v2.0 | Extract Resonance protocol as a standalone npm package for any agent stack |
| `serve` MCP live | v1.5 | `write_chronicle` + `get_context` tools via Ollama compression |
| Human-in-the-loop approval | v1.5 | C2 approval workflow in Mnemosyne OS dashboard |
| Chronicle certification | v2.0 | Cryptographic signature for memory integrity |
| Multi-vault sync | v2.0 | Share chronicles across machines and teams |
