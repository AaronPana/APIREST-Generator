import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { confirm } from '@inquirer/prompts';
import { logger } from '../utils/logger.js';
import { writeFiles } from './fileWriter.js';
import { registerHelpers } from './helpers.js';
import type { ProjectAnswers } from '../cli/types.js';
import { resolveFiles } from './resolvers.js';

export async function generate(answers: ProjectAnswers): Promise<void> {
  registerHelpers();

  logger.title('\nCreando proyecto...\n');
  logger.info(`Creando proyecto en: ${answers.projectPath}`);
  await fs.ensureDir(answers.projectPath);

  const files = resolveFiles(answers);
  await writeFiles(files);

  if (answers.git) {
    execSync('git init', { cwd: answers.projectPath, stdio: 'ignore' });
    logger.success('Repositorio Git inicializado');
  }

  if (answers.docker) {
    logger.info('Docker: los archivos ya fueron generados');
  }

  const runInstall = await confirm({
    message: '¿Correr npm install ahora?',
    default: false,
  });

  if (runInstall) {
    logger.info('Instalando dependencias...');
    execSync('npm install', { cwd: answers.projectPath, stdio: 'inherit' });
    logger.success('Dependencias instaladas');
  }

  const relative = path.relative(process.cwd(), answers.projectPath);

  logger.title('\n✔ Proyecto generado exitosamente\n');
  logger.dim(`  cd ${relative}`);
  if (!runInstall) logger.dim('  npm install');
  logger.dim('  npm run dev\n');
}
