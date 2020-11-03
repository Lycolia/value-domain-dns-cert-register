const { errorLog } = require('./log');

/**
 * @returns {{rootDomain: string, vdToken: string}|void}
 */
const getArguments = () => {
  if (process.argv.length > 3) {
    const [, , rootDomain, accessToken] = process.argv;
    return {
      rootDomain: rootDomain.trim(),
      vdToken: accessToken.trim(),
    };
  } else {
    errorLog('Required 2 argument: vddcr [rootDomain] [accessToken]');
  }
};

/**
 * @param {string} rootDomain
 * @param {string} targetDomain
 */
const createAcmeDomain = (rootDomain, targetDomain) => {
  const regdRootDomain = rootDomain.replace(/\./g, '\\.');
  const re = new RegExp(`^(.+?)\\.${regdRootDomain}`);
  const domainMat = targetDomain.match(re);
  return domainMat
    ? // @ts-ignore
      `_acme-challenge.${domainMat[1]}` // for sub domain
    : '_acme-challenge'; // for root domain
};

/**
 * @param {string} targetDomain
 * @param {string} acmeText
 * @returns {string}
 */
const createAcmeText = (targetDomain, acmeText) => {
  return `txt ${targetDomain} ${acmeText}`;
};

/**
 * @param {string} rootDomain
 * @param {string} vdToken
 * @param {string} targetDomain
 * @param {string} acmeText
 * @returns {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}}
 */
const createConfig = (rootDomain, vdToken, targetDomain, acmeText) => {
  const acmeDomain = createAcmeDomain(rootDomain, targetDomain);
  const conf = {
    rootDomain: rootDomain,
    vdToken: vdToken,
    targetDomain: targetDomain,
    acmeDomain: acmeDomain,
    acmeText: createAcmeText(acmeDomain, acmeText),
  };

  return conf;
};

/**
 * @returns {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}|void}
 */
const getConfig = () => {
  /** @type {{rootDomain: string, vdToken: string}|void} */
  const argv = getArguments();
  if (!argv || !process.env.CERTBOT_DOMAIN || !process.env.CERTBOT_VALIDATION) {
    return;
  }

  return createConfig(
    argv.rootDomain,
    argv.vdToken,
    process.env.CERTBOT_DOMAIN,
    process.env.CERTBOT_VALIDATION
  );
};

module.exports = {
  getArguments,
  createAcmeDomain,
  createAcmeText,
  createConfig,
  getConfig,
};
