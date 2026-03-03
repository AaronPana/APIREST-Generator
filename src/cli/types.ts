export type Language = 'javascript' | 'typescript';
export type Level = 'basic' | 'standard' | 'pro' | 'enterprise';
export type Database = 'none' | 'sqlite' | 'mongodb' | 'sqlserver';
export type ORM = 'none' | 'sequelize' | 'mongoose';
export type Auth = 'none' | 'jwt';

// export enum Language {
//   JAVASCRIPT = 'javascript',
//   TYPESCRIPT = 'typescript',
// }

// export enum Level {
//   BASIC = 'basic',
//   STANDARD = 'standard',
//   PRO = 'pro',
//   ENTERPRISE = 'enterprise',
// }

// export enum Database {
//   NONE = 'none',
//   SQLITE = 'sqlite',
//   MONGODB = 'mongodb',
//   SQLSERVER = 'sqlserver',
// }

// export enum ORM {
//   NONE = 'none',
//   SEQUELIZE = 'sequelize',
//   MONGOOSE = 'mongoose',
// }

// export enum Auth {
//   NONE = 'none',
//   JWT = 'jwt',
// }

export interface ProjectAnswers {
  name: string;
  description: string;
  level: Level;
  language: Language;
  prettier: boolean;
  database: Database;
  orm: ORM;
  resources: string[];
  auth: Auth;
  port: number;
  git: boolean;
  docker: boolean;
}
