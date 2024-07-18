import { getError } from '.';
import { UnknownError } from '../../resources/ErrorDefines';
import { MyError } from '../MyError';

describe('getError', () => {
  it('エラーインスタンスの場合', () => {
    const err = new Error('hoge');
    const actual = getError(err);

    expect(actual).toStrictEqual(err);
  });

  it('エラーインスタンスでない場合', () => {
    const spiedJSONStringfy = jest.spyOn(JSON, 'stringify');

    const actual = getError({ hoge: 'aaa' });

    expect(spiedJSONStringfy).toHaveBeenCalled();
    expect(actual).toStrictEqual(
      new MyError(
        UnknownError.message,
        UnknownError.code,
        new Error("{hoge: 'aaa'}")
      )
    );
  });
});
