const axios = require('axios').default;
const { infoLog, errorLog } = require('./log');

const baseUrl = 'https://api.value-domain.com/v1';

/**
 * @param {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}} conf
 * @returns {Promise<{ domainid: number, domainname: string, ns_type: string, records: string, ttl: string }|void>}
 */
const getRecord = async (conf) => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/domains/${conf.rootDomain}/dns`,
      {
        headers: {
          Authorization: `Bearer ${conf.vdToken}`,
        },
      }
    );

    infoLog('Got DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    errorLog('Get DNS records failure', err);
  }
};

/**
 *
 * @param {{domainid: number, domainname: string, ns_type: string, records: string, ttl: string}} dns
 * @param {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}} conf
 */
const setRecord = async (dns, conf) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/domains/${dns.domainname}/dns`,
      dns,
      {
        headers: {
          Authorization: `Bearer ${conf.vdToken}`,
        },
      }
    );

    infoLog('Updated DNS records', JSON.stringify(data.results));
    return data.results;
  } catch (err) {
    errorLog('Update DNS records failure', err);
  }
};

/**
 * @param {{domainid: number, domainname: string, ns_type: string, records: string, ttl: string}} dns
 * @param {{rootDomain: string, vdToken: string, targetDomain: string, acmeDomain: string, acmeText: string}} conf
 * @returns {{domainid: number, domainname: string, ns_type: string, records: string, ttl: string}}
 */
const replaceSignature = (dns, conf) => {
  const regdAcmeDomain = conf.acmeDomain.replace(/\./g, '\\.');
  const pattern = new RegExp(`txt ${regdAcmeDomain}.+?\\n`);
  const replacedRecords = dns.records.replace(pattern, '');
  return {
    domainid: dns.domainid,
    domainname: dns.domainname,
    ns_type: dns.ns_type,
    records: `${replacedRecords}\n${conf.acmeText}`,
    ttl: dns.ttl,
  };
};

module.exports = {
  getRecord,
  setRecord,
  replaceSignature,
};
