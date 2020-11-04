const { existsSync, readFileSync } = require('fs');
const { errorLog } = require('./log');

/**
 * @param {string} username
 * @returns {string}
 */
const getConfPath = (username) => {
  return `/home/${username}/.vddcr/config.json`;
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
 * @param {string} username
 * @returns {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}|void}
 */
const getConfig = (username) => {
  const confPath = getConfPath(username);
  if (existsSync(confPath)) {
    const buff = readFileSync(confPath).toString();
    /** @type {{rootDomain?: string, vdToken?: string}} */
    const conf = { ...JSON.parse(buff) };

    if (
      !conf.rootDomain ||
      !conf.vdToken ||
      !process.env.CERTBOT_DOMAIN ||
      !process.env.CERTBOT_VALIDATION
    ) {
      return;
    }

    return createConfig(
      conf.rootDomain,
      conf.vdToken,
      process.env.CERTBOT_DOMAIN,
      process.env.CERTBOT_VALIDATION
    );
  } else {
    errorLog('config path does not exists', confPath);
  }
};

module.exports = {
  createAcmeDomain,
  createAcmeText,
  createConfig,
  getConfig,
};
