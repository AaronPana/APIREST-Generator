import { input } from '@inquirer/prompts';
import { validateProjectName } from '../../utils/validators.js';

export async function askName(): Promise<string> {
  return input({
    message: 'Nombre del proyecto:',
    validate: validateProjectName,
  });
}
