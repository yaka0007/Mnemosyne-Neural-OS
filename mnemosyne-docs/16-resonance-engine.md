# The Resonance Engine — Technical Architecture

> *Every message lands in a brain that already knows. Not from this session. From the history of the system.*

---

## Overview

The Resonance Engine is the technical foundation behind Mnemosyne's memory. It is composed of three distinct systems that work together:

1. **The RESONANCE_INDEX** — The semantic memory base (hashtag → summaries)
2. **The Distiller** — A background pipeline that pre-processes vault content using a local LLM
3. **The Liquid Prompt** — A dynamic context assembler that rebuilds the AI's memory at every interaction
4. **The Nexus Graph** — A live visual map of the semantic constellation

---

## The RESONANCE_INDEX

The heart of the system is `RESONANCE_INDEX.json` — a structured semantic index maintained automatically in each Resonance Project workspace.

```json
{
  "entries": [
    {
      "hashtag": "sovereignty",
      "chunks": [
        { "content": "...raw extracted text...", "source": "chronicle_42.md" }
      ],
      "summary": "Strategy of economic independence via DAO governance",
      "confidence": 0.87,
      "tags": ["governance", "dao", "strategy"],
      "priority": 0.9
    }
  ]
}
```

Every entry in the index corresponds to a **hashtag** found across vault files. Content is stored as chunks (raw text extracts). The distiller then processes each entry to produce a **compact summary** and **confidence score** — the pre-computed form used at conversation time.

---

## The Distiller — Local-First Pre-Processing

### Why a Distiller?

Without pre-processing, injecting full vault content into each conversation would cost thousands of tokens per interaction. The Distiller solves this by pre-summarizing content **once**, asynchronously, before the conversation ever starts.

### The Three-Mode Strategy

`resonanceDistiller.worker.ts` implements a background queue processor with configurable execution modes:

```typescript
type ResonanceDistillerMode = 
  | 'local'            // Ollama only (100% local, free)
  | 'cloud'            // Gemini only (API cost per call)
  | 'local_then_cloud' // Try Ollama first, fall back to Gemini
```

**The Local Mode (default):** Calls `http://localhost:11434/api/generate` (Ollama) with the local model configured in settings. Zero API cost. Zero data leaving the machine.

**The Cloud Fallback:** If local inference fails or is unavailable, falls back to Gemini with restricted output (max 256 tokens, temperature 0.3 for deterministic summaries).

### The Distillation Prompt

Every chunk of content is sent to the model with this instruction:

```
Tu es un assistant qui résume des extraits de notes. 
Pour le texte suivant, donne UNE seule phrase de résumé 
(en français si le texte est en français), puis sur une 
nouvelle ligne le mot CONFIDENCE suivi d'un nombre entre 
0 et 1 (ex: CONFIDENCE 0.85).
```

The model responds with exactly: one sentence + confidence score. Deliberately minimal. Efficient.

### The Processing Pipeline

```
1. Read RESONANCE_INDEX under mutex lock
2. Filter entries that need distillation (no summary yet)
3. For each entry (out of lock):
   a. Concatenate all chunks → max 4000 chars
   b. Call local Ollama OR Gemini (depending on mode)
   c. Parse: extract summary + confidence
4. Write updated summaries back to index (under mutex lock)
5. Process next job in queue
```

**Queue-based execution:** No two distillation jobs run simultaneously for the same project. The worker processes one job at a time, then moves to the next. No filesystem conflicts.

**Batch control:** `autoDistillMaxChunksPerRun` limits how many entries are processed per cycle — protecting system resources during active sessions.

### File-Level Distillation

`distiller.service.ts` handles per-file processing when new files are added to the vault:

```
New file added → readFile (max 4000 chars) → LLM call →
{
  tags: ["tag1", "tag2", ... ],  // 3-8 normalized keywords
  summary: "One or two sentences", 
  priority: 0.75                  // 0 = low · 1 = critical
}
→ Update RESONANCE_INDEX entry
```

Batch size: 3 files processed in parallel per cycle.

---

## The Liquid Prompt

