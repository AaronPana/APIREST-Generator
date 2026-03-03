import { input } from '@inquirer/prompts';

export async function askPort(): Promise<number> {
  const portInput = await input({
    message: 'Puerto por defecto:',
    default: '3000',
    validate: (value) => {
      const port = Number(value);
      if (isNaN(port) || port < 1 || port > 65535) return 'Puerto inválido (1-65535)';
      return true;
    },
  });

  return Number(portInput);
}
