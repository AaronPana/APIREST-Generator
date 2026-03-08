import type { ProjectAnswers } from '../cli/types.js';
import type { DepsBlock } from './dependencies.js';

export interface ResourceNames {
  singular: string; // user
  plural: string; // users
  pascalCase: string; // User
  upperCase: string; // USER
}

export interface FileToWrite {
  templatePath: string; // path al archivo .hbs
  outputPath: string; // path donde se escribe el archivo generado
  context: object; // datos que se pasan al template
}

export interface GeneratorContext extends Omit<ProjectAnswers, 'resources'> {
  resources: ResourceNames[];
  dependencies: DepsBlock['dependencies'];
  devDependencies: DepsBlock['devDependencies'];
}

export interface ResourceContext extends GeneratorContext, ResourceNames {}

export interface ResolverArgs {
  answers: ProjectAnswers;
  levelPath: string;
  context: GeneratorContext;
  ext: string;
}

export type LevelResolver = (args: ResolverArgs) => FileToWrite[];
