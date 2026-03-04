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
