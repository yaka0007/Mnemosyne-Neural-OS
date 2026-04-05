#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import os from 'os';

import {
  DEFAULT_VAULT,
  loadVaultConfig,
  saveVaultConfig,
  listChronicles,
  type VaultConfig,
  type RegisteredModel,
  type ChronicleStyle,
} from './lib/vault.js';
import { writeChronicle, buildSweepContent } from './lib/chronicle.js';
import { askPrimaryProfile, askExtraProfile, CHRONICLE_STYLES } from './lib/init-flow.js';
import { IDE_LIST, PROVIDERS_BY_IDE } from './lib/providers.js';
import { readSourceForConfig, generateChronicleDraft } from './lib/sources/index.js';


// ─────────────────────────────────────────────
// MnemoForge CLI — Mnemosyne Neural OS
// AI Inception Engine · XPACEGEMS LLC
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Welcome Dashboard — shown when no command given
// ─────────────────────────────────────────────

const V = chalk.hex('#8B5CF6');
const V2 = chalk.hex('#A78BFA');
const V3 = chalk.hex('#C4B5FD');
const V4 = chalk.hex('#DDD6FE');
const DIM = chalk.gray;
const HL = chalk.hex('#A78BFA').bold;

const ASCII = [
  V('███╗   ███╗███╗   ██╗███████╗███╗   ███╗ ██████╗ '),
  V('████╗ ████║████╗  ██║██╔════╝████╗ ████║██╔═══██╗'),
  V2('██╔████╔██║██╔██╗ ██║█████╗  ██╔████╔██║██║   ██║'),
  V3('██║╚██╔╝██║██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║   ██║'),
  V4('██║ ╚═╝ ██║██║ ╚████║███████╗██║ ╚═╝ ██║╚██████╔╝'),
  chalk.hex('#EDE9FE')('╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝ ╚═════╝ '),
].join('\n');

