import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import { logger } from '../utils/logger.js';
import { FileToWrite } from './types.js';

export async function writeFiles(files: FileToWrite[]): Promise<void> {
  for (const file of files) {
    await writeFile(file);
  }
}

async function writeFile({ templatePath, outputPath, context }: FileToWrite): Promise<void> {
  const templateSource = await fs.readFile(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);
  const content = template(context);

  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, content, 'utf-8');

  logger.success(`Generado: ${outputPath}`);
}
