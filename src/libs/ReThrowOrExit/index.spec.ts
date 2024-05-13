import { reThrowOrExit } from '.';
import * as GetErrorOrExit from '../GetErrorOrExit';

jest.mock('../GetErrorOrExit');

describe('getErrorOrExit', () => {
  it('causeがない場合', () => {
    expect(() => {
      reThrowOrExit('hoge', 1);
    }).toThrow();
  });

  it('causeがある場合', () => {
    const spiedGetErrorOrExit = jest.spyOn(GetErrorOrExit, 'getErrorOrExit');

    expect(() => {
      reThrowOrExit('piyo', 3, {});
    }).toThrow();
    expect(spiedGetErrorOrExit).toHaveBeenCalled();
  });
});