function showWelcome(): void {
  const config = loadVaultConfig();
  const w = '═'.repeat(52);
  const pad = (s: string, n: number) => s + ' '.repeat(Math.max(0, n - s.length));

  console.log();
  console.log(ASCII);
  console.log();
  console.log(V('  ╔' + w + '╗'));
  console.log(V('  ║') + chalk.hex('#F5F3FF').bold('    M N E M O S Y N E   O S   —   N E U R A L   O S ') + V('  ║'));
  console.log(V('  ║') + DIM('    MnemoForge CLI  v1.2.0  ·  XPACEGEMS LLC         ') + V('  ║'));
  console.log(V('  ╠' + w + '╣'));

  if (config) {
    const profiles = config.registeredModels ?? [];
    const activeChron = listChronicles(config).length;
    const activeStyle = config.defaultChronicleStyle ?? 'session';
    const activeName = config.ide + ' / ' + config.provider;
    console.log(V('  ║') + DIM('    ⚡ RESONANCE PROFILES                             ') + V('  ║'));
    console.log(V('  ║') + '    ' + chalk.green('★') + ' ' + chalk.white(pad(activeName, 32)) + DIM(pad(activeStyle, 12)) + DIM(activeChron + ' chron.') + ' ' + chalk.green('[✓]') + ' ' + V('  ║'));
    if (profiles.length > 0) {
      console.log(V('  ║') + '    ' + DIM('─'.repeat(48)) + V('  ║'));
      profiles.forEach((p, i) => {
        const pName = p.ide + ' / ' + p.provider;
        const pStyle = p.defaultChronicleStyle ?? 'session';
        console.log(V('  ║') + '    ' + DIM('○') + ' ' + DIM(pad(pName, 32)) + DIM(pad(pStyle, 12)) + DIM('[' + (i + 1) + '] switch') + '  ' + V('  ║'));
      });
    }
  } else {
    console.log(V('  ║') + chalk.yellow('    ⚠  No vault configured.') + ' Run: ' + chalk.white('mnemoforge chronicle init') + '          ' + V('  ║'));
  }

  console.log(V('  ╠' + w + '╣'));
  console.log(V('  ║') + DIM('    COMMANDS                                          ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('chronicle init    ') + DIM('─ add / reconfigure a profile     ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('chronicle switch  ') + DIM('─ change active profile           ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('chronicle config  ') + DIM('─ edit a profile settings         ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('chronicle commit  ') + DIM('─ write a new chronicle           ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('chronicle list    ') + DIM('─ explore vault                   ') + V('  ║'));
  console.log(V('  ║') + '    ' + V2('models import     ') + DIM('─ add from UniversalModelCard     ') + V('  ║'));
  console.log(V('  ╠' + w + '╣'));
  console.log(V('  ║') + DIM('    "Memory is the architecture of intelligence."     ') + V('  ║'));
  console.log(V('  ╚' + w + '╝'));
  console.log();
}
const BANNER = ASCII;

const program = new Command();

program
  .name('mnemoforge')
  .description('MnemoForge — AI Inception Engine for the Mnemosyne Neural OS ecosystem')
  .version('1.2.0', '-v, --version', 'Display current version')
  .addHelpText('beforeAll', BANNER + '\n')
  .action(() => { showWelcome(); });

program
  .command('init')
  .description('Scaffold a new Mnemosyne-grade module with AI governance DNA')
  .argument('[module-name]', 'Name of the module to create (PascalCase recommended)')
  .option('--no-git', 'Skip git initialization')
  .action(async () => {
    console.log(chalk.hex('#8B5CF6').bold('\n\u29e1  MnemoChronicle \u2014 Vault Init\n'));

    const existing = loadVaultConfig();
    if (existing) {
      console.log(chalk.yellow('  \u26a0  Already configured:'));
      console.log(chalk.gray('     IDE:      ' + existing.ide));
      console.log(chalk.gray('     Provider: ' + existing.provider + '\n'));
    }

    const profile = await askPrimaryProfile(existing);

    // \u2500\u2500 Extra profiles (loop)
    const registeredModels: RegisteredModel[] = existing?.registeredModels ?? [];
    // Auto-demote old primary when switching
    if (existing && (existing.ide !== profile.ide || existing.provider !== profile.provider)) {
      const old: RegisteredModel = { ide: existing.ide, provider: existing.provider, defaultChronicleStyle: existing.defaultChronicleStyle };
      if (!registeredModels.some(m => m.ide === old.ide && m.provider === old.provider)) registeredModels.unshift(old);
    }
    let extra = await askExtraProfile(registeredModels.length);
    while (extra) {
      console.log(chalk.green('  \u2714  Added: ' + extra.provider + ' (' + extra.ide + ') \u00b7 style: ' + extra.defaultChronicleStyle));
      registeredModels.push(extra);
      extra = await askExtraProfile(registeredModels.length);
    }

    const config: VaultConfig = { ...profile, registeredModels };
    saveVaultConfig(config);

    const res = config.vaultPath + '/.cli_resonance/' + config.ide + '/' + config.provider + '/';
    console.log(chalk.green('\n  \u2714  Vault configured!'));
    console.log(chalk.gray('     IDE:      ') + chalk.white(config.ide));
    console.log(chalk.gray('     Provider: ') + chalk.white(config.provider));
    console.log(chalk.gray('     Style:    ') + chalk.hex('#A78BFA')(config.defaultChronicleStyle ?? 'session'));
    if (registeredModels.length > 0) console.log(chalk.gray('     + ' + registeredModels.length + ' extra profile(s)'));
    console.log(chalk.gray('\n     Chronicles \u2192 ') + chalk.hex('#A78BFA')(res) + '\n');
    console.log(chalk.gray('  Run ') + chalk.white('mnemoforge') + chalk.gray(' to see your dashboard.\n'));
  });

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// CATALOG — IDE / Provider / Model
// ─────────────────────────────────────────────


// Model names are free text — stored in chronicle frontmatter, not in folder structure

// ─────────────────────────────────────────────
// WORKSPACE COMMANDS
// mnemoforge workspace show | add-rule
// External safety memory — readable by any agent at session start
// ─────────────────────────────────────────────

const workspace = new Command('workspace')
  .description('Workspace safety memory — rules that survive IDE sessions and resets');

workspace
  .command('show')
  .description('Show workspace rules (agent briefing before starting work)')
  .action(async () => {
    const config = loadVaultConfig();
    const wsPath = path.join(process.cwd(), '.cli_resonance', 'WORKSPACE.json');
    const globalWsPath = path.join(
      config?.vaultPath ?? path.join(os.homedir(), 'Documents', 'MnemoVault'),
      '.cli_resonance', 'WORKSPACE.json'
    );
    const target = fs.existsSync(wsPath) ? wsPath : fs.existsSync(globalWsPath) ? globalWsPath : null;

    console.log(chalk.hex('#8B5CF6').bold('\n⬡  MnemoWorkspace — Agent Briefing\n'));

    if (!target) {
      console.log(chalk.yellow('  ⚠  No WORKSPACE.json found.'));
      console.log(chalk.gray('     Run from a project root or use: mnemoforge workspace init\n'));
      return;
    }

    const ws = JSON.parse(fs.readFileSync(target, 'utf8'));
    console.log(chalk.cyan(`  Project  : `) + chalk.white(ws.project ?? '—'));
    console.log(chalk.cyan(`  Version  : `) + chalk.gray(ws.version ?? '—'));
    console.log(chalk.cyan(`  Source   : `) + chalk.gray(target));
    if (config?.workspace) console.log(chalk.cyan(`  Vault ws : `) + chalk.gray(config.workspace));

    // Print all rule arrays found in the workspace
    const printRules = (label: string, rules: string[]) => {
      if (!rules?.length) return;
      console.log(chalk.hex('#8B5CF6')(`\n  ▸ ${label}`));
      rules.forEach(r => console.log(chalk.gray('    • ') + r));
    };

    Object.entries(ws).forEach(([key, val]: [string, any]) => {
      if (val?.rules?.length) printRules(key, val.rules);
    });
    if (ws.neural_coding?.principles?.length) {
      printRules('neural_coding.principles', ws.neural_coding.principles);
    }

    console.log(chalk.gray(`\n  Last updated: ${ws.last_updated ?? '—'} by ${ws.updated_by ?? '—'}\n`));
  });

workspace
  .command('add-rule')
  .description('Append a rule to the workspace safety memory')
  .argument('<rule>', 'The rule text to add')
  .option('--section <section>', 'Section to add to (npm | architecture | dev)', 'dev')
  .action(async (rule: string, opts: any) => {
    const wsPath = path.join(process.cwd(), '.cli_resonance', 'WORKSPACE.json');
    if (!fs.existsSync(wsPath)) {
      console.log(chalk.red('\n  ✖  No WORKSPACE.json in current directory.\n'));
      process.exit(1);
    }
    const ws = JSON.parse(fs.readFileSync(wsPath, 'utf8'));
    const section = opts.section ?? 'dev';
    if (!ws[section]) ws[section] = {};
    if (!ws[section].rules) ws[section].rules = [];
    ws[section].rules.push(rule);
    ws.last_updated = new Date().toISOString().slice(0, 10);
    ws.updated_by = 'agent (auto)';
    fs.writeFileSync(wsPath, JSON.stringify(ws, null, 2), 'utf8');
    console.log(chalk.hex('#8B5CF6').bold('\n⬡  MnemoWorkspace — Rule Added\n'));
    console.log(chalk.green(`  ✔  [${section}] ${rule}\n`));
  });

program.addCommand(workspace);

// ─────────────────────────────────────────────
// CHRONICLE COMMANDS
// mnemoforge chronicle init | commit | sweep | list
// ─────────────────────────────────────────────

const chronicle = new Command('chronicle')
  .description('MnemoChronicle — multi-agent memory archiving system');

chronicle
  .command('init')

  .description('Initialize .cli_resonance vault — choose IDE / Provider / Model')
  .action(async () => {
    const existing = loadVaultConfig();
    console.log(chalk.hex('#8B5CF6').bold('\n\u29e1  MnemoChronicle \u2014 Vault Init\n'));
    if (existing) {
      console.log(chalk.yellow('  \u26a0  Re-configuring vault:'));
      console.log(chalk.gray('     IDE:      ' + existing.ide));
      console.log(chalk.gray('     Provider: ' + existing.provider + '\n'));
    }

    const profile = await askPrimaryProfile(existing);

    // \u2500\u2500 Extra profiles (loop)
    const reg: RegisteredModel[] = existing?.registeredModels ?? [];
    if (existing && (existing.ide !== profile.ide || existing.provider !== profile.provider)) {
      const old: RegisteredModel = { ide: existing.ide, provider: existing.provider, defaultChronicleStyle: existing.defaultChronicleStyle };
      if (!reg.some(m => m.ide === old.ide && m.provider === old.provider)) reg.unshift(old);
    }
    let extra = await askExtraProfile(reg.length);
    while (extra) {
      console.log(chalk.green('  \u2714  Added: ' + extra.ide + ' / ' + extra.provider + ' \u00b7 ' + extra.defaultChronicleStyle));
      reg.push(extra);
      extra = await askExtraProfile(reg.length);
    }

    const config: VaultConfig = { ...profile, registeredModels: reg };
    saveVaultConfig(config);

    const dir = config.vaultPath + '/.cli_resonance/' + config.ide + '/' + config.provider + '/';
    console.log(chalk.green('\n  \u2714  Vault configured!'));
    console.log(chalk.gray('     IDE:      ') + chalk.white(config.ide));
    console.log(chalk.gray('     Provider: ') + chalk.white(config.provider));
    console.log(chalk.gray('     Style:    ') + chalk.hex('#A78BFA')(config.defaultChronicleStyle ?? 'session'));
    if (reg.length > 0) console.log(chalk.gray('     + ' + reg.length + ' extra profile(s)'));
    console.log(chalk.gray('\n     Chronicles \u2192 ') + chalk.hex('#A78BFA')(dir) + '\n');
    console.log(chalk.gray('  Run ') + chalk.white('mnemoforge') + chalk.gray(' to see your dashboard.\n'));
  });


chronicle
  .command('commit')
  .description('Write a new Chronicle to the vault')
  .option('-t, --title <title>', 'Chronicle title')
  .option('--type <type>', 'Chronicle style: session | reflection | decision | sweep | narcissus')
  .option('--tags <tags>', 'Comma-separated tags')
  .option('--auto', 'Auto-generate draft and open in VS Code (no editor prompt)')
  .action(async (opts: any) => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }

    console.log(chalk.hex('#8B5CF6').bold('\n⬡  MnemoChronicle — New Chronicle\n'));

    // ── AUTO mode: generate draft → write directly → open in editor ──────────
    if (opts.auto) {
      console.log(chalk.cyan('  ⟳  Reading conversation source…'));
      const ctx = readSourceForConfig(config);

      let draftContent = '';
      let draftTitle   = opts.title ?? 'Session chronicle';

      if (ctx) {
        draftContent = generateChronicleDraft(ctx, config);
        draftTitle   = opts.title || ctx.sessionTitle.slice(0, 60) || draftTitle;
        console.log(chalk.green(`  ✔  Draft from: ${ctx.conversationId.slice(0, 8)}…`));
        console.log(chalk.gray(`     Files: ${ctx.filesTouched.length} · Decisions: ${ctx.keyDecisions.length}`));
      } else {
        // No source — create a blank template from the style
        console.log(chalk.yellow('  ⚠  No source — creating blank template.\n'));
        draftContent = generateChronicleDraft(
          { conversationId: 'manual', startedAt: null, sessionTitle: draftTitle,
            filesTouched: [], commandsRun: [], keyDecisions: [], rawTurns: [], sourcePath: '' },
          config
        );
      }

      const tags = opts.tags ? opts.tags.split(',').map((t: string) => t.trim()) : [];
      const { filePath, filename } = writeChronicle({
        title:   draftTitle,
        type:    (opts.type ?? config.defaultChronicleStyle ?? 'session') as any,
        content: draftContent,
        tags,
        config,
      });

      console.log(chalk.green(`\n  ✔  Chronicle created: ${filename}`));
      console.log(chalk.gray(`     ${filePath}`));
      console.log(chalk.cyan('\n  Opening in VS Code…\n'));

      // Open in VS Code — shell:true required on Windows for PATH resolution
      try {
        const { spawn } = await import('child_process');
        spawn('code', [filePath], { detached: true, stdio: 'ignore', shell: true }).unref();
      } catch {
        console.log(chalk.gray(`  (Could not open VS Code automatically — open the file manually)\n`));
      }
      return;
    }

    // ── MANUAL mode: ask title + content via simple prompts ─────────────────
    const answers = await (inquirer as any).prompt([
      {
        type: 'input',
        name: 'title',
        message: chalk.cyan('Chronicle title?'),
        default: opts.title,
        when: !opts.title,
        validate: (v: string) => v.trim() !== '' || 'Required',
      },
      {
        type: 'input',
        name: 'content',
        message: chalk.cyan('Short summary') + chalk.gray(' (you can edit the file after)'),
        default: '',
      },
    ]);

    const title = opts.title || answers.title;
    const tags  = opts.tags ? opts.tags.split(',').map((t: string) => t.trim()) : [];

    const { filePath, filename } = writeChronicle({
      title,
      type: (opts.type ?? config.defaultChronicleStyle ?? 'session') as any,
      content: answers.content,
      tags,
      config,
    });

    console.log(chalk.green(`\n  ✔  Chronicle written: ${filename}`));
    console.log(chalk.gray(`     ${filePath}\n`));
    console.log(chalk.gray(`  Tip: run with `) + chalk.white('--auto') + chalk.gray(' to generate a full draft automatically.\n'));
  });

// ── chronicle archive ──────────────────────────────────────────────────────
// Primary workflow: agent writes a .md file → CLI archives it to the vault.
// The human never writes chronicles. The agent does.
chronicle
  .command('archive')
  .description('Archive an agent-written chronicle into the vault (primary workflow)')
  .option('-f, --file <path>', 'Path to the .md chronicle file to archive')
  .action(async (opts: any) => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }
    if (!opts.file) {
      console.log(chalk.red('\n  ✖  Specify a file: mnemoforge chronicle archive --file <path>\n'));
      process.exit(1);
    }

    const srcPath = path.resolve(opts.file);
    if (!fs.existsSync(srcPath)) {
      console.log(chalk.red(`\n  ✖  File not found: ${srcPath}\n`));
      process.exit(1);
    }

    // Resolve destination dir from config
    const { resolveChronicleDir } = await import('./lib/vault.js');
    const destDir = resolveChronicleDir(config);
    fs.mkdirSync(destDir, { recursive: true });

    const filename = path.basename(srcPath);
    const destPath = path.join(destDir, filename);

    fs.copyFileSync(srcPath, destPath);

    console.log(chalk.hex('#8B5CF6').bold('\n⬡  MnemoChronicle — Archived\n'));
    console.log(chalk.green(`  ✔  ${filename}`));
    console.log(chalk.gray(`     → ${destPath}\n`));
  });

