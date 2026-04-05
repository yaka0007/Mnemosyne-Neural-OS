// src/lib/sources/antigravity.ts
// Reads Antigravity conversation logs from .gemini/antigravity/brain/
// Parses overview.txt and extracts chronicle-relevant content

import fs from 'fs';
import path from 'path';
import os from 'os';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ConversationTurn {
  role: 'user' | 'agent';
  content: string;
}

export interface ChronicleContext {
  conversationId: string;
  startedAt: string | null;
  sessionTitle: string;
  filesTouched: string[];
  commandsRun: string[];
  keyDecisions: string[];
  rawTurns: ConversationTurn[];
  sourcePath: string;
}

// ── Paths ────────────────────────────────────────────────────────────────────

const BRAIN_DIR = path.join(
  os.homedir(),
  '.gemini', 'antigravity', 'brain'
);

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * List all conversation folders sorted by modification time (most recent first).
 */
function listConversations(): { id: string; mtime: Date; overviewPath: string }[] {
  if (!fs.existsSync(BRAIN_DIR)) return [];

  return fs.readdirSync(BRAIN_DIR)
    .map(id => {
      const overviewPath = path.join(BRAIN_DIR, id, '.system_generated', 'logs', 'overview.txt');
      // Fallback: some structures put overview.txt directly in the folder
      const altPath = path.join(BRAIN_DIR, id, 'overview.txt');
      const resolved = fs.existsSync(overviewPath) ? overviewPath
        : fs.existsSync(altPath) ? altPath
        : null;
      if (!resolved) return null;
      const stat = fs.statSync(resolved);
      return { id, mtime: stat.mtime, overviewPath: resolved };
    })
    .filter(Boolean)
    .sort((a, b) => b!.mtime.getTime() - a!.mtime.getTime()) as { id: string; mtime: Date; overviewPath: string }[];
}

/**
 * Extract file paths mentioned in text lines (heuristic: contains / or \ and a file extension).
 */
function extractFilePaths(lines: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  const filePattern = /([a-zA-Z0-9_\-./\\]+\.(ts|js|json|md|css|html|py|sh|ps1))/g;

  for (const line of lines) {
    const matches = line.match(filePattern) ?? [];
    for (const m of matches) {
      const clean = m.trim();
      if (!seen.has(clean) && clean.length > 3) {
        seen.add(clean);
        result.push(clean);
      }
    }
  }
  return result.slice(0, 20); // cap at 20
}

/**
 * Extract shell commands (lines that look like CLI invocations).
 */
function extractCommands(lines: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  // Patterns: pnpm, npm, npx, git, mnemoforge, tsc
  const cmdPattern = /^(pnpm|npm|npx|git|mnemoforge|tsc|node|pwsh|powershell)\s+.+/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (cmdPattern.test(trimmed) && !seen.has(trimmed)) {
      seen.add(trimmed);
      result.push(trimmed);
    }
  }
  return result.slice(0, 15);
}

/**
 * Heuristic session title from the overview: use the first substantive user line.
 */
function extractTitle(lines: string[]): string {
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip short lines, timestamps, or system lines
    if (trimmed.length > 20 && !trimmed.startsWith('[') && !trimmed.startsWith('#')) {
      return trimmed.slice(0, 80);
    }
  }
  return 'Development session';
}

/**
 * Extract key decision lines (heuristic: lines mentioning "decision", "chose", "on a décidé", etc.)
 */
function extractDecisions(lines: string[]): string[] {
  const keywords = [
    'decided', 'decision', 'on a décidé', 'refactor', 'remove', 'on retire',
    'on supprime', 'approach', 'strategy', 'instead', 'changed', 'principle'
  ];
  const result: string[] = [];
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (keywords.some(k => lower.includes(k)) && line.trim().length > 30) {
      result.push(line.trim().slice(0, 120));
      if (result.length >= 8) break;
    }
  }
  return result;
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Read the latest Antigravity conversation and return a ChronicleContext.
 * @param conversationId — optional, defaults to most recent
 */
export function readAntigravitySource(conversationId?: string): ChronicleContext | null {
  const conversations = listConversations();
  if (conversations.length === 0) return null;

  const target = conversationId
    ? conversations.find(c => c.id === conversationId) ?? conversations[0]
    : conversations[0];

  const raw = fs.readFileSync(target.overviewPath, 'utf8');
  const lines = raw.split('\n').filter(l => l.trim() !== '');

  // Parse turns — each line is one action (simplified)
  const turns: ConversationTurn[] = lines.map(line => ({
    role: line.startsWith('USER') || line.startsWith('user') ? 'user' : 'agent',
    content: line.trim(),
  }));

  return {
    conversationId: target.id,
    startedAt: target.mtime.toISOString(),
    sessionTitle: extractTitle(lines),
    filesTouched: extractFilePaths(lines),
    commandsRun: extractCommands(lines),
    keyDecisions: extractDecisions(lines),
    rawTurns: turns,
    sourcePath: target.overviewPath,
  };
}

/**
 * List all available Antigravity conversations (for --list selection).
 */
export function listAntigravityConversations(): { id: string; mtime: Date }[] {
  return listConversations().map(c => ({ id: c.id, mtime: c.mtime }));
}
