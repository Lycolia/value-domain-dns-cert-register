const chalk = require('chalk');

/**
 *
 * @param  {...any} message
 */
exports.infoLog = (...message) => {
  console.info(chalk.white('[INFO]'), chalk.green(message));
};
/**
 *
 * @param  {...any} message
 */
exports.warnLog = (...message) => {
  console.warn(chalk.yellow('[WARN]'), chalk.white(message));
};
/**
 *
 * @param  {...any} message
 */
exports.errorLog = (...message) => {
  console.error(chalk.bgRed.white('[ERROR]'), chalk.white(message));
};
