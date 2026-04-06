import { Command } from 'commander';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { DEX, getProfile, oceanBar, SoulProfile } from './profiles';
import { generateSoulMd, getSoulPath } from './generator';
import { loadVaultConfig, saveVaultConfig } from '../../lib/vault';

// ── Helpers ───────────────────────────────────────────────────────────────────
const V   = chalk.hex('#8B5CF6').bold;
const DIM = chalk.gray;
const OK  = chalk.green;
const ERR = chalk.red;
const HL  = chalk.hex('#A78BFA');

async function getInquirer() {
  const m = await import('inquirer');
  return m.default ?? m;
}

function printProfileCard(p: SoulProfile, active = false): void {
  const border = active ? chalk.hex('#8B5CF6') : chalk.gray;
  const star   = active ? chalk.yellow(' ★ ACTIVE') : '';
  console.log(border('  ┌─────────────────────────────────────────────┐'));
  console.log(border('  │') + `  ${p.icon}  ` + chalk.white.bold(p.name.padEnd(12)) + DIM(`[${p.archetype}]`) + star + border(' '.padEnd(active ? 1 : 11) + '│'));
  console.log(border('  │') + `     ${DIM(p.tagline.slice(0, 40))}` + border('  │'));
  console.log(border('  │') + `     ${DIM('Tone: ')}${chalk.white(p.tone.slice(0, 35))}` + border('    │'));
  console.log(border('  │') + `     ${p.tags.map(t => HL(`#${t}`)).join(' ')}` + border('  │'));
  console.log(border('  └─────────────────────────────────────────────┘'));
}

// ── soul command ──────────────────────────────────────────────────────────────
export const soulCommand = new Command('soul')
  .description('Soul profile system — inject developer archetypes into your AI agent');

// ── soul dex ─────────────────────────────────────────────────────────────────
soulCommand
  .command('dex')
  .description('Browse and select a soul profile interactively')
  .option('--ide <name>', 'Target IDE to inject into after selection')
  .action(async (opts: any) => {
    const config  = loadVaultConfig();
    const active  = config?.soulProfile ?? null;
    const inquirer = await getInquirer();

    console.log(V('\n  ⬡  MnemoForge DEX — Developer Soul Profiles\n'));
    console.log(DIM('  5 behavioral archetypes for AI-assisted development\n'));

    // Show all cards
    DEX.forEach(p => printProfileCard(p, p.id === active));

    const { chosen } = await (inquirer as any).prompt([{
      type: 'list',
      name: 'chosen',
      message: HL('Select a profile:'),
      choices: DEX.map(p => ({
        name: `${p.icon}  ${p.name.padEnd(12)} [${p.archetype}]  — ${p.tagline}`,
        value: p.id,
      })),
      default: active ?? 'architect',
    }]);

    const profile = getProfile(chosen)!;

    console.log(V(`\n  ⬡  ${profile.name} — ${profile.archetype}`));
    console.log(DIM(`\n  ${profile.tagline}\n`));
    console.log(DIM('  OCEAN:'));
    const o = profile.ocean;
    console.log(`    Openness          ${oceanBar(o.openness)}`);
    console.log(`    Conscientiousness ${oceanBar(o.conscientiousness)}`);
    console.log(`    Extraversion      ${oceanBar(o.extraversion)}`);
    console.log(`    Agreeableness     ${oceanBar(o.agreeableness)}`);
    console.log(`    Neuroticism       ${oceanBar(o.neuroticism)}`);
    console.log(DIM('\n  Directives:'));
    profile.directives.forEach((d, i) => console.log(DIM(`    ${i + 1}.`) + ' ' + chalk.white(d)));

    const { inject } = await (inquirer as any).prompt([{
      type: 'confirm',
      name: 'inject',
      message: HL(`Inject "${profile.name}" into your IDE?`),
      default: true,
    }]);

    if (inject) await runInject(profile, opts.ide ?? config?.ide ?? '');
  });

// ── soul inject ───────────────────────────────────────────────────────────────
soulCommand
  .command('inject')
  .description('Inject a soul profile into your IDE rules')
  .option('--profile <name>', 'Profile ID (architect, auditor, shipper, guardian, challenger)')
  .option('--ide <name>', 'Target IDE')
  .action(async (opts: any) => {
    const config  = loadVaultConfig();
    const inquirer = await getInquirer();

    let profileId = opts.profile;
    if (!profileId) {
      const { chosen } = await (inquirer as any).prompt([{
        type: 'list',
        name: 'chosen',
        message: HL('Select profile to inject:'),
        choices: DEX.map(p => ({ name: `${p.icon}  ${p.name} [${p.archetype}]`, value: p.id })),
        default: config?.soulProfile ?? 'architect',
      }]);
      profileId = chosen;
    }

    const profile = getProfile(profileId);
    if (!profile) { console.log(ERR(`\n  ✖  Unknown profile: ${profileId}\n`)); return; }

    await runInject(profile, opts.ide ?? config?.ide ?? '');
  });

// ── soul switch ───────────────────────────────────────────────────────────────
soulCommand
  .command('switch')
  .description('Quick-switch active soul profile (re-injects into current IDE)')
  .action(async () => {
    const config   = loadVaultConfig();
    const inquirer = await getInquirer();
    const current  = config?.soulProfile ?? null;

    console.log(V('\n  ⬡  Soul Switch\n'));
    if (current) console.log(DIM(`  Current: `) + chalk.white(current));

    const { chosen } = await (inquirer as any).prompt([{
      type: 'list',
      name: 'chosen',
      message: HL('Switch to:'),
      choices: DEX.map(p => ({
        name: `${p.icon}  ${p.name} [${p.archetype}]  ${p.id === current ? '★' : ''}`,
        value: p.id,
      })),
      default: current ?? 'architect',
    }]);

    const profile = getProfile(chosen)!;
    await runInject(profile, config?.ide ?? '');
  });

// ── soul status ───────────────────────────────────────────────────────────────
soulCommand
  .command('status')
  .description('Show currently active soul profile')
  .action(() => {
    const config = loadVaultConfig();
    const id     = config?.soulProfile ?? null;

    console.log(V('\n  ⬡  Soul Status\n'));
    if (!id) {
      console.log(ERR('  No soul profile active.'));
      console.log(DIM('  Run: ') + chalk.white('mnemoforge soul dex'));
    } else {
      const p = getProfile(id);
      if (p) printProfileCard(p, true);
    }
    console.log();
  });

// ── Shared inject logic ───────────────────────────────────────────────────────
const IDE_CHOICES = [
  { name: '  Cursor', value: 'cursor' },
  { name: '  Claude Desktop', value: 'claudedesktop' },
  { name: '  Claude Code', value: 'claudecode' },
  { name: '  Windsurf', value: 'windsurf' },
  { name: '  VS Code', value: 'vscode' },
  { name: '  Antigravity', value: 'antigravity' },
];

async function runInject(profile: SoulProfile, ide: string): Promise<void> {
  const inquirer = await getInquirer();

  // If no explicit IDE given (or the ide is chronicle author like 'Antigravity'),
  // always ask which IDE to target for injection
  let targetIde = ide;
  const known = IDE_CHOICES.map(c => c.value);
  if (!targetIde || !known.includes(targetIde.toLowerCase().replace(/[\s_\-]/g, ''))) {
    const { chosenIde } = await (inquirer as any).prompt([{
      type: 'list',
      name: 'chosenIde',
      message: HL('Inject into which IDE?'),
      choices: IDE_CHOICES,
      default: 'cursor',
    }]);
    targetIde = chosenIde;
  }

  const targetPath = getSoulPath(targetIde);

  if (!targetPath) {
    console.log(chalk.yellow('\n  ⚠  No IDE path known. Printing SOUL.md:\n'));
    console.log(chalk.white(generateSoulMd(profile)));
    return;
  }

  // Write SOUL.md
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetPath, generateSoulMd(profile), 'utf8');

  // Persist to vault config
  const config = loadVaultConfig() ?? {};
  (config as any).soulProfile = profile.id;
  saveVaultConfig(config as any);

  console.log(OK(`\n  ✔  Soul protocol active: ${profile.name} [${profile.archetype}]`));
  console.log(DIM(`     File: ${targetPath}`));
  console.log(DIM(`\n  Restart your IDE to activate the soul protocol.\n`));
}
