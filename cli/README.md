<div align="center">

```
███╗   ███╗███╗   ██╗███████╗███╗   ███╗ ██████╗ ███████╗ ██████╗ ██████╗  ██████╗ ███████╗
████╗ ████║████╗  ██║██╔════╝████╗ ████║██╔═══██╗██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██╔████╔██║██╔██╗ ██║█████╗  ██╔████╔██║██║   ██║█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██║╚██╔╝██║██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║   ██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
██║ ╚═╝ ██║██║ ╚████║███████╗██║ ╚═╝ ██║╚██████╔╝██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

**MnemoForge CLI** — The Inception Engine of the Mnemosyne Neural OS

[![NPM Version](https://img.shields.io/badge/version-1.0.0-violet?style=flat-square)](https://github.com/yaka0007/Mnemosyne-Neural-OS)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Part of Mnemosyne](https://img.shields.io/badge/ecosystem-Mnemosyne%20Neural%20OS-8B5CF6?style=flat-square)](https://github.com/yaka0007/Mnemosyne-Neural-OS)

</div>

---

## What is MnemoForge?

**MnemoForge** is the official module scaffolding CLI for the [Mnemosyne Neural OS](https://github.com/yaka0007/Mnemosyne-Neural-OS) ecosystem.

It acts as an **AI inception engine**: a single command scaffolds a complete, production-ready module skeleton that automatically injects **AI governance rules** into the project — forcing any connected AI agent (Cursor, Claude, GitHub Copilot, etc.) to respect Mnemosyne's architectural and aesthetic standards without needing to re-explain them.

> **"Don't just scaffold code. Scaffold intelligence."**

---

## Why Does This Matter?

Modern AI-assisted development has a critical problem: every time you start a new module, you re-explain your design system to the AI. It forgets. It drifts. It produces inconsistent code.

MnemoForge solves this at the **project inception level**:

| Without MnemoForge | With MnemoForge |
|---|---|
| Re-explain design rules every session | Rules baked in at project creation |
| AI drifts from your design system | AI is constrained by `.cursorrules` DNA |
| Inconsistent component quality | Every module is Liquid Glass-compliant |
| Manual boilerplate for each module | One command: `mnemoforge init` |
| No multi-agent coordination | MnemoSync-aware from day one |

---

## Quick Start

```bash
# Install globally via npm
npm install -g @mnemosyne/forge

# Or run directly without installing
npx @mnemosyne/forge init my-new-module
```

```bash
# Initialize a new Mnemosyne-grade module
mnemoforge init QuantumVaultUI
```

That's it. In seconds, you get a complete module scaffold with:
- 🧬 **`.cursorrules`** — AI governance DNA (Liquid Glass design system constraints)
- 📋 **`AGENT_INSTRUCTIONS.md`** — Mission directive for any AI agent
- ⚛️ **`index.tsx`** — Mnemosyne-compliant React boilerplate
- 🔮 All constants pre-set to the Mnemosyne ecosystem standards

### Interactive Mode

If you omit the module name, MnemoForge enters interactive mode:

```bash
mnemoforge init

