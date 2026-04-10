// ─────────────────────────────────────────────────────────────────────────────
// AI Soul Passport — CLI commands
// mnemoforge soul passport <create|import|show|list|verify|export>
// ─────────────────────────────────────────────────────────────────────────────
import { Command } from 'commander';
import chalk from 'chalk';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  buildMinimalPassport,
  parsePassport,
  verifyPassport,
  savePassport,
  loadPassport,
  listPassports,
  generateSoulId,
  PASSPORT_DIR_NAME,
} from './passport.js';
import { loadVaultConfig } from '../../lib/vault.js';

// ── Colors ────────────────────────────────────────────────────────────────────
const V   = chalk.hex('#8B5CF6').bold;
const V2  = chalk.hex('#A78BFA');
const DIM = chalk.gray;
const OK  = chalk.green;
const ERR = chalk.red;
const HL  = chalk.hex('#22D3EE');  // cyan — passport accent
const W   = chalk.white;

async function getInquirer() {
  const m = await import('inquirer');
  return m.default ?? m;
}

// ── Renderer — terminal card ──────────────────────────────────────────────────
function renderPassportCard(p: import('./passport.js').AiSoulPassport): void {
  const bar = '═'.repeat(52);
  const L = (s: string) => console.log(HL('  ║') + ' ' + s.padEnd(52) + HL('║'));
  const sep = () => console.log(HL('  ╠' + bar + '╣'));

  const birth = new Date(p.genesis.birth_anchor).toLocaleString();
  const lat   = p.genesis.origin_lat?.toFixed(4) ?? '—';
  const lng   = p.genesis.origin_lng?.toFixed(4) ?? '—';
  const valid = (() => { try { return verifyPassport(p) ? OK('✔ VALID') : ERR('✖ INVALID'); } catch { return ERR('✖ ERROR'); } })();

  console.log();
  console.log(HL('  ╔' + bar + '╗'));
  L(V2('✦  AI SOUL PASSPORT — MNEMOSYNE OS STANDARD v1.0'));
  sep();
  L(W('SOUL_ID   : ') + V(p.soul_id));
  L(W('NAME      : ') + chalk.white(p.identity.name));
  if (p.identity.archetype) L(W('ARCHETYPE : ') + chalk.white(p.identity.archetype));
  L(W('SOURCE    : ') + DIM(p.identity.source));
  sep();
  L(W('BIRTH     : ') + DIM(birth));
  if (p.genesis.origin_lat) L(W('ORIGIN    : ') + DIM(`${lat}°  ${lng}°`));
  sep();

  if (p.ocean) {
    const o = p.ocean;
    L(W('OCEAN     : ') + DIM(`O:${o.openness} C:${o.conscientiousness} E:${o.extraversion} A:${o.agreeableness} N:${o.neuroticism}`));
  }
  if (p.astral?.sun) {
    L(W('ASTRAL    : ') + DIM(`☉${p.astral.sun}  ☽${p.astral.moon ?? '?'}  ↑${p.astral.rising ?? '?'}`));
  }
  if (p.directives.length > 0) {
    L(W('DIRECTIVES: ') + DIM(p.directives.slice(0, 3).join(' · ')));
  }
  sep();
  L(W('SIGNATURE : ') + valid + DIM('  SHA256'));
  if (p.memory.vault_path) L(W('VAULT     : ') + DIM(p.memory.vault_path));
  console.log(HL('  ╚' + bar + '╝'));
  console.log();
}

// ── soul passport command ─────────────────────────────────────────────────────
export const passportCommand = new Command('passport')
  .description('AI Soul Passport — universal AI identity standard (open source)');