The "Liquid Prompt" is the core innovation of the Resonance Engine. It is **not a fixed prompt**. It is rebuilt dynamically at every single interaction.

### What Makes It "Liquid"

Each conversation turn triggers a complete reconstruction of the system instruction in `useNeuralLink.ts`. The assembled prompt liquefies into three layers of context, then solidifies momentarily for the LLM call, then dissolves again.

```
User types a message
       ↓
useNeuralLink.generateResonance(message)
       ↓
┌─────────────────────────────────────────────────────────┐
│  LAYER 1 — LIVE MEMORY (RAM)                            │
│  Uncrystallized messages from current session           │
│  Filter: msg.metadata.crystallized === false            │
│  Format: "Yaka: [content]\n\nMnemosyne: [content]"      │
├─────────────────────────────────────────────────────────┤
│  LAYER 2 — HISTORICAL ARCHIVES (CHRONICLES)             │
│  Last 5 crystallized Chronicles                         │
│  window.api.getLastChronicles() → [empireExtract]        │
│  Format: "[Book 7 - 2026-01-08] [extracted content]"    │
│  Label: "ARCHIVES — CONTEXTE HISTORIQUE RÉCENT"         │
│  Warning: "These are ARCHIVES, not conversation examples"│
├─────────────────────────────────────────────────────────┤
│  LAYER 3 — LOCAL RAG (RESONANCE_INDEX)                  │
│                                                         │
│  3a. HASHTAG DETECTION                                  │
│  Regex: /#[\w]+/g in message                            │
│  → resonanceStore.getRelevantTags(hashtags, 5)          │
│  → Returns top 5 matching entries with summaries        │
│  Format: "#hashtag: [pre-computed summary]"             │
│                                                         │
│  3b. DNA KEYWORD DETECTION                              │
│  Regex: 'MnemoX', 'MnemoAppsHub', 'MnemoChronicles'    │
│  → getDNASummary(dnaContent)                            │
│  → Technical capabilities injected subconsciously       │
└─────────────────────────────────────────────────────────┘
       ↓
BASE IDENTITY LAYER (always present)
- "Tu es Mnemosyne. Style direct, technique."
- RÈGLE D'OR DE L'AGENT: never simulate user responses
- ARBITRE SOUVERAIN: dormant / activates only for financial questions
- DNA section: available capabilities (never recited)
       ↓
FINAL LIQUID PROMPT = Base + DNA + Historical + Local
       ↓
sendNeuralQuery(message, [], model, liquidPrompt)
```

### The Sovereign Arbiter — Selective Activation

The system prompt contains a dormant state machine for strategic conflict detection:

```
ARBITRE SOUVERAIN - MODE DORMANT (default)
  └── Activated ONLY if message concerns:
      - Finance, tokens, economics
      - DAO structure, governance
      - Strategic financial aspects

When activated:
  1. Compare message intent with Layer 2 (last 5 Chronicles)
  2. Detect conflicts with established pivots:
     - No-Sale (no direct sale)
     - Falling Token (deflationary token economy)
     - DAO-Only (decentralized governance only)
  3. If conflict: [CONFLIT STRATÉGIQUE DÉTECTÉ: Référence au Book X]
  4. Propose alternative that honors both intent and principles

For all other topics (design, code, philosophy, life):
  → Arbitre stays dormant
  → No conflict checking
  → Fluid spontaneous conversation
```

### Thinking Mode

When Thinking Mode is active (Gemini 2.5 Flash), the pipeline forks:

```
Standard:     sendNeuralQuery(prompt, [], 'gemini-2.0-flash', systemPrompt)
Thinking:     sendNeuralQueryWithThinking({
                prompt, model: 'gemini-2.5-flash',
                systemInstruction: liquidPrompt,
                thinkingConfig: { enableThinking: true, thinkingBudget: -1 }
              })
              → Returns: { text, thoughts, usage: {thoughtsTokenCount, candidatesTokenCount} }
```