? What is the name of your new Mnemosyne module? (e.g., NexusGraph) › _
```

---

## What Gets Generated

```
my-new-module/
├── .cursorrules           # AI governance: Liquid Glass design enforcer
├── AGENT_INSTRUCTIONS.md  # Context directive for AI agents
└── index.tsx              # React entry point (Mnemosyne-compliant)
```

### The `.cursorrules` DNA File

The core of MnemoForge is the AI governance file injected into every project. It enforces:

- **Liquid Glass design system** — translucent surfaces, backdrop blur, micro-animations
- **Tailwind CSS only** — no inline styles unless strictly necessary
- **Framer Motion** for all transitions (`<motion.div layout>`)
- **Zustand** state management (no Redux)
- **Strict TypeScript** — zero `any` tolerance
- **lucide-react** icon system
- **No placeholders** — complete, deployable code as output

### The `AGENT_INSTRUCTIONS.md` Mission Directive

A structured briefing document for any autonomous AI agent. Works with:
- Cursor AI (native `.cursorrules` + instructions)
- Claude via API / Projects
- GitHub Copilot Workspace
- Any OpenAI-compatible agent

---

## Part of the Mnemosyne Ecosystem

MnemoForge is the **scaffolding layer** of a larger sovereign AI operating system:

```
┌────────────────────────────────────────────────┐
│            MNEMOSYNE NEURAL OS                 │
│                                                │
│  ┌──────────────┐    ┌─────────────────────┐  │
│  │  MnemoForge  │───▶│  Mnemosyne Desktop  │  │
│  │  CLI (this)  │    │  (Electron + React) │  │
│  └──────────────┘    └─────────────────────┘  │
│         │                      │               │
│         ▼                      ▼               │
│  ┌──────────────┐    ┌─────────────────────┐  │
│  │  Module DNA  │    │  Resonance Engine   │  │
│  │  (.cursor    │    │  (Cognitive RAG +   │  │
│  │   rules)     │    │   FGAC + MnemoSync) │  │
│  └──────────────┘    └─────────────────────┘  │
└────────────────────────────────────────────────┘
```

The parent system features:
- **1,126 automated tests** — 100% pass rate across 88 test suites
- **220,000+ lines of TypeScript** (strict mode, zero errors)
- **Multi-agent AI orchestration** with real-time coordination
- **Local-first encrypted vault** with FGAC access control
- **CI/CD pipeline** — typecheck → lint → i18n → tests (always green)

---

## Roadmap

- [x] `mnemoforge init` — module scaffolding with AI DNA injection
- [ ] `mnemoforge add <component>` — add pre-built Liquid Glass components
- [ ] `mnemoforge publish` — publish module to the Mnemosyne Plugin Marketplace
- [ ] `mnemoforge doctor` — diagnose AI governance drift in existing projects
- [ ] Multi-template support (API service, background agent, data pipeline)

---

## Development

```bash
# Clone the Mnemosyne Neural OS repo
git clone https://github.com/yaka0007/Mnemosyne-Neural-OS.git

# Navigate to the CLI package
cd Mnemosyne-Neural-OS/cli

# Install dependencies
npm install

# Build
npm run build

# Link globally for local testing
npm link

# Test
mnemoforge init test-module
```

### Extending the Templates

All generated files come from `src/templates/`. To customize the AI governance DNA for your own fork:

```bash
# Edit the AI rules
vim src/templates/.cursorrules

# Rebuild
npm run build

# All future `mnemoforge init` calls use your new rules
mnemoforge init my-custom-module
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 22+ |
| Language | TypeScript 5 (strict mode) |
| CLI Framework | Commander.js v11 |
| Prompts | Inquirer.js v8 |
| Output Styling | Chalk v4 |
| Generated UI | React 18 + Framer Motion + Tailwind CSS |

---

## License

MIT © 2026 [XPACEGEMS LLC](https://xpacegems.com) — Tony Trochet

---

## About

**XPACEGEMS LLC** — Independent AI Software Lab  
Miami, FL 33122, USA  
Founder & Lead Architect: [Tony Trochet](https://www.linkedin.com/in/tony-t-19544650/)

Built as part of **Mnemosyne Neural OS** — a production-grade sovereign AI operating system.  
Powered by **Claude (Anthropic)** · **Antigravity (Google DeepMind)** · **Cursor**

> *"The model may not know who it is. The soul does."*

---

<div align="center">

**[⭐ Star Mnemosyne Neural OS](https://github.com/yaka0007/Mnemosyne-Neural-OS)** · **[📖 Full Documentation](https://github.com/yaka0007/Mnemosyne-Neural-OS/tree/main/doc)** · **[🐛 Report Issues](https://github.com/yaka0007/Mnemosyne-Neural-OS/issues)**

</div>
