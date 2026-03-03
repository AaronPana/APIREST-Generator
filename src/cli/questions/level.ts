import { select } from '@inquirer/prompts';
import type { Level } from '../types.js';

export async function askLevel(): Promise<Level> {
  return select<Level>({
    message: 'Nivel de robustez:',
    choices: [
      { name: 'Basic       — index, router simple', value: 'basic' },
      { name: 'Standard    — controllers, models, middlewares, logs', value: 'standard' },
      {
        name: 'Pro         — services, repositories, config por env, manejo de errores',
        value: 'pro',
      },
      { name: 'Enterprise  — auth JWT', value: 'enterprise' },
    ],
  });
}
