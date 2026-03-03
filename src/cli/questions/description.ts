import { input } from '@inquirer/prompts';

export async function askDescription(): Promise<string> {
  return input({
    message: 'Descripción (opcional):',
  });
}
