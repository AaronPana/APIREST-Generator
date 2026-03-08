import path from 'path';
import { ProjectAnswers } from '../cli/types.js';
import { FileToWrite, GeneratorContext, LevelResolver, ResolverArgs, ResourceContext } from './types.js';
import { fileURLToPath } from 'url';
import { resolveDeps } from './dependencies.js';
import { buildResourceNames } from './nomenclature.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_BASE = path.resolve(__dirname, '../templates');

const levelResolvers: Record<string, LevelResolver> = {
  basic: resolveBasicFiles,
  standard: resolveStandardFiles,
  advanced: resolveAdvancedFiles,
  complete: resolveCompleteFiles,
};

export function resolveFiles(answers: ProjectAnswers): FileToWrite[] {
  const files: FileToWrite[] = [];
  const { projectPath } = answers;
  const sharedPath = path.join(TEMPLATES_BASE, 'shared');
  const levelPath = path.join(TEMPLATES_BASE, answers.level);
  const ext = answers.language === 'typescript' ? 'ts' : 'js';
  const deps = resolveDeps(answers);

  const context: GeneratorContext = {
    ...answers,
    ...deps,
    resources: answers.resources.map(buildResourceNames),
  };

  const args: ResolverArgs = { answers, levelPath, context, ext };

  // --- Shared: siempre ---
  files.push(
    shared(sharedPath, projectPath, 'package.json.hbs', 'package.json', context),
    shared(sharedPath, projectPath, '.gitignore.hbs', '.gitignore', context),
    shared(sharedPath, projectPath, 'index.hbs', `src/index.${ext}`, context)
  );

  // --- Shared: condicionales ---
  if (answers.language === 'typescript') {
    files.push(shared(sharedPath, projectPath, 'tsconfig.json.hbs', 'tsconfig.json', context));
  }

  if (answers.linting) {
    files.push(
      shared(sharedPath, projectPath, 'prettier.config.js.hbs', 'prettier.config.js', context),
      shared(sharedPath, projectPath, `eslint.config.${ext}.hbs`, 'eslint.config.js', context)
    );
  }

  if (answers.level === 'complete') {
    files.push(shared(sharedPath, projectPath, 'src/types/express.d.ts.hbs', 'src/types/express.d.ts', context));
  }

  if (answers.level === 'advanced' || answers.level === 'complete') {
    files.push(shared(sharedPath, projectPath, '.env.example.hbs.txt', '.env.example', context));
  }

  // --- Level específico ---
  files.push(...levelResolvers[answers.level](args));

  return files;
}

// --- Resolvers ---

function resolveBasicFiles({ answers, levelPath, context, ext }: ResolverArgs): FileToWrite[] {
  const files: FileToWrite[] = [];

  files.push(level(levelPath, answers.projectPath, `src/server.${ext}.hbs`, `src/server.${ext}`, context));

  for (const resource of context.resources) {
    const ctx: ResourceContext = { ...context, ...resource };
    files.push(
      level(
        levelPath,
        answers.projectPath,
        `src/routes/resource.router.${ext}.hbs`,
        `src/routes/${resource.singular}.router.${ext}`,
        ctx
      )
    );
  }

  return files;
}

function resolveStandardFiles({ answers, levelPath, context, ext }: ResolverArgs): FileToWrite[] {
  const files: FileToWrite[] = [];
  const { projectPath } = answers;

  // --- Archivos estáticos ---
  files.push(
    level(levelPath, projectPath, `src/server.${ext}.hbs`, `src/server.${ext}`, context),
    level(levelPath, projectPath, 'src/configs/app.config.hbs', `src/configs/app.config.${ext}`, context),
    level(levelPath, projectPath, 'src/errors/HttpStatus.hbs', `src/errors/HttpStatus.${ext}`, context),
    level(levelPath, projectPath, 'src/errors/ApiError.hbs', `src/errors/ApiError.${ext}`, context),
    level(levelPath, projectPath, 'src/middlewares/logger.hbs', `src/middlewares/logger.${ext}`, context),
    level(levelPath, projectPath, 'src/middlewares/errorHandler.hbs', `src/middlewares/errorHandler.${ext}`, context),
    level(levelPath, projectPath, 'src/middlewares/cors.hbs', `src/middlewares/cors.${ext}`, context),
    level(levelPath, projectPath, 'src/controllers/index.hbs', `src/controllers/index.${ext}`, context),
    level(levelPath, projectPath, 'src/stores/index.hbs', `src/stores/index.${ext}`, context)
  );

  // --- Database ---
  if (answers.database === 'sqlite') {
    files.push(
      level(levelPath, projectPath, 'src/database/connection.hbs', `src/database/connection.${ext}`, context),
      level(levelPath, projectPath, 'data/.gitkeep.hbs', 'data/.gitkeep', context)
    );
  }

  // --- Archivos por recurso ---
  for (const resource of context.resources) {
    const ctx: ResourceContext = { ...context, ...resource };

    // modelo y store según DB
    if (answers.database === 'sqlite') {
      files.push(
        level(
          levelPath,
          projectPath,
          `src/models/resource.model.sqlite.${ext}.hbs`,
          `src/models/${resource.singular}.model.${ext}`,
          ctx
        ),
        level(
          levelPath,
          projectPath,
          'src/stores/resource.store.sqlite.hbs',
          `src/stores/${resource.singular}.store.${ext}`,
          ctx
        )
      );
    } else {
      files.push(
        level(
          levelPath,
          projectPath,
          `src/models/resource.model.${ext}.hbs`,
          `src/models/${resource.singular}.model.${ext}`,
          ctx
        ),
        level(
          levelPath,
          projectPath,
          'src/stores/resource.store.hbs',
          `src/stores/${resource.singular}.store.${ext}`,
          ctx
        ),
        level(levelPath, projectPath, 'data/resource.json.hbs', `data/${resource.plural}.json`, ctx)
      );
    }

    files.push(
      level(
        levelPath,
        projectPath,
        'src/schemas/resource.schema.hbs',
        `src/schemas/${resource.singular}.schema.${ext}`,
        ctx
      ),
      level(
        levelPath,
        projectPath,
        `src/controllers/resource.controller.${ext}.hbs`,
        `src/controllers/${resource.singular}.controller.${ext}`,
        ctx
      ),
      level(
        levelPath,
        projectPath,
        'src/routes/resource.router.hbs',
        `src/routes/${resource.singular}.router.${ext}`,
        ctx
      )
    );
  }

  return files;
}

function resolveAdvancedFiles(_args: ResolverArgs): FileToWrite[] {
  // TODO
  return [];
}

function resolveCompleteFiles(_args: ResolverArgs): FileToWrite[] {
  // TODO
  return [];
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
