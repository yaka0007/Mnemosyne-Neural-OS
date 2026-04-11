# Neural Coding Principles

Neural Coding is the development methodology behind MnemoForge and the Mnemosyne Neural OS ecosystem.

## The Core Definition

> *"The intention must be present. A connection with an agent that understands the situation without a wire between them. The agent must understand the intention — but the human must know what they are actually building."*
> — Tony Trochet, 2026

## What It Means

### Without a Wire

The agent doesn't need step-by-step instructions. It understands the context, the system, the direction — not just the immediate task.

This is only possible when the agent has access to:
- **Chronicles** — the memory of past decisions
- **Workspace rules** — the invariants of the project
- **The human's intention** — what is actually being built and why

### The Human Must Know What They Are Building

Neural Coding is not vibe coding.

| Vibe Coding | Neural Coding |
|---|---|
| Human prompts without understanding | Human understands the full system |
| Agent executes without context | Agent understands the intention |
| Result: code that maybe works | Result: a system that makes sense |
| Mechanical connection | Semantic connection |
| Human follows the agent | Human directs, agent amplifies |

The human is the **architect of intention**. The agent is the **architect of execution**. But both understand what is being built.

## The Seven Principles

### P1 — Document at the Moment of Creation
Everything is documented when it is created — not after. A decision not recorded at the moment it is made is a decision that will be forgotten.

### P2 — The Funnel and the Parallel Mind
The human thinks architecture while the agent executes. Neither blocks the other. Work flows like an inverted funnel — broad intention at the top, precise execution at the bottom.

### P3 — Rules Evolve With Every Mistake
Every error the system makes becomes a rule in `WORKSPACE.json`. The system learns from itself in real time.

### P4 — Proactive Complexity Governance
Refactor before complexity accumulates. A function over 80 lines, a file over 200 lines — these are signals to restructure before the debt compounds.

### P5 — The Agent Signs Its Work
Every chronicle carries the agent's signature — IDE, provider, model, date. Memory is not anonymous. Provenance matters.

### P6 — Sovereign Memory
The project's memory belongs to the project — not to any IDE, any session, or any cloud service. `WORKSPACE.json` and chronicles are git-committed, IDE-agnostic, and always owned by the human.

### P7 — Intentional Connection
The quality of the human-agent collaboration is determined by the quality of the intention transmitted. A vague prompt produces a vague result. A clear intention — grounded in real understanding of the system — produces coherent execution.

## How MnemoForge Implements These Principles

| Principle | MnemoForge Feature |
|---|---|
| P1 — Document at creation | `chronicle archive` — write and archive immediately |
| P2 — Funnel and parallel mind | Human triggers chronicle moment, agent writes |
| P3 — Rules evolve | `workspace add-rule` after every mistake |
| P4 — Complexity governance | Built into scaffold templates |
| P5 — Agent signs its work | Automatic frontmatter (IDE, provider, date) |
| P6 — Sovereign memory | `WORKSPACE.json` in git, IDE-agnostic |
| P7 — Intentional connection | `workspace show` briefing at session start |

## The Mnemosyne OS Connection

MnemoForge CLI is the command-line interface to the Mnemosyne Neural OS — a sovereign AI architecture where:

- **Soul profiles** define the agent's identity
- **Chronicles** are the long-term memory
- **Resonance** is the multi-agent coordination layer
- **MnemoSync** enables real-time agent state sharing

### Layer 2: The Omni-Orchestrator (Super Developer Cockpit)

The ultimate expression of Neural Coding is building an OS that acts as a **Layer 2 above the LLMs and standard IDEs**. 

In this architectural trinity, the human is strictly the **Director** operating from a visual cockpit (Mnemosyne OS). They do not write code; they deploy **Blueprints** (packaged instructions and SDK rules). 
- **The Execution (Layer 1):** IDEs like Cursor acting as the autonomous Builder, physically typing the code.
- **The Routing Engine:** MnemoForge CLI moving JSON tasks and feedback loops via the Resonance Bridge.
- **The Verifying Soul:** A specialized Auditor AI (like Antigravity) that strictly validates the Builder's output for UI/UX, formatting, translations (i18n), and robustness *before* presenting the final product to the human.

Neural Coding is not just a methodology. It is the operating philosophy of the entire intelligent system.
