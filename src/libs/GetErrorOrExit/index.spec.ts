import { getErrorOrExit } from '.';

describe('getErrorOrExit', () => {
  it('エラーインスタンスの場合', () => {
    const err = new Error('hoge');
    const actual = getErrorOrExit(err);

    expect(actual).toStrictEqual(err);
  });

  it('エラーインスタンスでない場合', () => {
    const spiedConsoleError = jest.spyOn(console, 'error');
    const spiedExit = jest.spyOn(process, 'exit').mockImplementation();

    getErrorOrExit({});

    expect(spiedConsoleError).toHaveBeenCalled();
    expect(spiedExit).toHaveBeenCalled();
  });
});
