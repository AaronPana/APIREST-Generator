import { confirm } from '@inquirer/prompts';

export async function askPrettier(): Promise<boolean> {
  return confirm({
    message: 'Incluir Prettier?  (incluye prettierrc preconfigurado)',
    default: true,
  });
}
