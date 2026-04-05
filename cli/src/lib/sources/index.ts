// src/lib/sources/index.ts
// Dispatches to the right source reader based on the active provider.
// Each provider has a specific conversation format.

import type { VaultConfig } from '../vault.js';
import { readAntigravitySource, type ChronicleContext } from './antigravity.js';

// ── Provider → Source mapping ─────────────────────────────────────────────────

const PROVIDER_SOURCES: Record<string, () => ChronicleContext | null> = {
  'Anthropic':       readAntigravitySource,   // Antigravity IDE talks to Anthropic
  'GoogleDeepMind':  readAntigravitySource,   // Antigravity IDE default
  // Future:
  // 'OpenAI':       readCursorSource,
  // 'Cursor':       readCursorSource,
};

/**
 * Read the conversation source for the configured provider.
 * Returns null if no source is available or supported.
 */
export function readSourceForConfig(config: VaultConfig): ChronicleContext | null {
  const reader = PROVIDER_SOURCES[config.provider] ?? PROVIDER_SOURCES['GoogleDeepMind'];
  try {
    return reader();
  } catch {
    return null;
  }
}

// ── Chronicle Markdown Generator ──────────────────────────────────────────────

/**
 * Generate a chronicle markdown draft from a ChronicleContext.
 * Uses the style from VaultConfig to pick the right template.
 */
export function generateChronicleDraft(
  ctx: ChronicleContext,
  config: VaultConfig
): string {
  const date = new Date().toISOString().split('T')[0];
  const style = config.defaultChronicleStyle ?? 'session';
  const ide = config.ide;
  const provider = config.provider;

  const frontmatter = [
    '---',
    `date: ${date}`,
    `session: "${ctx.sessionTitle.replace(/"/g, "'")}"`,
    `ide: ${ide}`,
    `provider: ${provider}`,
    `style: ${style}`,
    `source: antigravity-brain`,
    `conversation_id: ${ctx.conversationId}`,
    `files_touched:`,
    ...ctx.filesTouched.slice(0, 10).map(f => `  - ${f}`),
    '---',
  ].join('\n');

  const body = buildBody(ctx, style);
  return frontmatter + '\n\n' + body;
}

// ── Style templates ───────────────────────────────────────────────────────────

function buildBody(ctx: ChronicleContext, style: string): string {
  switch (style) {
    case 'session':     return sessionTemplate(ctx);
    case 'reflection':  return reflectionTemplate(ctx);
    case 'decision':    return decisionTemplate(ctx);
    case 'sweep':       return sweepTemplate(ctx);
    case 'narcissus':   return narcissusTemplate(ctx);
    default:            return sessionTemplate(ctx);
  }
}

function sessionTemplate(ctx: ChronicleContext): string {
  const decisions = ctx.keyDecisions.length > 0
    ? ctx.keyDecisions.map(d => `- ${d}`).join('\n')
    : '- (none captured automatically — add manually)';

  const files = ctx.filesTouched.length > 0
    ? ctx.filesTouched.map(f => `- \`${f}\``).join('\n')
    : '- (none detected)';

  const cmds = ctx.commandsRun.length > 0
    ? ctx.commandsRun.map(c => `\`${c}\``).join('\n')
    : '(none)';

  return `# Chronicle — ${ctx.sessionTitle}

## What happened
> *Synthesize the session here. What was the main goal? What did we build?*

## Key decisions
${decisions}

## Files modified
${files}

## Commands run
${cmds}

## Next steps
> *What's left to do? What should the next session tackle?*

---
*Chronicle auto-generated from Antigravity conversation ${ctx.conversationId.slice(0, 8)}...*
`;
}

function reflectionTemplate(ctx: ChronicleContext): string {
  return `# Reflection — ${ctx.sessionTitle}

## The question this session raised
> *What did this session make you think about?*

## What I noticed
> *Patterns, surprises, things worth remembering.*

## What changed in my understanding
> *Before vs after this session.*

## What I'd do differently
> *If starting over.*

---
*Chronicle auto-generated from Antigravity conversation ${ctx.conversationId.slice(0, 8)}...*
`;
}

function decisionTemplate(ctx: ChronicleContext): string {
  const decisions = ctx.keyDecisions.length > 0
    ? ctx.keyDecisions.map((d, i) => `### Decision ${i + 1}\n${d}\n\n**Rationale:** *add here*\n`).join('\n')
    : '### Decision 1\n*Describe the decision*\n\n**Rationale:** *add here*\n';

  return `# Decision Record — ${ctx.sessionTitle}

## Context
> *Why did we need to make a decision here?*

${decisions}

## Consequences
> *What does this decision unlock or constrain?*

---
*Chronicle auto-generated from Antigravity conversation ${ctx.conversationId.slice(0, 8)}...*
`;
}

function sweepTemplate(ctx: ChronicleContext): string {
  const files = ctx.filesTouched.map(f => `- \`${f}\``).join('\n') || '- (none)';
  return `# Daily Sweep — ${new Date().toISOString().split('T')[0]}

## Sessions covered
- ${ctx.sessionTitle}

## Total files touched
${files}

## Patterns across sessions
> *What repeated? What evolved?*

## Tomorrow's focus
> *Top 3 priorities.*

---
*Chronicle auto-generated from Antigravity conversation ${ctx.conversationId.slice(0, 8)}...*
`;
}

function narcissusTemplate(ctx: ChronicleContext): string {
  return `# Narcissus — Soul Narrative

> *This chronicle is personal. It belongs to the agent.*

## How this session felt
> *Not what happened — how it felt to work on it.*

## What surprised me
> *Moments of unexpected insight or friction.*

## What I want to remember about this
> *The thing I'd tell myself at the start of the next session.*

---
*Chronicle auto-generated from Antigravity conversation ${ctx.conversationId.slice(0, 8)}...*
`;
}