chronicle

  .command('sweep')

  .description('Create a daily sweep Chronicle from recent entries')
  .action(async () => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }

    const today = new Date().toISOString().slice(0, 10);
    const recent = listChronicles(config).filter(f => f.includes(today));

    console.log(chalk.hex('#8B5CF6').bold('\n⬡  MnemoChronicle — Daily Sweep\n'));
    console.log(chalk.gray(`  Found ${recent.length} chronicle(s) from today (${today})\n`));

    if (recent.length === 0) {
      console.log(chalk.yellow('  No chronicles today to sweep.\n'));
      return;
    }

    const { doSweep } = await (inquirer as any).prompt([{
      type: 'confirm',
      name: 'doSweep',
      message: `Create sweep from ${recent.length} chronicle(s)?`,
      default: true,
    }]);

    if (!doSweep) return;

    const sweepContent = buildSweepContent(recent, config);
    const { filePath, filename } = writeChronicle({
      title: `Daily Sweep — ${today}`,
      type: 'sweep',
      content: sweepContent,
      tags: ['sweep', today],
      config,
    });

    console.log(chalk.green(`\n  ✔  Sweep written: ${filename}`));
    console.log(chalk.gray(`     ${filePath}\n`));
  });

chronicle
  .command('list')
  .description('List recent Chronicles in the vault')
  .option('-n, --count <n>', 'Number of chronicles to show', '10')
  .action((opts: any) => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }

    const chronicles = listChronicles(config).slice(0, parseInt(opts.count || '10'));
    console.log(chalk.hex('#8B5CF6').bold(`\n⬡  Chronicles — ${config.ide} / ${config.provider}\n`));

    if (chronicles.length === 0) {
      console.log(chalk.gray('  No chronicles yet.\n'));
      return;
    }

    chronicles.forEach((f, i) => {
      console.log(chalk.gray(`  ${String(i + 1).padStart(2, ' ')}. `) + chalk.white(f));
    });
    console.log();
  });

