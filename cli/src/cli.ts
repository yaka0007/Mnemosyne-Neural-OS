#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

// ─────────────────────────────────────────────
// MnemoForge CLI — Mnemosyne Neural OS
// AI Inception Engine · XPACEGEMS LLC
// ─────────────────────────────────────────────

const BANNER = `
${chalk.hex('#8B5CF6')('███╗   ███╗███╗   ██╗███████╗███╗   ███╗ ██████╗')}
${chalk.hex('#8B5CF6')('████╗ ████║████╗  ██║██╔════╝████╗ ████║██╔═══██╗')}
${chalk.hex('#A78BFA')('██╔████╔██║██╔██╗ ██║█████╗  ██╔████╔██║██║   ██║')}
${chalk.hex('#C4B5FD')('██║╚██╔╝██║██║╚██╗██║██╔══╝  ██║╚██╔╝██║██║   ██║')}
${chalk.hex('#DDD6FE')('██║ ╚═╝ ██║██║ ╚████║███████╗██║ ╚═╝ ██║╚██████╔╝')}
${chalk.hex('#EDE9FE')('╚═╝     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝ ╚═════╝ ')}
${chalk.hex('#F5F3FF').bold('              F O R G E  C L I')}
${chalk.gray('              The AI Inception Engine — Mnemosyne Neural OS')}
${chalk.gray('              XPACEGEMS LLC · MIT License')}
`;

const program = new Command();

program
  .name('mnemoforge')
  .description('MnemoForge — AI Inception Engine for the Mnemosyne Neural OS ecosystem')
  .version('1.0.0', '-v, --version', 'Display current version')
  .addHelpText('beforeAll', BANNER);

program
  .command('init')
  .description('Scaffold a new Mnemosyne-grade module with AI governance DNA')
  .argument('[module-name]', 'Name of the module to create (PascalCase recommended)')
  .option('--no-git', 'Skip git initialization')
  .action(async (moduleName) => {
    console.log(BANNER);

    let name = moduleName;

    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'moduleName',
          message: chalk.cyan('What is the name of your new Mnemosyne module?') + chalk.gray(' (e.g., QuantumVaultUI)'),
          validate: (input: string) => {
            if (input.trim() === '') return 'Module name is required.';
            if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(input.trim())) {
              return 'Module name must start with a letter and contain only letters, numbers, hyphens, or underscores.';
            }
            return true;
          }
        }
      ]);
      name = answers.moduleName.trim();
    }

    const targetDir = path.resolve(process.cwd(), name);

    console.log(chalk.hex('#8B5CF6').bold(`\n⬡  Forging Module: ${chalk.white.bold(name)}`));
    console.log(chalk.gray(`   Target: ${targetDir}\n`));

    if (fs.existsSync(targetDir)) {
      console.log(chalk.red(`\n✖  Directory "${name}" already exists. Choose a different name or remove the existing folder.\n`));
      process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    // Resolve templates — works whether running from /src (development) or /dist (production)
    const isCompiled = __dirname.endsWith('dist') || __dirname.includes(path.join('dist'));
    const templatesDir = isCompiled
      ? path.join(__dirname, '..', 'src', 'templates')
      : path.join(__dirname, 'templates');

    const copyTemplate = (file: string, destName: string = file): boolean => {
      try {
        const srcPath = path.join(templatesDir, file);
        if (!fs.existsSync(srcPath)) {
          console.log(chalk.yellow(`  ⚠  Template "${file}" not found — skipping.`));
          return false;
        }
        let content = fs.readFileSync(srcPath, 'utf8');
        content = content.replace(/\{\{MODULE_NAME\}\}/g, name);
        fs.writeFileSync(path.join(targetDir, destName), content, 'utf8');
        console.log(chalk.green(`  ✔  ${destName}`));
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.log(chalk.red(`  ✖  Failed to create "${file}": ${message}`));
        return false;
      }
    };

    // Scaffold the module
    copyTemplate('.cursorrules');
    copyTemplate('AGENT_INSTRUCTIONS.md');
    copyTemplate('index.template.tsx', 'index.tsx');

    // Success output
    console.log(chalk.hex('#8B5CF6').bold('\n✦  Module Forged Successfully!\n'));

    console.log(chalk.white('  Next steps for developers:'));
    console.log(chalk.gray(`    cd ${name}`));
    console.log(chalk.gray('    npm install'));
    console.log(chalk.gray('    code .\n'));

    console.log(chalk.white('  For AI Agents (Cursor / Claude / Copilot):'));
    console.log(chalk.hex('#A78BFA')(`    1. Read .cursorrules     → Liquid Glass design constraints`));
    console.log(chalk.hex('#A78BFA')(`    2. Read AGENT_INSTRUCTIONS.md → Mission context`));
    console.log(chalk.hex('#A78BFA')(`    3. Build index.tsx         → Your sovereign module awaits\n`));

    console.log(chalk.gray('  Documentation: https://github.com/yaka0007/Mnemosyne-Neural-OS'));
    console.log(chalk.gray('  Part of: Mnemosyne Neural OS — XPACEGEMS LLC\n'));
  });

program.parse(process.argv);
