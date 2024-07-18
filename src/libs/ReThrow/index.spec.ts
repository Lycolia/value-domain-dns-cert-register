import { reThrow } from '.';
import * as GetError from '../GetError';

jest.mock('../GetError');

describe('getError', () => {
  it('causeがない場合', () => {
    expect(() => {
      reThrow('hoge', 1);
    }).toThrow();
  });

  it('causeがある場合', () => {
    const spiedGetError = jest.spyOn(GetError, 'getError');

    expect(() => {
      reThrow('piyo', 3, {});
    }).toThrow();
    expect(spiedGetError).toHaveBeenCalled();
  });
});
