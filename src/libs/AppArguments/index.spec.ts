import { getArguments } from '.';

describe('getArguments', () => {
  it('コマンドライン引数がない場合', () => {
    expect(() => {
      getArguments(['', '']);
    }).toThrow('Required 2 argument: vddcr [rootDomain] [accessToken]');
  });

  it('コマンドライン引数が1つある場合', () => {
    expect(() => {
      getArguments(['', '', 'hoge']);
    }).toThrow('Required 2 argument: vddcr [rootDomain] [accessToken]');
  });

  it('コマンドライン引数が2つある場合', () => {
    const actual = getArguments(['', '', 'example.com', 'piyo']);

    expect(actual).toStrictEqual({
      rootDomain: 'example.com',
      apiToken: 'piyo'
    });
  });

  it('コマンドライン引数2つの前後空白文字が除去されること', () => {
    const actual = getArguments(['', '', ' example.com ', ' piyo ']);

    expect(actual).toStrictEqual({
      rootDomain: 'example.com',
      apiToken: 'piyo'
    });
  });
});
