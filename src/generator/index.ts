import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { confirm } from '@inquirer/prompts';
import { logger } from '../utils/logger.js';
import { writeFiles } from './fileWriter.js';
import { buildResourceNames } from './nomenclature.js';
import { resolveDeps } from './dependencies.js';
import { registerHelpers } from './helpers.js';
import type { ProjectAnswers } from '../cli/types.js';
import type { FileToWrite } from './types.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_BASE = path.resolve(__dirname, '../templates');

export async function generate(answers: ProjectAnswers): Promise<void> {
  registerHelpers();

  logger.title('\nCreando proyecto...\n');
  logger.info(`Creando proyecto en: ${answers.projectPath}`);
  await fs.ensureDir(answers.projectPath);

  const files = resolveFiles(answers, answers.projectPath);
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

function resolveFiles(answers: ProjectAnswers, projectPath: string): FileToWrite[] {
  const files: FileToWrite[] = [];
  const sharedPath = path.join(TEMPLATES_BASE, 'shared');
  const levelPath = path.join(TEMPLATES_BASE, answers.level);
  const ext = answers.language === 'typescript' ? 'ts' : 'js';
  const deps = resolveDeps(answers);

  const context = {
    ...answers,
    ...deps,
    resources: answers.resources.map(buildResourceNames),
  };

  // --- Shared: siempre ---
  files.push(
    shared(sharedPath, projectPath, 'package.json.hbs', 'package.json', context),
    shared(sharedPath, projectPath, '.gitignore.hbs', '.gitignore', context)
  );

  // --- Shared: condicionales ---
  if (answers.language === 'typescript') {
    files.push(shared(sharedPath, projectPath, 'tsconfig.json.hbs', 'tsconfig.json', context));
  }

  if (answers.prettier) {
    files.push(shared(sharedPath, projectPath, '.prettierrc.hbs', '.prettierrc', context));
  }

  if (answers.level === 'complete') {
    files.push(shared(sharedPath, projectPath, 'src/types/express.d.ts.hbs', 'src/types/express.d.ts', context));
  }

  if (answers.level === 'advanced' || answers.level === 'complete') {
    files.push(shared(sharedPath, projectPath, '.env.example.hbs.txt', '.env.example', context));
  }

  // --- Basic ---
  files.push(
    level(levelPath, projectPath, 'index.hbs', `index.${ext}`, context),
    level(levelPath, projectPath, `src/server.${ext}.hbs`, `src/server.${ext}`, context)
  );

  // --- Recursos ---
  for (const resource of context.resources) {
    files.push(
      level(
        levelPath,
        projectPath,
        `src/routes/resource.router.${ext}.hbs`,
        `src/routes/${resource.singular}.router.${ext}`,
        {
          ...context,
          ...resource,
        }
      )
    );
  }

  return files;
}

// --- Helpers internos ---

function shared(
  sharedPath: string,
  projectPath: string,
  template: string,
  output: string,
  context: object
): FileToWrite {
  return {
    templatePath: path.join(sharedPath, template),
    outputPath: path.join(projectPath, output),
    context,
  };
}

function level(levelPath: string, projectPath: string, template: string, output: string, context: object): FileToWrite {
  return {
    templatePath: path.join(levelPath, template),
    outputPath: path.join(projectPath, output),
    context,
  };
}
