import chalk from 'chalk';

const info = (...message: unknown[]) => {
  console.info(chalk.white('[INFO]'), chalk.green(message));
};

const warn = (...message: unknown[]) => {
  console.warn(chalk.yellow('[WARN]'), chalk.white(message));
};

const error = (...message: unknown[]) => {
  console.error(chalk.bgRed.white('[ERROR]'), chalk.white(message));
};

export const Log = {
  info,
  warn,
  error,
};
