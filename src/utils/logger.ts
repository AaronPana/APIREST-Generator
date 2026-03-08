import chalk from 'chalk';

export const logger = {
  info: (msg: string): void => console.log(chalk.cyan('ℹ'), msg),
  success: (msg: string): void => console.log(chalk.green('✔'), msg),
  warning: (msg: string): void => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string): void => console.log(chalk.red('✖'), msg),
  title: (msg: string): void => console.log(chalk.bold.magenta(msg)),
  dim: (msg: string): void => console.log(chalk.dim(msg)),
};
