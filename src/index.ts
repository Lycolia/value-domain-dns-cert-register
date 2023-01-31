#!/usr/bin/env node

import { Log } from 'src/libs/App/Log';
import { AppInput } from 'src/libs/App/AppInput';
import { AppError } from 'src/libs/App/AppError';
import { AppExit } from 'src/libs/App/AppExit';
import { Acme } from 'src/libs/Acme';
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

const acmeConfig = Acme.createAcmeConfig(
  vd.rootDomain,
  certbot.targetDomain,
  certbot.validationText
);

const update = async () => {
  const dns = await VdDnsApi.getDnsRecord(vd);
  if (AppError.isError(dns)) {
    AppExit.exit(dns);
  }

  const replacedDns = DnsReplacer.replaceDnsRecords(dns.records, acmeConfig);

  // update
  // end
};

// FIXME
//update.then
