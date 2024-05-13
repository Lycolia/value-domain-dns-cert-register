import { encodeRegExpDomainString } from '.';

describe('encodeRegExpDomainString', () => {
  it('サブドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('sub.example.com');
    expect(actual).toBe('sub\\.example\\.com');
  });

  it('ワイルドカードドメインが正しくエスケープされること', () => {
    const actual = encodeRegExpDomainString('*.example.com');
    expect(actual).toBe('\\*\\.example\\.com');
  });
});
