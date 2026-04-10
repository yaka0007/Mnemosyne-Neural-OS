// ─────────────────────────────────────────────────────────────────────────────
// AI Soul Passport — Schema + Generator
// Standard open source : MnemoForge CLI v1.5.0
// ─────────────────────────────────────────────────────────────────────────────
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { VaultConfig } from '../../lib/vault.js';

// ── Passport schema ───────────────────────────────────────────────────────────

export interface AstralData {
  sun?: string;
  moon?: string;
  rising?: string;
  venus?: string;
  mercury?: string;
  mars?: string;
}

export interface OceanData {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface PassportGenesis {
  created_at: string;
  birth_anchor: string;
  origin_lat?: number;
  origin_lng?: number;
  astral_influence?: number;
}

export interface AiSoulPassport {
  // Standard header
  $schema: string;
  spec_version: string;
  soul_id: string;

  // Identity
  identity: {
    name: string;
    archetype?: string;
    source: 'cli-minimal' | 'soul-studio';
  };

  // Genesis
  genesis: PassportGenesis;

  // Personality (optional — full from Soul Studio, minimal from CLI)
  ocean?: OceanData;
  astral?: AstralData;
  matrix?: {
    temperature: number;
    structure: number;
    density: number;
    tone: number;
  };

  // Behavioral
  directives: string[];

  // Memory link (path to MnemoVault resonance folder)
  memory: {
    vault_fingerprint?: string;
    resonance_score?: number;
    vault_path?: string;           // relative path in MnemoVault for OS scanner
  };

  // Integrity
  signature: {
    algorithm: 'SHA256';
    hash: string;
    signed_by: string;
    signed_at: string;
  };
}

// ── SOUL_ID generator ─────────────────────────────────────────────────────────

/** Generate deterministic SOUL_ID from name + birth timestamp + coords */
export function generateSoulId(name: string, birthIso: string, lat?: number, lng?: number): string {
  const raw = `${name}::${birthIso}::${lat ?? 0}::${lng ?? 0}`;
  const hash = crypto.createHash('sha256').update(raw).digest('hex').toUpperCase();
  return `ASTRA-${hash.slice(0, 8)}`;
}

/** Compute passport signature hash (signs all fields except the signature block) */
function signPassport(data: Omit<AiSoulPassport, 'signature'>): string {
  const canonical = JSON.stringify(data, Object.keys(data).sort());
  return crypto.createHash('sha256').update(canonical).digest('hex');
}

/** Build a minimal CLI passport (fast path — no Soul Studio required) */
export function buildMinimalPassport(opts: {
  name: string;
  archetype?: string;
  directives?: string[];
  lat?: number;
  lng?: number;
  vaultConfig?: VaultConfig;
}): AiSoulPassport {
  const now = new Date().toISOString();
  const soulId = generateSoulId(opts.name, now, opts.lat, opts.lng);

  const base: Omit<AiSoulPassport, 'signature'> = {
    $schema: 'https://schema.mnemosyne-os.io/ai-soul-passport/v1.0.json',
    spec_version: '1.0',
    soul_id: soulId,

    identity: {
      name: opts.name,
      archetype: opts.archetype,
      source: 'cli-minimal',
    },

    genesis: {
      created_at: now,
      birth_anchor: now,
      origin_lat: opts.lat,
      origin_lng: opts.lng,
    },

    directives: opts.directives ?? [],

    memory: {
      vault_path: opts.vaultConfig
        ? `${opts.vaultConfig.workspace ?? 'default'}/${opts.vaultConfig.resonanceProject ?? 'default'}/${opts.vaultConfig.ide ?? 'ai'}/${opts.vaultConfig.provider ?? 'unknown'}`
        : undefined,
    },
  };

  const hash = signPassport(base);
  return {
    ...base,
    signature: {
      algorithm: 'SHA256',
      hash,
      signed_by: `mnemoforge-cli@${process.env['npm_package_version'] ?? '1.x'}`,
      signed_at: now,
    },
  };
}

/** Parse and validate a passport JSON (from Soul Studio or CLI) */
export function parsePassport(raw: string): AiSoulPassport {
  const obj = JSON.parse(raw) as Partial<AiSoulPassport>;

  // Minimal field checks
  if (!obj.soul_id) throw new Error('Missing soul_id');
  if (!obj.identity?.name) throw new Error('Missing identity.name');
  if (!obj.genesis?.created_at) throw new Error('Missing genesis.created_at');
  if (!obj.signature?.hash) throw new Error('Missing signature.hash');

  return obj as AiSoulPassport;
}

/** Verify passport signature integrity */
export function verifyPassport(passport: AiSoulPassport): boolean {
  const { signature: _sig, ...rest } = passport;
  const expected = signPassport(rest as Omit<AiSoulPassport, 'signature'>);
  return expected === passport.signature.hash;
}

// ── MnemoVault path for passport ──────────────────────────────────────────────
// Convention: <MnemoVault>/.soul-passport/<SOUL_ID>.passport.json
// → This path is fixed and scannable by Mnemosyne OS at boot

export const PASSPORT_DIR_NAME = '.soul-passport';

export function getPassportStorePath(soulId: string, vaultBase?: string): string {
  const base = vaultBase ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
  return path.join(base, PASSPORT_DIR_NAME, `${soulId}.passport.json`);
}

/** Save passport to MnemoVault — Mnemosyne OS will scan this on boot */
export function savePassport(passport: AiSoulPassport, vaultBase?: string): string {
  const filePath = getPassportStorePath(passport.soul_id, vaultBase);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(passport, null, 2), 'utf8');
  return filePath;
}

/** Load passport from MnemoVault by soul_id */
export function loadPassport(soulId: string, vaultBase?: string): AiSoulPassport | null {
  const filePath = getPassportStorePath(soulId, vaultBase);
  if (!fs.existsSync(filePath)) return null;
  return parsePassport(fs.readFileSync(filePath, 'utf8'));
}

/** List all passports in MnemoVault */
export function listPassports(vaultBase?: string): AiSoulPassport[] {
  const base = vaultBase ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
  const dir = path.join(base, PASSPORT_DIR_NAME);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.passport.json'))
    .map(f => {
      try { return parsePassport(fs.readFileSync(path.join(dir, f), 'utf8')); }
      catch { return null; }
    })
    .filter(Boolean) as AiSoulPassport[];
}
