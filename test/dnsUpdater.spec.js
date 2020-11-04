const { createConfig } = require('../src/libs/configGenerator');
const {
  getRecord,
  setRecord,
  replaceRecords,
} = require('../src/libs/dnsUpdater');
require('dotenv').config();

const validConf = createConfig(
  // @ts-ignore
  process.env.rootDomain,
  process.env.vdToken,
  process.env.targetDomain,
  '734f41ed7b79b695df2d16103e1144a0'
);
const invalidConf = createConfig(
  // @ts-ignore
  process.env.rootDomain,
  'aaaaaa',
  process.env.targetDomain,
  '734f41ed7b79b695df2d16103e1144a0'
);

describe('get dns records', function () {
  it('success', function () {
    // @ts-ignore
    return getRecord(validConf).then((dns) => {
      expect(dns).not.toBeUndefined();
    });
  });
  it('failure', function () {
    return getRecord(invalidConf).then((dns) => {
      expect(dns).toBeUndefined();
    });
  });
});

describe('set dns records', function () {
  it('failure', function () {
    const dns = {
      domainid: 1,
      domainname: 'foo',
      ns_type: 'bar',
      records: 'baz',
      ttl: '100',
    };
    return setRecord(dns, invalidConf).then((dns) => {
      expect(dns).toBeUndefined();
    });
  });
});

const replaceTestConf = createConfig(
  'example.com',
  'AbCdEf123456',
  'sub.example.com',
  '734f41ed7b79b695df2d16103e1144a0'
);
describe('replace signature', function () {
  it('replaceSignature', function () {
    const records = `a @ 0.0.0.0
mx @ 10
txt @ v=spf1 a:example.com mx ~all
cname sub @
txt _acme-challenge 12345
txt _acme-challenge.sub 12345
txt _acme-challenge.test.sub 23456`;
    const oldDns = {
      domainid: 12345,
      domainname: 'example.com',
      ns_type: 'foo',
      records: records,
      ttl: '60',
    };
    const newDns = { ...oldDns };
    newDns.records = replaceRecords(
      oldDns.records,
      replaceTestConf.acmeDomain,
      replaceTestConf.acmeText
    );

    const toBeRecords = `a @ 0.0.0.0
mx @ 10
txt @ v=spf1 a:example.com mx ~all
cname sub @
txt _acme-challenge 12345
txt _acme-challenge.test.sub 23456
txt _acme-challenge.sub 734f41ed7b79b695df2d16103e1144a0`;

    expect(newDns.domainid).toBe(oldDns.domainid);
    expect(newDns.domainname).toBe(oldDns.domainname);
    expect(newDns.ns_type).toBe(oldDns.ns_type);
    expect(newDns.records).toBe(toBeRecords);
    expect(newDns.ttl).toBe(oldDns.ttl);
  });
});
