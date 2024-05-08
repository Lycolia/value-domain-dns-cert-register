import chalk from 'chalk';

export namespace Logger {
  export const info = (...message: unknown[]) => {
    console.info(chalk.white('[INFO]'), chalk.green(message));
  };

  export const warn = (...message: unknown[]) => {
    console.warn(chalk.yellow('[WARN]'), chalk.white(message));
  };

  export const error = (...message: unknown[]) => {
    console.error(chalk.bgRed.white('[ERROR]'), chalk.white(message));
  };
}
