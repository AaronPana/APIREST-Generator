import { select } from '@inquirer/prompts';
import type { Language } from '../types.js';

export async function askLanguage(): Promise<Language> {
  return select<Language>({
    message: 'Lenguaje:',
    choices: [
      { name: 'JavaScript', value: 'javascript' },
      { name: 'TypeScript  (incluye tsconfig preconfigurado)', value: 'typescript' },
    ],
  });
}