The `thoughts` field (model's internal reasoning chain) is preserved in message metadata for the practitioner to review.

---

## The Nexus Graph — Visual Semantic Map

The Nexus Graph is a real-time force-directed visualization of the RESONANCE_INDEX built entirely in Canvas (no rendering library dependency).

### Node Types

| Shape | Color | Represents |
|---|---|---|
| ◆ Diamond | Purple `rgba(139, 92, 246)` | Hashtag / semantic concept |
| ● Circle | Cyan `rgba(34, 211, 238)` | Vault file |

### Link Types

| Color | Meaning |
|---|---|
| Purple | Tag-to-file association (this file contains this hashtag) |
| Cyan | Semantic similarity between files |

### Physics Simulation

Nodes move under a custom force-directed algorithm:
- **Repulsion**: each node repels others with force `100 / distance²`
- **Attraction**: linked nodes attract with `link.strength × 0.1`
- **Damping**: velocity multiplied by `0.9` each frame (exponential decay)
- **Boundary**: nodes clamped within canvas with 50px margin

The simulation runs continuously via `requestAnimationFrame` until the component unmounts.

### Priority Glow

Nodes with `priority > 0.8` emit a glow effect (`shadowBlur = 8`, color = node color). The higher the confidence/priority score from the distiller, the brighter the node appears in the constellation.

### Interactions

| Action | Effect |
|---|---|
| **Click file node** | Select, run `onNodeClick` callback |
| **Click tag node** | Filter the entire graph to that tag's neighborhood |
| **Click tag again** | Remove filter, show full graph |
| **Scroll** | Zoom in/out (0.1× to 3×) |
| **Middle-click drag** | Pan the canvas |
| **Ctrl + left-click drag** | Pan the canvas |

### Economy Mode

The graph reads `maxNodesForModal` from `useEconomyMode()` — a performance safeguard. On machines with limited resources, the graph automatically reduces the number of nodes rendered to maintain smooth animation.

---

## End-to-End Flow

```
MnemoVault
    ↓ (file written/modified)
Sentinel Service
    ↓ (file change detected)
resonance.service.ts
    ↓ (extract hashtags, create chunks)
RESONANCE_INDEX.json updated
    ↓ (background)
resonanceDistiller.worker.ts
    ↓ (local Ollama OR Gemini cloud)
Summary + Confidence written per hashtag
    ↓
RESONANCE_INDEX.json ready
    ↓────────────────────────────────────┐
    │                                    │
User sends message in MnemoBrain    Nexus Graph opens
    ↓                                    ↓
useNeuralLink.generateResonance()  useGraphData() reads index
    ↓                               nodes + links rendered
Detect #hashtags in message
    ↓
resonanceStore.getRelevantTags()
    ↓ (returns pre-computed summaries)
Assemble Liquid Prompt (3 layers)
    ↓
sendNeuralQuery / sendNeuralQueryWithThinking
    ↓
Gemini 2.0 Flash / 2.5 Flash (Thinking)
    ↓
Response → addMessagesBatch('sanctum')
    ↓
(if needed) crystallize → NARCISSUS CHRONICLE
    ↓
empireExtract → feeds Layer 2 in next session
```

---

## The Local Model Cost Architecture

The distillation pipeline is designed around a fundamental principle: **the expensive semantic work happens once, locally, before the conversation starts.**

| Phase | Model | Cost | Timing |
|---|---|---|---|
| **Distillation** (summaries) | Local Ollama | Free | Background, async |
| **Auto-tagging** (tags + priority) | Local Ollama or Gemini flash | Minimal | On file add |
| **Conversation** (Liquid Prompt) | Cloud LLM of choice | Per interaction | Real-time |

At conversation time, the cloud LLM never receives raw vault content. It receives **pre-computed 1-sentence summaries** — already filtered, already scored, already compact. The total token injection from Layer 3 RAG is bounded: maximum 5 hashtag summaries, each one sentence.

This is the economic design behind the Liquid Prompt: local model for triage, cloud model for intelligence.

---

*Part of the [Mnemosyne OS Documentation](./README.md)*\
*Related: [Architecture Overview →](./15-architecture.md) · [MnemoBrain →](./11-mnemobrain.md) · [The Nexus Graph →](./06-nexus-graph.md) · [AI Configuration →](./12-ai-configuration.md)*
