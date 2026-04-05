# MnemoForge CLI — Architecture

> Version 1.2.5 · Updated April 5, 2026

---

## Project Structure

```
mnemoforge-cli/
├── src/
│   ├── cli.ts                        # Entry point (112 lines — bootstrap only)
│   │
│   ├── commands/                     # CLI commands isolated by domain
│   │   ├── workspace.ts              # workspace + project commands
│   │   ├── canvas.ts                 # canvas (scaffold) commands
│   │   └── chronicle/               # Chronicle command group
│   │       ├── index.ts              # Sub-command registration
│   │       ├── vault.ts              # chronicle init / status
│   │       ├── writer.ts             # chronicle commit / sweep / archive
│   │       └── reader.ts            # chronicle list / open
│   │
│   ├── lib/                          # Shared utilities
│   │   ├── vault.ts                  # Vault config read/write
│   │   ├── chronicle.ts              # Chronicle logic (sweep, archive)
│   │   ├── chronicle-parser.ts       # Parses .md → metadata (title, type, excerpt)
│   │   ├── chronicle-render.ts       # Terminal rendering of chronicles
│   │   ├── ui.ts                     # ASCII dashboard + showWelcome
│   │   ├── init-flow.ts              # Interactive vault init prompts
│   │   └── canvas/                  # Scaffolding engine
│   │       ├── canvas.ts             # Orchestrator (registry + file writing)
│   │       ├── renderer.ts           # {{VAR}} interpolation engine (zero deps)
│   │       └── templates/
│   │           └── cli/
│   │               └── files.ts      # Node.js CLI template (8 generated files)
│   │
│   └── __tests__/                    # Unit tests (node:test + tsx)
│       ├── renderer.test.ts          # Tests: toSlug, toPascal, render, buildVars
│       └── chronicle-parser.test.ts  # Tests: parseChronicle, getChronicleType
│
├── dist/                             # Compiled TypeScript output (gitignored)
├── docs/                             # Documentation
├── vitest.config.ts                  # Vitest config (kept for reference)
├── package.json                      # Scripts: build, test, test:watch, dev
└── tsconfig.json                     # TypeScript strict, ESM Node16
```

---

## Key Modules

### `src/cli.ts` — Entry Point
- Bootstrap only: creates `Command`, registers modules, parses argv
- **112 lines** (reduced from 1148 during the v1.2.4 refactor)
- Contains zero business logic

### `src/lib/canvas/renderer.ts` — Template Engine
Pure functions, zero external dependencies:
- `toSlug(name)` → `my-project`
- `toPascal(slug)` → `MyProject`
- `buildVars(name, workspace)` → full `CanvasVars` object
- `render(template, vars)` → interpolated string

### `src/lib/canvas/canvas.ts` — Orchestrator
- Template registry with status (`available` / `planned`)
- `scaffold(template, vars, targetDir)` → writes files to disk
- Overwrite protection: stops if target directory already exists

### `src/lib/chronicle-parser.ts` — Markdown Parser
- `parseChronicle(filename, dir)` → `ParsedChronicle` (title, type, date, excerpt, tags)
- Supports YAML frontmatter and Markdown headers (`# H1`, `**Type**: ...`)
- `getChronicleType(filename, dir)` → fast type lookup without full parse

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 18+ (ESM) |
| Language | TypeScript 5 strict |
| CLI framework | Commander.js v11 |
| Terminal UI | Chalk + Inquirer |
| Tests | node:test (built-in) + tsx |
| Build | tsc |
| Package manager | pnpm |

---

## Canvas — Files Generated per Template

### Template `cli` (Node.js CLI)
Generates **8 files** in the target directory:

| File | Purpose |
|------|---------|
| `package.json` | Commander + Chalk + Inquirer pre-configured |
| `tsconfig.json` | TypeScript strict, ESM, Node16 |
| `.gitignore` | node_modules, dist |
| `.cursorrules` | AI governance rules (Cursor, Windsurf, Copilot...) |
| `AGENT_INSTRUCTIONS.md` | Agent mission directive |
| `WORKSPACE.json` | Project rules (architecture, npm, neural coding) |
| `src/cli.ts` | Commander.js CLI ready to use |
| `ROADMAP.md` | Pre-filled project roadmap for the agent |
| `handbook/chronicles/.gitkeep` | Memory vault ready to use |

---

## Tests

```bash
pnpm test          # node:test via tsx — run once
pnpm test:watch    # watch mode
```

**Results v1.2.5:** 28/28 ✅
- 9 suites / 28 tests
- Covers: `renderer.ts` (toSlug, toPascal, render, buildVars) + `chronicle-parser.ts` (parseChronicle, getChronicleType)

---

## Code Conventions

- **Zero `any`** — TypeScript strict everywhere
- **`chalk.hex()` only** — no plain chalk colors
- **`process.exit(1)`** on fatal errors
- **ESM Node16** — `.js` extensions in source imports
- **Pure functions** in `lib/canvas/` — testable, zero side effects
