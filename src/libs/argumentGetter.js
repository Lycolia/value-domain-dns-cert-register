const { errorLog } = require('./log');

/**
 * @returns {string|void}
 */
const getUsername = () => {
  if (process.argv.length > 2) {
    const [, , userName] = process.argv;
    return userName;
  } else {
    errorLog('Required argument: vddcr [userName]');
  }
};

module.exports = {
  getUsername,
};