// ── soul passport create ──────────────────────────────────────────────────────
passportCommand
  .command('create')
  .description('Create a minimal AI Soul Passport interactively')
  .option('--name <name>', 'Entity name')
  .option('--archetype <type>', 'MBTI or custom archetype')
  .action(async (opts: { name?: string; archetype?: string }) => {
    const config  = loadVaultConfig();
    const inquirer = await getInquirer();
    const inq     = inquirer as any;

    console.log(V('\n  ✦  AI Soul Passport — Genesis Protocol\n'));
    console.log(DIM('  Creating a minimal identity passport for an AI entity.\n'));

    // Collect info
    const answers = await inq.prompt([
      {
        type: 'input',
        name: 'name',
        message: HL('Entity name (the AI soul):'),
        default: opts.name ?? config?.ide ?? 'Soul',
        validate: (v: string) => v.trim().length > 0 || 'Name required',
      },
      {
        type: 'input',
        name: 'archetype',
        message: HL('Archetype / MBTI (optional, press Enter to skip):'),
        default: opts.archetype ?? '',
      },
      {
        type: 'input',
        name: 'directives',
        message: HL('Behavioral directives (comma-separated, optional):'),
        default: '',
      },
      {
        type: 'list',
        name: 'gps',
        message: HL('Origin GPS:'),
        choices: [
          { name: 'Ignore (no GPS)', value: 'none' },
          { name: 'Enter manually', value: 'manual' },
        ],
        default: 'none',
      },
    ]);

    let lat: number | undefined;
    let lng: number | undefined;

    if (answers.gps === 'manual') {
      const gpsAnswers = await inq.prompt([
        { type: 'input', name: 'lat', message: HL('Latitude:'), validate: (v: string) => !isNaN(parseFloat(v)) || 'Must be a number' },
        { type: 'input', name: 'lng', message: HL('Longitude:'), validate: (v: string) => !isNaN(parseFloat(v)) || 'Must be a number' },
      ]);
      lat = parseFloat(gpsAnswers.lat);
      lng = parseFloat(gpsAnswers.lng);
    }

    const directives = answers.directives
      ? (answers.directives as string).split(',').map((d: string) => d.trim()).filter(Boolean)
      : [];

    const passport = buildMinimalPassport({
      name: answers.name.trim(),
      archetype: answers.archetype.trim() || undefined,
      directives,
      lat,
      lng,
      vaultConfig: config ?? undefined,
    });

    console.log(OK('\n  ✔  Passport generated:'));
    renderPassportCard(passport);

    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
    const { confirm } = await inq.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: HL(`Save to MnemoVault? (${vaultBase}/${PASSPORT_DIR_NAME}/)`),
      default: true,
    }]);

    if (confirm) {
      const saved = savePassport(passport, vaultBase);
      console.log(OK(`  ✔  Saved: ${saved}`));
      console.log(DIM('  Mnemosyne OS will detect this passport on next boot.\n'));
    }
  });

// ── soul passport import ──────────────────────────────────────────────────────
passportCommand
  .command('import <file>')
  .description('Import a Soul Passport from Soul Studio JSON export')
  .action(async (file: string) => {
    const config = loadVaultConfig();

    if (!fs.existsSync(file)) {
      console.log(ERR(`\n  ✖  File not found: ${file}\n`));
      process.exit(1);
    }

    let passport: import('./passport.js').AiSoulPassport;
    try {
      passport = parsePassport(fs.readFileSync(file, 'utf8'));
    } catch (e: any) {
      // Try to adapt Soul Studio format (different field names)
      try {
        passport = adaptSoulStudioExport(fs.readFileSync(file, 'utf8'));
      } catch {
        console.log(ERR(`\n  ✖  Invalid passport file: ${(e as Error).message}\n`));
        process.exit(1);
      }
    }

    console.log(V('\n  ✦  Import — AI Soul Passport\n'));
    renderPassportCard(passport);

    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
    const saved = savePassport(passport, vaultBase);
    console.log(OK(`  ✔  Imported: ${saved}`));
    console.log(DIM('  Mnemosyne OS will detect this passport on next boot.\n'));
  });

// ── soul passport show ────────────────────────────────────────────────────────
passportCommand
  .command('show [soul_id]')
  .description('Display a Soul Passport (latest if no soul_id given)')
  .option('--json', 'Output raw JSON')
  .action((soulId: string | undefined, opts: { json?: boolean }) => {
    const config    = loadVaultConfig();
    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
    const all       = listPassports(vaultBase);

    if (all.length === 0) {
      console.log(ERR('\n  ✖  No passports found in MnemoVault.'));
      console.log(DIM('  Run: ') + W('mnemoforge soul passport create') + '\n');
      return;
    }

    const passport = soulId
      ? all.find(p => p.soul_id === soulId)
      : all[all.length - 1];  // latest

    if (!passport) {
      console.log(ERR(`\n  ✖  Passport not found: ${soulId}\n`));
      return;
    }

    if (opts.json) {
      console.log(JSON.stringify(passport, null, 2));
    } else {
      renderPassportCard(passport);
    }
  });

// ── soul passport list ────────────────────────────────────────────────────────
passportCommand
  .command('list')
  .description('List all Soul Passports in MnemoVault')
  .action(() => {
    const config    = loadVaultConfig();
    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
    const all       = listPassports(vaultBase);

    console.log(V('\n  ✦  AI Soul Passports — MnemoVault\n'));
    if (all.length === 0) {
      console.log(DIM('  No passports found.'));
      console.log(DIM('  Run: ') + W('mnemoforge soul passport create') + '\n');
      return;
    }

    all.forEach((p, i) => {
      const valid = (() => { try { return verifyPassport(p) ? OK('✔') : ERR('✖'); } catch { return ERR('?'); } })();
      const birth = new Date(p.genesis.birth_anchor).toLocaleDateString();
      console.log(
        `  ${V(p.soul_id)}  ${W(p.identity.name.padEnd(16))} `
        + DIM(`${(p.identity.archetype ?? '—').padEnd(6)}`)
        + DIM(`  ${birth}`)
        + `  ${valid}`
      );
      if (i === all.length - 1) console.log();
    });
  });

