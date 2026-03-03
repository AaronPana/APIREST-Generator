import { select } from '@inquirer/prompts';
import type { Database, Level, ORM } from '../types.js';

export async function askOrm(level: Level, database: Database): Promise<ORM> {
  if (level === 'basic' || database === 'none') return 'none';

  return select<ORM>({
    message: 'ORM / ODM:',
    choices: getORMChoices(database),
  });
}

function getORMChoices(database: Database): { name: string; value: ORM }[] {
  if (database === 'mongodb') {
    return [{ name: 'Mongoose', value: 'mongoose' }];
  }

  if (database === 'sqlite' || database === 'sqlserver') {
    return [{ name: 'Sequelize', value: 'sequelize' }];
  }

  return [];
}
