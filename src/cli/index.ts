import { logger } from '../utils/logger.js';
import { checkProjectFolder } from '../utils/validators.js';
import { askName } from './questions/name.js';
import { askDescription } from './questions/description.js';
import { askLanguage } from './questions/language.js';
import { askLevel } from './questions/level.js';
import { askPrettier } from './questions/prettier.js';
import { askDatabase } from './questions/database.js';
import { askOrm } from './questions/orm.js';
import { askAuth } from './questions/auth.js';
import { askResources } from './questions/resources.js';
import { askPort } from './questions/port.js';
import { askGit } from './questions/git.js';
import { askDocker } from './questions/docker.js';
import type { ProjectAnswers } from './types.js';
import { generate } from '../generator/index.js';
import path from 'path';
import { capitalize } from '../utils/format.js';

export async function run(): Promise<void> {
  logger.title('\nREST API Generator\n');

  const raw = await askName();
  const projectPath = path.resolve(process.cwd(), path.normalize(raw));
  const name = path.basename(projectPath);

  const folder = checkProjectFolder(projectPath);
  if (folder.exists) {
    logger.error(`Ya existe una carpeta con ese nombre en: ${folder.path}`);
    process.exit(1);
  }

  const description = await askDescription();
  const level = await askLevel();
  const database = await askDatabase(level);
  const orm = await askOrm(level, database);
  const language = await askLanguage();
  const prettier = await askPrettier();
  const resources = await askResources();
  const auth = await askAuth(level);
  const port = await askPort();
  const git = await askGit();
  // const docker = await askDocker();

  const answers: ProjectAnswers = {
    name,
    projectPath,
    description,
    level,
    database,
    orm,
    language,
    prettier,
    resources,
    auth,
    port,
    git,
    docker: false,
  };

  printSummary(answers);

  await generate(answers);
}

function printSummary(answers: ProjectAnswers): void {
  logger.title('\n— Resumen del proyecto —\n');
  logger.info(`Nombre:        ${answers.name}`);
  if (answers.description) logger.info(`Descripción:   ${answers.description}`);
  logger.info(`Nivel:         ${capitalize(answers.level)}`);
  logger.info(`Base de datos: ${answers.database === 'none' ? 'Ninguna' : capitalize(answers.database)}`);
  if (answers.database !== 'none') logger.info(`ORM:           ${capitalize(answers.orm)}`);
  logger.info(`Lenguaje:      ${capitalize(answers.language)}`);
  logger.info(`Prettier:      ${answers.prettier ? 'Sí' : 'No'}`);
  // logger.info(`Auth:          ${answers.auth === 'none' ? 'Ninguna' : answers.auth.toUpperCase()}`);
  logger.info('Auth:          coming soon');
  logger.info(`Recursos:      ${answers.resources.join(', ')}`);
  logger.info(`Puerto:        ${answers.port}`);
  logger.info(`Git:           ${answers.git ? 'Sí' : 'No'}`);
  // logger.info(`Docker:        ${answers.docker ? 'Sí' : 'No'}`);
  logger.info('Docker:        coming soon');
  logger.dim('');
}