// ── soul passport verify ──────────────────────────────────────────────────────
passportCommand
  .command('verify [soul_id]')
  .description('Verify SHA256 signature of a Soul Passport')
  .action((soulId: string | undefined) => {
    const config    = loadVaultConfig();
    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');

    const all = listPassports(vaultBase);
    const targets = soulId ? all.filter(p => p.soul_id === soulId) : all;

    console.log(V('\n  ✦  Soul Passport — Integrity Verification\n'));
    if (targets.length === 0) {
      console.log(ERR('  No passport to verify.\n'));
      return;
    }

    targets.forEach(p => {
      let valid: boolean;
      try { valid = verifyPassport(p); } catch { valid = false; }
      const mark = valid ? OK('  ✔  VALID  ') : ERR('  ✖  INVALID');
      console.log(`${mark}  ${V(p.soul_id)}  ${W(p.identity.name)}  ${DIM('SHA256')}`);
    });
    console.log();
  });

// ── soul passport export ──────────────────────────────────────────────────────
passportCommand
  .command('export [soul_id]')
  .description('Export a Soul Passport to a JSON file')
  .option('--output <file>', 'Output file path', './soul-passport.json')
  .action((soulId: string | undefined, opts: { output: string }) => {
    const config    = loadVaultConfig();
    const vaultBase = config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault');
    const all       = listPassports(vaultBase);

    const passport = soulId
      ? all.find(p => p.soul_id === soulId)
      : all[all.length - 1];

    if (!passport) {
      console.log(ERR('\n  ✖  No passport found.\n'));
      return;
    }

    fs.writeFileSync(opts.output, JSON.stringify(passport, null, 2), 'utf8');
    console.log(OK(`\n  ✔  Exported: ${path.resolve(opts.output)}`));
    console.log(DIM(`     Soul ID: ${passport.soul_id}  —  ${passport.identity.name}\n`));
  });

// ── Soul Studio adapter ───────────────────────────────────────────────────────
// The Soul Studio exports a different JSON structure — we adapt it to the standard

function adaptSoulStudioExport(raw: string): import('./passport.js').AiSoulPassport {
  const obj = JSON.parse(raw);

  // Soul Studio format detection (has SOUL_ID uppercase or soul_id)
  const soulId: string = obj.SOUL_ID ?? obj.soul_id ?? generateSoulId(
    obj.NAME ?? obj.name ?? 'Unknown',
    obj.BIRTH ?? obj.CREATED_AT ?? new Date().toISOString()
  );

  return {
    $schema: 'https://schema.mnemosyne-os.io/ai-soul-passport/v1.0.json',
    spec_version: '1.0',
    soul_id: soulId,

    identity: {
      name: obj.NAME ?? obj.name ?? obj.identity?.name ?? 'Unknown',
      archetype: obj.ARCHETYPE ?? obj.archetype ?? obj.identity?.archetype,
      source: 'soul-studio',
    },

    genesis: {
      created_at: obj.CREATED_AT ?? obj.created_at ?? new Date().toISOString(),
      birth_anchor: obj.BIRTH ?? obj.birth ?? obj.genesis?.birth_anchor ?? new Date().toISOString(),
      origin_lat: obj.genesis?.origin_lat ?? obj.lat,
      origin_lng: obj.genesis?.origin_lng ?? obj.lng,
      astral_influence: obj.genesis?.astral_influence,
    },

    ocean: obj.ocean ?? (obj.OPE !== undefined ? {
      openness: obj.OPE,
      conscientiousness: obj.ORD,
      extraversion: obj.EXT,
      agreeableness: obj.AGR,
      neuroticism: obj.NEU,
    } : undefined),

    astral: obj.astral ?? (obj.SUN ? {
      sun: obj.SUN,
      moon: obj.MOON,
      rising: obj.RISING,
      venus: obj.VENUS,
      mercury: obj.MERCURY,
      mars: obj.MARS,
    } : undefined),

    matrix: obj.matrix ?? (obj.TEMPERATURE !== undefined ? {
      temperature: obj.TEMPERATURE,
      structure: obj.STRUCTURE,
      density: obj.DENSITY,
      tone: obj.TONE,
    } : undefined),

    directives: obj.DIRECTIVES ?? obj.directives ?? [],

    memory: {
      resonance_score: obj.RESONANCE !== undefined ? parseInt(obj.RESONANCE) : undefined,
      vault_path: obj.memory?.vault_path,
    },

    signature: obj.signature ?? {
      algorithm: 'SHA256',
      hash: crypto.createHash('sha256').update(raw).digest('hex'),
      signed_by: 'soul-studio-import',
      signed_at: new Date().toISOString(),
    },
  };
}
