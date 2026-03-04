import { input } from '@inquirer/prompts';
import { validateProjectPath } from '../../utils/validators.js';

export async function askName(): Promise<string> {
  return input({
    message: 'Nombre o path del proyecto. Ej: my-api, ../projects/my-api:',
    validate: validateProjectPath,
  });
}
