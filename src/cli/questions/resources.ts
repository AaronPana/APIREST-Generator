import { input } from '@inquirer/prompts';

export async function askResources(): Promise<string[]> {
  const resourcesInput = await input({
    message:
      'Recursos iniciales en inglés y singular (separados por coma). Ej: user, product, order:',
    validate: (value) => {
      if (!value || value.trim().length === 0) return 'Ingrese al menos un recurso';

      const resources = value.split(',').map((r) => r.trim());
      if (resources.some((r) => r === '')) {
        return 'Formato inválido. No puede haber recursos vacíos entre comas.';
      }

      const isValidFormat = resources.every((r) => /^[a-zA-Z]+$/.test(r));
      if (!isValidFormat) {
        return 'Formato inválido. Cada recurso debe contener solo letras.';
      }

      return true;
    },
  });

  return resourcesInput
    .split(',')
    .map((r) => r.trim().toLowerCase())
    .filter(Boolean);
}
