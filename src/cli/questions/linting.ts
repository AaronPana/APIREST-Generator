import { confirm } from '@inquirer/prompts';

export async function askLinting(): Promise<boolean> {
  return confirm({
    message: 'Incluir EsLint + Prettier?  (preconfigurados)',
    default: true,
  });
}
