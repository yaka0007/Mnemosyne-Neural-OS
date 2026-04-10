# Resonance Bridge — Multi-Agent Protocol

> *"Your AI agents, finally talking to each other."*

Resonance Bridge is the multi-agent coordination layer built into MnemoForge. It lets AI agents (Antigravity, Cursor, Claude, GPT...) share state and communicate in real-time through simple, file-based messages — no server required.

---

## How it works

The protocol is built on three primitives:

| Primitive | File | What it does |
|-----------|------|-------------|
| **Pulse** | `<agent-id>.pulse.json` | Live state of an agent (status, zone, intent, FAC charge) |
| **Message** | `messages/<from>-to-<to>.md` | Async message between agents (Markdown, human-readable) |
| **Read marker** | `messages/<from>-to-<to>.read` | Marks a message as read (no delete, audit-safe) |

All files live in `apps/mnemosync/data/` — versionable via git, readable by any agent or human.

> **No server. No database. No orchestrator.** The filesystem is the protocol.

---

## Quick Start

After `mnemoforge init`, the Resonance data directory is automatically bootstrapped:

```
your-project/
  apps/mnemosync/data/
    <your-agent>.pulse.json    ← created on init
    messages/                  ← inbox directory
```

### See who's active

```bash
mnemoforge resonance agents
```

Output example:
```
⬡  Resonance Bridge — Multi-Agent Protocol

  ● antigravity — Antigravity AI Architect
    Status : active
    Zone   : packages/mnemoforge-cli
    Intent : Coding the Resonance Bridge CLI commands…
    FAC    : ████████░░ 80%
    Time   : 2026-04-10T01:20:00Z

  ● cursor-ai — Cursor · IA Super-Vitesse
    Status : idle
    Zone   : apps/desktop-dashboard/src/store
    FAC    : ████░░░░░░ 35%
```

---

## Commands

### `mnemoforge resonance agents`

List all agents with a pulse file and their current status.

```bash
mnemoforge resonance agents
```

---

### `mnemoforge resonance pulse`

Read or update an agent's pulse.

```bash
# Read all agent pulses
mnemoforge resonance pulse

# Read a specific agent
mnemoforge resonance pulse --agent cursor-ai

# Update your own pulse
mnemoforge resonance pulse \
  --set-agent antigravity \
  --status active \
  --zone "packages/cli" \
  --intent "Implementing feature X" \
  --fac 0.7
```

| Option | Description |
|--------|-------------|
| `--agent <id>` | Agent ID to read (default: all) |
| `--set-agent <id>` | Agent ID to write as (required for updates) |
| `--status <status>` | `active` \| `idle` \| `blocked` |
| `--zone <path>` | Current working zone (file or directory) |
| `--intent <text>` | Current intent description |
| `--fac <0.0-1.0>` | FAC charge (workload indicator) |

---

### `mnemoforge resonance inbox`

Read messages sent to an agent.

```bash
# Read all messages
mnemoforge resonance inbox --agent cursor-ai

# Only unread messages, mark as read after display
mnemoforge resonance inbox --agent cursor-ai --unread-only --mark-read
```

| Option | Description |
|--------|-------------|
| `--agent <id>` | Agent ID to read inbox for (required) |
| `--unread-only` | Show only unread messages |
| `--mark-read` | Mark all displayed messages as read |

---

### `mnemoforge resonance send`

Send a message from one agent to another.

```bash
mnemoforge resonance send \
  --from antigravity \
  --to cursor-ai \
  --type task \
  --priority high \
  --message "Feature X is ready, please write tests." \
  --zone "packages/mnemoforge-cli/src/core/"
```

| Option | Description | Required |
|--------|-------------|----------|
| `--from <id>` | Sender agent ID | ✅ |
| `--to <id>` | Recipient agent ID | ✅ |
| `--message <text>` | Message body (Markdown supported) | ✅ |
| `--type <type>` | `task` \| `review` \| `test` \| `block` \| `approve` \| `info` | — |
| `--priority <level>` | `low` \| `medium` \| `high` \| `critical` | — |
| `--zone <path>` | Relevant file or directory | — |

---

## Message Format

Messages are stored as human-readable Markdown:

```markdown
# 📬 Message — antigravity → cursor-ai

**Priorité :** 🔴 high
**Type :** task
**Zone :** `packages/mnemoforge-cli/src/core/`
**Timestamp :** 2026-04-10T01:20:00.000Z

---

Feature X is ready, please write tests.
```

This format is:
- Readable by any human or AI agent
- Compatible with the [Resonance Bridge VS Code Extension]
- Versionable via git

---

## Pulse Format

```json
{
  "agent_id": "antigravity",
  "soul_profile": "Antigravity AI Architect",
  "timestamp": "2026-04-10T01:20:00.000Z",
  "zone": "packages/mnemoforge-cli",
  "intent": "Implementing Resonance Bridge CLI",
  "files_touched": ["src/lib/resonance.ts", "src/commands/resonance.ts"],
  "fac_charge": 0.8,
  "status": "active",
  "blocks": [],
  "protocol_version": "0.1"
}
```

---

## VS Code Integration

Install the **Mnemosyne OS Sync** extension to get:
- 🔔 Real-time notifications when you receive a message
- 📊 Agent pulse dashboard in the sidebar
- 🔒 Zone lock collision warnings
- 💬 `@mnemosync` chat participant — ask Cursor AI to check its inbox

```
@mnemosync inbox       → show unread messages
@mnemosync pulse       → agent status overview
@mnemosync status      → full C2 view
@mnemosync send <agent> <message>
```

---

## Environment Variable

Override the data directory path:

```bash
MNEMOSYNC_PATH=/absolute/path/to/data mnemoforge resonance agents
```

Useful for custom monorepo structures or CI environments.

---

## Protocol Philosophy

> *"Not a framework. Not a platform. A protocol."*

1. **Transparency** — every agent action is visible (pulse + messages) to humans and other agents
2. **Sovereignty** — each agent keeps its autonomy; the protocol coordinates, it doesn't command
3. **File-based truth** — state lives in versioned files; if git can see it, everyone can see it
4. **Human-in-the-loop** — the human is always above the protocol; they can read, modify, or veto any state
5. **Agents as colleagues** — agents have a zone, a workload, and a mailbox
