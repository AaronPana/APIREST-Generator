import { select } from '@inquirer/prompts';
import type { Level } from '../types.js';

export async function askLevel(): Promise<Level> {
  return select<Level>({
    message: 'Nivel de robustez:',
    choices: [
      { name: 'Basic       — index, server, routers', value: 'basic' },
      {
        name: 'Standard    — controllers, models, stores, middlewares, errors',
        value: 'standard',
      },
      {
        name: 'Advanced    — services, repositories, config por env, logs',
        value: 'advanced',
        disabled: '  (coming soon)',
      },
      {
        name: 'Complete    — auth JWT, base para roles y permisos',
        value: 'complete',
        disabled: '          (coming soon)',
      },
    ],
  });
}
