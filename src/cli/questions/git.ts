import { confirm } from '@inquirer/prompts';

export async function askGit(): Promise<boolean> {
  return confirm({
    message: 'Inicializar repositorio Git?',
    default: false,
  });
}