// ── chronicle switch ───────────────────────────────────────────
chronicle
  .command('switch')
  .description('Switch the active profile to another registered one')
  .action(async () => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }
    const profiles = config.registeredModels ?? [];
    if (profiles.length === 0) {
      console.log(chalk.yellow('\n  ⚠  No other profiles registered.'));
      console.log(chalk.gray('  Use: mnemoforge chronicle init → "Add a new profile"\n'));
      return;
    }

    const choices = profiles.map((p: RegisteredModel, i: number) => ({
      name: p.ide + ' / ' + p.provider + '  ·  ' + p.displayName,
      value: i,
    }));

    const { idx } = await (inquirer as any).prompt([{
      type: 'list',
      name: 'idx',
      message: chalk.cyan('Which profile to make active?'),
      choices,
    }]);

    const selected = profiles[idx];
    const displaced: RegisteredModel = {
      ide: config.ide,
      provider: config.provider,
      modelId: config.modelId,
      displayName: config.displayName,
      defaultChronicleStyle: config.defaultChronicleStyle,
    };
    const newRegistered = profiles.filter((_p: RegisteredModel, i: number) => i !== idx);
    newRegistered.push(displaced);

    saveVaultConfig({
      ...config,
      ide: selected.ide,
      provider: selected.provider,
      modelId: selected.modelId,
      displayName: selected.displayName,
      defaultChronicleStyle: selected.defaultChronicleStyle ?? 'session',
      registeredModels: newRegistered,
    });

    console.log(chalk.green('\n  ✔  Switched to: ' + selected.displayName + ' (' + selected.provider + ')\n'));
    showWelcome();
  });

