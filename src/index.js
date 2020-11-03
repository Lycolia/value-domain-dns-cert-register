#!/usr/bin/env node

const { errorLog } = require('./libs/log');
const { getConfig } = require('./libs/configGenerator');
const { getRecord, setRecord, replaceSignature } = require('./libs/dnsUpdater');

/**
 * TODO
 *  引数のバリデータがほしい気がする
 *  この引数でやれるのかは謎
 *
 *  certbotのどっかのhookに挟むとは思う
 *
 * 参考資料など
 *
 * https://certbot.eff.org/docs/using.html?highlight=dns#pre-and-post-validation-hooks
 * https://certbot.eff.org/docs/using.html?highlight=dns#certbot-command-line-options
 *
 */

const conf = getConfig();
if (!conf) {
  errorLog('invalid configration', conf);
  process.exit(1);
}

getRecord(conf).then((dns) => {
  if (!dns) {
    errorLog('get dns record failed', conf);
    process.exit(2);
  }
  const newDns = replaceSignature(dns, conf);
  setRecord(newDns, conf);
});
