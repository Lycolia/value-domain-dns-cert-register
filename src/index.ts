#!/usr/bin/env node

import { getArguments } from './libs/AppArguments';
import { createAcmeContext } from './libs/EnviromentsVariables';
import { Logger } from './libs/Logger';
import { MyError } from './libs/MyError';
import { createOrUpdateRecords } from './libs/RecordManipulator';
import {
  requestGetDnsConf,
  requestUpdateDnsConf
} from './libs/ValueDomainClient';
import { UnknownError } from './resources/ErrorDefines';
import pkg from '../package.json';

const main = async () => {
  Logger.warn('本プログラムは非推奨となりました。');
  Logger.warn(
    'このリポジトリで開発していたものは以下に引き継いでいますので、こちらをご利用ください。'
  );
  Logger.warn('https://github.com/Lycolia/value-domain-dns-util');
  Logger.info(`${pkg.name} ${pkg.version}`);
  const args = getArguments(process.argv);
  const acme = createAcmeContext(args.rootDomain, process.env);

  const dnsConf = await requestGetDnsConf(args.rootDomain, args.apiToken);
  const newRecords = createOrUpdateRecords(
    dnsConf.records,
    acme.acmeDomain,
    acme.acmeRecord
  );

  await requestUpdateDnsConf(args.rootDomain, args.apiToken, {
    domainid: dnsConf.domainid,
    ns_type: dnsConf.ns_type,
    records: newRecords,
    ttl: dnsConf.ttl
  });
};

main()
  .then(() => {})
  .catch((err) => {
    if (err instanceof MyError) {
      console.error(err);
      process.exit(err.exitCode);
    } else {
      console.error(UnknownError.message, err);
      process.exit(UnknownError.code);
    }
  });
