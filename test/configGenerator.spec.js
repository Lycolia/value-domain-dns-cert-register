const {
  getArguments,
  createAcmeDomain,
  createAcmeText,
  createConfig,
} = require('../src/libs/configGenerator');

const rootDomain = 'example.com';
const vdToken = 'AbCdEf123456';
const targetDomain = 'sub.example.com';
const acmeText = '734f41ed7b79b695df2d16103e1144a0';

describe('get cli arguments', function () {
  beforeEach(() => {
    // reset argv
    process.argv = process.argv.slice(0, 2);
  });
  it('no arguments', function () {
    const argv = getArguments();

    expect(argv).toBeUndefined();
  });
  it('1 arguments', function () {
    process.argv.push('example.com');
    const argv = getArguments();

    expect(argv).toBeUndefined();
  });
  it('2 arguments', function () {
    process.argv.push('example.com');
    process.argv.push('AbCdEf123456');
    const argv = getArguments();

    expect(argv).not.toBeUndefined();
  });
});

describe('create signed target domain', function () {
  it('sub domain', function () {
    const signedDomain = createAcmeDomain(rootDomain, 'sub.example.com');

    expect(signedDomain).toBe('_acme-challenge.sub');
  });
  it('root domain', function () {
    const signedDomain = createAcmeDomain(rootDomain, 'example.com');

    expect(signedDomain).toBe('_acme-challenge');
  });
});

describe('create signature', function () {
  it('sub domain', function () {
    const signature = createAcmeText('_acme-challenge.sub', acmeText);

    expect(signature).toBe(
      'txt _acme-challenge.sub 734f41ed7b79b695df2d16103e1144a0'
    );
  });
  it('root domain', function () {
    const signature = createAcmeText('_acme-challenge', acmeText);

    expect(signature).toBe(
      'txt _acme-challenge 734f41ed7b79b695df2d16103e1144a0'
    );
  });
});

describe('create config', function () {
  it('success', function () {
    const conf = createConfig(rootDomain, vdToken, targetDomain, acmeText);

    expect(conf.rootDomain).toBe(rootDomain);
    expect(conf.vdToken).toBe(vdToken);
    expect(conf.targetDomain).toBe(targetDomain);
    expect(conf.acmeDomain).toBe('_acme-challenge.sub');
    expect(conf.acmeText).toBe(
      'txt _acme-challenge.sub 734f41ed7b79b695df2d16103e1144a0'
    );
  });
});
