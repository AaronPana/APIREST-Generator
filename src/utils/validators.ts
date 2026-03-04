import { existsSync, realpathSync } from 'fs';
import { resolve, basename, normalize } from 'path';

export function validateProjectPath(input: string): true | string {
  // true | string para Inquirer
  if (!input || input.trim().length === 0) {
    return 'El nombre del proyecto no puede estar vacío';
  }

  const normalized = normalize(input);
  const name = basename(normalized);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
    return 'Solo minúsculas, números y guiones. Sin espacios ni caracteres especiales. Ej: my-api, ../projects/my-api';
  }

  return true;
}

export function checkProjectFolder(projectPath: string): { exists: boolean; path: string } {
  if (existsSync(projectPath)) {
    return { exists: true, path: realpathSync(projectPath) };
  }
  return { exists: false, path: projectPath };
}
