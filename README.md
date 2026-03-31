<div align="center">

<br/>

```
███╗   ███╗███╗   ██╗███████╗███╗   ███╗ ██████╗ ███████╗██╗   ██╗███╗   ██╗███████╗
████╗ ████║████╗  ██║██╔════╝████╗ ████║██╔═══██╗██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
██╔████╔██║██╔██╗ ██║█████╗  ██╔████╔██║██║   ██║███████╗ ╚████╔╝ ██╔██╗ ██║█████╗  
██║╚██╔╝██║██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║   ██║╚════██║  ╚██╔╝  ██║╚██╗██║██╔══╝  
██║ ╚═╝ ██║██║ ╚████║███████╗██║ ╚═╝ ██║╚██████╔╝███████║   ██║   ██║ ╚████║███████╗
╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚═╝  ╚═══╝╚══════╝
```

### Personal AI Operating System

**Local-first · Multi-model · Sovereign · Encrypted**

<br/>

[![CI](https://github.com/yaka0007/mnemosyne/actions/workflows/ci.yml/badge.svg)](https://github.com/yaka0007/mnemosyne/actions)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)
![Electron](https://img.shields.io/badge/Electron-39-47848f?logo=electron)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Tests](https://img.shields.io/badge/tests-1126%20passed-22c55e)
![License](https://img.shields.io/badge/license-Proprietary-8b5cf6)
![Version](https://img.shields.io/badge/version-1.0.0--beta.8-f59e0b)

<br/>

</div>

---

## What is Mnemosyne?

Mnemosyne is a **production-grade desktop application** that puts AI under your control — locally, privately, and on your terms.

Most AI tools are fragmented: one app for chat, another for notes, another for tasks, another for file management. Mnemosyne integrates all of it into a single sovereign environment, where **you decide what runs, what's stored, and what gets shared**.

> *"Not a wrapper around ChatGPT. Not another productivity app. A personal AI operating system."*

---

## Core Modules

| Module | Description |
|--------|-------------|
| 🧠 **MnemoBrain** | Multi-model AI conversation hub — Claude, Ollama (local), OpenAI-compatible |
| 🎭 **Soul Studio** | AI identity builder — 16 MBTI archetypes, OCEAN personality model, custom soul profiles |
| 🌐 **MnemoDex** | Universal index of 16 MBTI archetypes and custom AI souls |
| 🗄️ **MnemoVault** | Encrypted local knowledge vault with full-text search and file management |
| 🔄 **MnemoSync** | Multi-agent orchestration with P2P Shadow Sync and real-time coordination |
| 🛡️ **Policy Studio** | AI governance layer with FGAC (Fine-Grained Access Control) |
| 📊 **MnemoStrategist** | AI planner integrating the BMAD 2.0 system for real-life project creation (Web2 & Web3) |
| ⚡ **MnemoForge** | AI-driven app generator — scaffold full Mnemosyne modules from a prompt |
| 🧩 **MnemoHub** | Centralized ecosystem hub for managing all optional apps, widgets, and features |
| 🔗 **NexusGraph** | Knowledge graph visualization |
| 🎯 **Cockpit** | Personalized AI dashboard with modular widgets |

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    RENDERER PROCESS                     │
│  React 18 · TypeScript strict · Vite · Framer Motion   │
│  Zustand (state) · i18next (EN/FR/ES) · Tailwind CSS   │
│                                                         │
│  30+ lazy-loaded routes · Suspense boundaries          │
│  62+ i18n namespaces · 88 test files · 1,126 tests     │
└────────────────────┬────────────────────────────────────┘
                     │ Context Bridge (379 methods)
                     │ contextIsolation: true · sandbox: true
┌────────────────────▼────────────────────────────────────┐
│                    MAIN PROCESS (Electron)               │
│  IPC Registry · Modular services architecture           │
│  Structured logging (ANSI → userData/logs/main.log)     │
│  Content Security Policy · Node.js binary resolver      │
│                                                         │
│  Services: AI · Vault · Drive · Workspace · Shadow      │
│             Window · Network · FGAC · Scheduler         │
└─────────────────────────────────────────────────────────┘
```

**Stack:**
- **Runtime:** Electron 39, Node.js 22
- **Frontend:** React 18, TypeScript (strict mode), Vite
- **State:** Zustand with `useShallow` atomic selectors
- **Styling:** Tailwind CSS + CSS variables for theming
- **AI Integration:** Claude API, Ollama (local LLMs), OpenAI-compatible endpoints
- **Testing:** Vitest + Testing Library — 1,126 tests, 100% pass rate
- **CI/CD:** GitHub Actions — typecheck + lint + i18n validation + tests

---

## Key Technical Achievements

### 🔐 Security-First Electron Architecture
- `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`
- 379 explicitly declared IPC methods via Context Bridge
- Zod-validated IPC handlers with audit logging
- Strict Content Security Policy

### 🌍 Full Internationalization
- 3 languages: English, French, Spanish
- 62+ modular JSON namespaces
- Legacy aggregator pattern for backward compatibility

### 🤖 Multi-Agent AI Orchestration
- MnemoSync coordinates multiple AI agents in real-time
- Policy Studio enforces AI behavior boundaries via FGAC
- Soul profiles inject personality context into every AI interaction
- MnemoForge can scaffold new applications autonomously

### 📊 Operational Stability (Certified)
- 7-day continuous green gate (operational stability protocol)
- Auto-healing FGAC with expiry detection and silent re-application
- P2P Shadow Sync with alert system and OS notifications
- 24h TTL on access grants, self-healing on refresh

---

## Quality Metrics

```
TypeScript errors     : 0   (strict mode, noUncheckedIndexedAccess)
ESLint warnings       : 0
Test pass rate        : 100%  (1,126 / 1,126)
Test files            : 88
CI pipeline           : ✅ Green (typecheck → lint → i18n → tests)
Source files          : 1,281 TS/TSX files
Lines of code         : 220,000+ (src) + 43,000+ (electron)
Languages             : 3 (EN / FR / ES)
i18n namespaces       : 62+
Electron security     : A-grade (all mitigations active)
```

---

## Certifications

The system has been independently audited and certified through structured stability protocols:

| Cert | Description | Status |
|------|-------------|--------|
| [CERT-001](doc/certifications/CERT-001_MNEMOSYNE_OPERATIONAL_STABILITY.md) | Mnemosyne Operational Stability — 7-day gate | ✅ Certified 2026-03-24 |
| [CERT-002](doc/certifications/CERT-002_SCC_SOVEREIGNTY_COMMAND_CENTER.md) | Sovereignty Command Center | ✅ Certified |
| [CERT-003](doc/certifications/CERT-003_P2P_SHADOW_SYNC_INTER_CITADEL_RESONANCE.md) | P2P Shadow Sync — Inter-Citadel Resonance | ✅ Certified |
| [STAB-2026-03-31](doc/STABILITY_OPTIMIZATION_REPORT.md) | Optimization & Stability Report | ✅ Certified 2026-03-31 |

---

## Development Philosophy

Mnemosyne is built on three principles:

**1. Sovereignty** — Your data stays local. Your models run locally if you choose. No telemetry without consent. FGAC controls what the AI can and cannot access.

**2. Multi-model** — No vendor lock-in. Claude for reasoning quality, Ollama for local/offline runs, any OpenAI-compatible endpoint. The soul profile layer works across all backends.

**3. Agentic by design** — Not a chat interface with file upload. A real orchestration layer where multiple AI agents coordinate, with policy enforcement and audit trails.

---

## Roadmap

- [ ] Public beta release (install-ready `.exe` / `.dmg`)
- [ ] MnemoForge public CLI (`npx mnemoforge init`)
- [ ] Team features (shared vault, multi-soul coordination)
- [ ] Self-hosted sync server
- [ ] Plugin marketplace for community soul profiles

---

## About

**XPACEGEMS LLC** — Independent AI software lab  
**Headquarters:** 2932 NW 72 AVE, Miami, FL 33122, USA  
**Developer:** yaka0007  
**GitHub:** [@yaka0007](https://github.com/yaka0007)

> Built with Claude (Anthropic) · Antigravity (Google DeepMind) · Cursor  
> 741 contributions · 253 commits in March 2026 alone

---

<div align="center">

*"The model may not know who it is. The soul does."*

<br/>

![GitHub last commit](https://img.shields.io/github/last-commit/yaka0007/mnemosyne)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/yaka0007/mnemosyne)

</div>
