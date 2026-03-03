import { existsSync, realpathSync } from 'fs';
import { resolve } from 'path';

export function validateProjectName(name: string): true | string {
  // true | string para Inquirer
  if (!name || name.trim().length === 0) {
    return 'El nombre del proyecto no puede estar vacío';
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
    return 'Solo minúsculas, números y guiones. Sin espacios ni caracteres especiales. Ej: my-api';
  }

  if (name.length > 214) {
    return 'El nombre no puede superar los 214 caracteres';
  }

  return true;
}

export function checkProjectFolder(name: string): { exists: boolean; path: string } {
  const targetPath = resolve(process.cwd(), name);

  if (existsSync(targetPath)) {
    return { exists: true, path: realpathSync(targetPath) };
  }

  return { exists: false, path: targetPath };
}
