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

export async function run(): Promise<void> {
  logger.title('\nREST API Generator\n');

  const name = await askName();

  const folder = checkProjectFolder(name);
  if (folder.exists) {
    logger.error(`Ya existe una carpeta con ese nombre en: ${folder.path}`);
    process.exit(1);
  }

  const description = await askDescription();
  const level = await askLevel();
  const language = await askLanguage();
  const prettier = await askPrettier();
  const database = await askDatabase(level);
  const orm = await askOrm(level, database);
  const resources = await askResources();
  const auth = await askAuth(level);
  const port = await askPort();
  const git = await askGit();
  const docker = await askDocker();

  const answers: ProjectAnswers = {
    name,
    description,
    level,
    language,
    prettier,
    database,
    orm,
    resources,
    auth,
    port,
    git,
    docker,
  };

  logger.dim('\n— Resumen —');
  logger.dim(JSON.stringify(answers, null, 2));
}