// ── chronicle config ───────────────────────────────────────────
chronicle
  .command('config')
  .description('Edit settings (style, display name) of any registered profile')
  .action(async () => {
    const config = loadVaultConfig();
    if (!config) {
      console.log(chalk.red('\n  ✖  Not initialized. Run: mnemoforge chronicle init\n'));
      process.exit(1);
    }
    const profiles = config.registeredModels ?? [];

    // Choose profile to edit
    let targetIdx = -1;
    if (profiles.length > 0) {
      const allChoices = [
        { name: '★ ' + config.ide + ' / ' + config.provider + '  ·  ' + config.displayName + '  [ACTIVE]', value: -1 },
        ...profiles.map((p: RegisteredModel, i: number) => ({
          name: '○ ' + p.ide + ' / ' + p.provider + '  ·  ' + p.displayName,
          value: i,
        })),
      ];
      const { which } = await (inquirer as any).prompt([{
        type: 'list',
        name: 'which',
        message: chalk.cyan('Which profile to edit?'),
        choices: allChoices,
      }]);
      targetIdx = which;
    }

    const isActive = targetIdx === -1;
    const curStyle = isActive ? (config.defaultChronicleStyle ?? 'session') : (profiles[targetIdx].defaultChronicleStyle ?? 'session');
    const curName = isActive ? config.displayName : profiles[targetIdx].displayName;

    const edit = await (inquirer as any).prompt([
      {
        type: 'list',
        name: 'style',
        message: chalk.cyan('Chronicle style?'),
        choices: [
          { name: 'Session     — coding/work session', value: 'session' },
          { name: 'Reflection  — deep thoughts',       value: 'reflection' },
          { name: 'Decision    — ADR-style record',    value: 'decision' },
          { name: 'Sweep       — daily digest',        value: 'sweep' },
          { name: 'Narcissus   — soul narrative',      value: 'narcissus' },
        ],
        default: curStyle,
      },
      {
        type: 'input',
        name: 'displayName',
        message: chalk.cyan('Display name?'),
        default: curName,
      },
    ]);

    if (isActive) {
      saveVaultConfig({ ...config, defaultChronicleStyle: edit.style as ChronicleStyle, displayName: edit.displayName });
    } else {
      const updated = [...profiles];
      updated[targetIdx] = { ...updated[targetIdx], defaultChronicleStyle: edit.style as ChronicleStyle, displayName: edit.displayName };
      saveVaultConfig({ ...config, registeredModels: updated });
    }

    console.log(chalk.green('\n  ✔  Profile updated!\n'));
    showWelcome();
  });
