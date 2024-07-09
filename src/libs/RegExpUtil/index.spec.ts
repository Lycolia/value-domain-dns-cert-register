import { encodeRegExpDomainString } from '.';

describe('encodeRegExpDomainString', () => {
  it('Apexドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('example.com');
    expect(actual).toBe('example\\.com');
  });

  it('サブドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('sub.example.com');
    expect(actual).toBe('sub\\.example\\.com');
  });

  it('サブサブドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('hoge.sub.example.com');
    expect(actual).toBe('hoge\\.sub\\.example\\.com');
  });

  it('ワイルドカードドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('*.example.com');
    expect(actual).toBe('\\*\\.example\\.com');
  });
});
