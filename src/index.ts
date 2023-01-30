#!/usr/bin/env node

import { Log } from 'src/libs/App/Log';
import { AppInput } from 'src/libs/App/AppInput';
import { AppError } from 'src/libs/App/AppError';
import { AppExit } from 'src/libs/App/AppExit';
import { Acme } from 'src/libs/Acme';
import { DnsEditor } from 'src/libs/DnsReplacer/DnsEditor';
import { VdDnsApi } from 'src/libs/VdDnsApi';
import { DnsReplacer } from 'src/libs/DnsReplacer';

const vd = AppInput.getValueDomain();
if (AppError.isError(vd)) {
  AppExit.exit(vd);
}
const certbot = AppInput.getCertbotEnvVars();
if (AppError.isError(certbot)) {
  AppExit.exit(certbot);
}

const acmeDomain = Acme.createAcmeDomain(vd.rootDomain, certbot.targetDomain);

const getReplacedData = 

const update = async () => {
  const dns = await VdDnsApi.getDnsRecord(vd);
  if (AppError.isError(dns)) {
    AppExit.exit(dns);
  }

  const r = DnsReplacer.replaceDns(dns.results.records, acmeDomain, certbot.validationText)

  getRecord(conf).then((dns) => {
    if (dns === null) {
      Log.error('get dns record failed', conf);
      process.exit(2);
    }
    dns.records = replaceRecords(dns.records, conf.acmeDomain, conf.acmeText);
    setRecord(dns, conf);
  });
};
