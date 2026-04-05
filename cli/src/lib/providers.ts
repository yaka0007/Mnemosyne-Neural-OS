// providers.ts — IDE and Provider registry
// Add new IDEs/Providers here, never touch cli.ts for this

export const IDE_LIST = [
  { name: 'Antigravity  · Google DeepMind IDE',      value: 'Antigravity' },
  { name: 'Cursor       · Cursor IDE',               value: 'Cursor' },
  { name: 'Claude Code  · Anthropic terminal',       value: 'ClaudeCode' },
  { name: 'Open Claw    · OpenWebUI / local LLM',    value: 'OpenClaw' },
  { name: 'VS Code      · Copilot / Continue / etc', value: 'VSCode' },
  { name: 'Windsurf     · Codeium',                  value: 'Windsurf' },
  { name: 'Other        · type manually',            value: '__other__' },
];

export const PROVIDERS_BY_IDE: Record<string, { name: string; value: string }[]> = {
  Antigravity: [
    { name: 'Anthropic',       value: 'Anthropic' },
    { name: 'Google DeepMind', value: 'GoogleDeepMind' },
    { name: 'OpenAI',          value: 'OpenAI' },
    { name: 'Other',           value: '__other__' },
  ],
  Cursor: [
    { name: 'Anthropic',       value: 'Anthropic' },
    { name: 'OpenAI',          value: 'OpenAI' },
    { name: 'Google DeepMind', value: 'GoogleDeepMind' },
    { name: 'Other',           value: '__other__' },
  ],
  ClaudeCode: [
    { name: 'Anthropic',       value: 'Anthropic' },
    { name: 'Other',           value: '__other__' },
  ],
  OpenClaw: [
    { name: 'Meta',            value: 'Meta' },
    { name: 'Mistral AI',      value: 'MistralAI' },
    { name: 'Google DeepMind', value: 'GoogleDeepMind' },
    { name: 'Other',           value: '__other__' },
  ],
  default: [
    { name: 'Anthropic',       value: 'Anthropic' },
    { name: 'OpenAI',          value: 'OpenAI' },
    { name: 'Google DeepMind', value: 'GoogleDeepMind' },
    { name: 'Meta',            value: 'Meta' },
    { name: 'Mistral AI',      value: 'MistralAI' },
    { name: 'Other',           value: '__other__' },
  ],
};
