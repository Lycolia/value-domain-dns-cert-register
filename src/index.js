#!/usr/bin/env node

const { errorLog } = require('./libs/log');
const { getConfig } = require('./libs/configGenerator');
const { getRecord, setRecord, replaceRecords } = require('./libs/dnsUpdater');

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
  dns.records = replaceRecords(dns.records, conf.acmeDomain, conf.acmeText);
  setRecord(dns, conf);
});
