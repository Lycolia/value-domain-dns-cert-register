#!/usr/bin/env node

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
  return await VdDnsApi.setDnsRecord(vd, {
    domainid: dns.domainid,
    domainname: dns.domainname,
    ns_type: dns.ns_type,
    records: replacedDns,
    ttl: dns.ttl,
  });
};

update()
  .then((result) => {
    if (AppError.isError(result)) {
      AppExit.exit(result);
    } else {
      console.log('FINISH', result);
    }
  })
  .catch((err) => {
    console.error('予期せぬエラーが発生しました', err);
    process.exit(1);
  });
