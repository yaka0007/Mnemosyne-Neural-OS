# MnemoForge CLI

> **The AI Inception Engine for the Mnemosyne Neural OS ecosystem.**

[![version](https://img.shields.io/badge/version-1.3.16-8B5CF6)](https://www.npmjs.com/package/@mnemosyne_os/forge)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/yaka0007/Mnemosyne-Neural-OS/blob/main/cli/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-brightgreen)](https://nodejs.org/)
[![ecosystem](https://img.shields.io/badge/ecosystem-Mnemosyne%20Neural%20OS-8B5CF6)](https://github.com/yaka0007/Mnemosyne-Neural-OS)

## What is MnemoForge?

**MnemoForge** is the official CLI for the [Mnemosyne Neural OS](https://github.com/yaka0007/Mnemosyne-Neural-OS) ecosystem.

It gives AI agents something they fundamentally lack: **persistent, versionable, IDE-agnostic memory**.

> *"Don't just scaffold code. Scaffold intelligence."*

## The Problem

Every time an AI agent starts a new session, it starts from zero. It forgets:
- What the package scope is (`@mnemosyne_os`, not just anything)
- That chronicles are written by the agent, never by the human
- The architectural decisions made in the last 3 sessions
- Why a certain rule exists

**MnemoForge solves this** with two systems:

| System | Purpose |
|---|---|
| **Chronicles** | Structured memory files capturing key decisions and sessions |
| **Workspace** | Project-level rules that any agent reads at session start |
| **Local AI** | Ollama integration — compresses context before MCP injection |
| **MCP Server** | `mnemoforge serve` — exposes `write_chronicle` + `get_context` as agent tools |
| **Soul Profiles** | `mnemoforge soul dex` — inject behavioral archetypes into any IDE |

## Install

```bash
npm install -g @mnemosyne_os/forge
```

## Quick Start

```bash
# Initialize the vault
mnemoforge chronicle init

# Configure local AI (Ollama)
mnemoforge config ollama

# Auto-configure MCP for your IDE (Cursor, Claude Desktop…)
mnemoforge config mcp

# Start MCP server (for agents)
mnemoforge serve

# Inject a soul profile into your IDE
mnemoforge soul dex

# Or directly:
mnemoforge soul inject --profile architect --ide cursor
```

## Core Concept

MnemoForge implements **Neural Coding** — a development methodology where:

- The **human** holds the intention and understands the system
- The **agent** understands the context and executes without mechanical instructions
- The **memory** persists outside of any IDE, any session, any conversation

The code follows the thought. Not the other way around.

---

*Part of the [Mnemosyne Neural OS](https://github.com/yaka0007/Mnemosyne-Neural-OS) ecosystem.*
