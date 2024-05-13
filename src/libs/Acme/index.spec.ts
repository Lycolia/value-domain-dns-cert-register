import { createAcmeDomain, createAcmeRecord } from '.';
import * as RegExpUtil from '../RegExpUtil';

jest.mock('../RegExpUtil');

describe('createAcmeDomain', () => {
  it('Apexドメイン', () => {
    jest
      .spyOn(RegExpUtil, 'encodeRegExpDomainString')
      .mockReturnValue('example\\.com');
    const actual = createAcmeDomain('example.com', 'example.com');

    expect(actual).toBe('_acme-challenge');
  });

  it('サブドメイン', () => {
    jest
      .spyOn(RegExpUtil, 'encodeRegExpDomainString')
      .mockReturnValue('example\\.com');
    const actual = createAcmeDomain('example.com', 'sub.example.com');

    expect(actual).toBe('_acme-challenge.sub');
  });

  it('サブサブドメイン', () => {
    jest
      .spyOn(RegExpUtil, 'encodeRegExpDomainString')
      .mockReturnValue('example\\.com');
    const actual = createAcmeDomain('example.com', 'hoge.piyo.example.com');

    expect(actual).toBe('_acme-challenge.hoge.piyo');
  });

  it.todo('ワイルドカードドメインは考慮していない');
});

describe('createAcmeRecord', () => {
  it('期待通り文字列結合されること', () => {
    const actual = createAcmeRecord('_acme-challenge', 'XXXXXXXX');

    expect(actual).toBe('txt _acme-challenge XXXXXXXX');
  });
});
