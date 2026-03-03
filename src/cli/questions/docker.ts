import { confirm } from '@inquirer/prompts';

export async function askDocker(): Promise<boolean> {
  return confirm({
    message: 'Incluir configuración Docker?',
    default: false,
  });
}
