import { select } from '@inquirer/prompts';
import type { Auth, Level } from '../types.js';

export async function askAuth(level: Level): Promise<Auth> {
  if (level === 'basic' || level === 'standard') return 'none';

  return select<Auth>({
    message: 'Autenticación:',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'JWT', value: 'jwt' },
    ],
  });
}
