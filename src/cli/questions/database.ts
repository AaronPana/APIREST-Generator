import { select } from '@inquirer/prompts';
import type { Database, Level } from '../types.js';

export async function askDatabase(level: Level): Promise<Database> {
  if (level === 'basic') return 'none';

  return select<Database>({
    message: 'Base de datos:',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'SQLite', value: 'sqlite' },
      { name: 'MongoDB', value: 'mongodb' },
      { name: 'SQL Server', value: 'sqlserver' },
    ],
  });
}