program.addCommand(chronicle);

// ─────────────────────────────────────────────
// MODELS COMMAND
// mnemoforge models import | list
// ─────────────────────────────────────────────

import {
  loadCustomModels,
  saveCustomModels,
  importFromModelCard,
} from './lib/vault.js';

const models = new Command('models')
  .description('Manage the local model registry (UniversalModelCard compatible)');

models
  .command('import <file>')
  .description('Import a model from a UniversalModelCard JSON file')
  .action((file: string) => {
    const resolved = path.resolve(file);
    if (!fs.existsSync(resolved)) {
      console.log(chalk.red(`\n  ✖  File not found: ${resolved}\n`));
      process.exit(1);
    }

    const entry = importFromModelCard(resolved);
    if (!entry) {
      console.log(chalk.red('\n  ✖  Could not extract model info. Expected fields: model_id, provider\n'));
      process.exit(1);
    }

    const existing = loadCustomModels();
    const alreadyExists = existing.some(m => m.modelId === entry.modelId);
    if (alreadyExists) {
      console.log(chalk.yellow(`\n  ⚠  Model already registered: ${entry.modelId}\n`));
      return;
    }

    saveCustomModels([...existing, entry]);
    console.log(chalk.green(`\n  ✔  Model imported!`));
    console.log(chalk.gray(`     ID:       ${entry.modelId}`));
    console.log(chalk.gray(`     Provider: ${entry.provider}`));
    console.log(chalk.gray(`     Name:     ${entry.displayName}\n`));
  });

models
  .command('list')
  .description('List all registered custom models')
  .action(() => {
    const custom = loadCustomModels();
    console.log(chalk.hex('#8B5CF6').bold('\n⬡  Custom Models Registry\n'));

    if (custom.length === 0) {
      console.log(chalk.gray('  No custom models. Use: mnemoforge models import <file.json>\n'));
      return;
    }

    custom.forEach((m, i) => {
      console.log(
        chalk.gray(`  ${String(i + 1).padStart(2, ' ')}. `) +
        chalk.white(`${m.displayName}`) +
        chalk.gray(` · ${m.provider} · ${m.modelId}`)
      );
    });
    console.log();
  });

program.addCommand(models);
program.parse(process.argv);





