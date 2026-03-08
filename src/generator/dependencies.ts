export function resolveDeps(answers: {
  level: string;
  database: string;
  language: string;
  linting: boolean;
}): DepsBlock {
  const blocks: DepsBlock[] = [
    sharedDeps,
    levelDeps[answers.level],
    dbDeps[answers.database],
    ...(answers.language === 'typescript' ? [tsDeps] : [jsDeps]),
    ...(answers.linting ? [lintingDeps[answers.language]] : []),
  ];

  return blocks.reduce(
    (acc, block) => ({
      dependencies: { ...acc.dependencies, ...block.dependencies },
      devDependencies: { ...acc.devDependencies, ...block.devDependencies },
    }),
    { dependencies: {}, devDependencies: {} }
  );
}

export interface DepsBlock {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export const sharedDeps: DepsBlock = {
  dependencies: {
    express: '^4.19.0',
    cors: '^2.8.5',
  },
  devDependencies: {},
};

export const levelDeps: Record<string, DepsBlock> = {
  basic: {
    dependencies: {},
    devDependencies: {},
  },
  standard: {
    dependencies: {
      zod: '^3.23.0',
      'fs-extra': '^11.2.0',
    },
    devDependencies: {
      '@types/fs-extra': '^11.0.4',
    },
  },
  advanced: {
    dependencies: {
      zod: '^3.23.0',
      pino: '^9.0.0',
      'pino-pretty': '^11.0.0',
    },
    devDependencies: {},
  },
  complete: {
    dependencies: {
      zod: '^3.23.0',
      pino: '^9.0.0',
      'pino-pretty': '^11.0.0',
      jsonwebtoken: '^9.0.0',
      bcryptjs: '^2.4.3',
    },
    devDependencies: {
      '@types/jsonwebtoken': '^9.0.0',
      '@types/bcryptjs': '^2.4.6',
    },
  },
};

export const dbDeps: Record<string, DepsBlock> = {
  none: {
    dependencies: {},
    devDependencies: {},
  },
  mongodb: {
    dependencies: { mongoose: '^8.0.0' },
    devDependencies: {},
  },
  sqlite: {
    dependencies: { sequelize: '^6.37.0', sqlite3: '^5.1.7' },
    devDependencies: {},
  },
  sqlserver: {
    dependencies: { sequelize: '^6.37.0', tedious: '^18.0.0' },
    devDependencies: {},
  },
};

export const jsDeps: DepsBlock = {
  dependencies: {},
  devDependencies: {
    nodemon: '^3.1.0',
  },
};

export const tsDeps: DepsBlock = {
  dependencies: {},
  devDependencies: {
    typescript: '^5.5.0',
    tsx: '^4.15.0',
    '@types/node': '^20.14.0',
    '@types/express': '^4.17.0',
    '@types/cors': '^2.8.17',
  },
};

export const lintingDeps: Record<string, DepsBlock> = {
  typescript: {
    dependencies: {},
    devDependencies: {
      eslint: '^9.0.0',
      '@eslint/js': '^9.0.0',
      'typescript-eslint': '^8.0.0',
      globals: '^15.0.0',
      prettier: '^3.3.0',
    },
  },
  javascript: {
    dependencies: {},
    devDependencies: {
      eslint: '^9.0.0',
      '@eslint/js': '^9.0.0',
      globals: '^15.0.0',
      prettier: '^3.3.0',
    },
  },
};
