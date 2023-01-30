import { AppError } from 'src/libs/AppError';

describe('createError', () => {
  it('only reason', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = AppError.createError(param);
    expect(actual).toStrictEqual({
      reason: {
        ...param,
      },
      error: undefined,
    });
  });

  it('reason with error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const err = new Error('foo');
    const actual = AppError.createError(param, err);
    expect(actual).toStrictEqual({
      reason: {
        ...param,
      },
      error: err,
    });
  });
});

describe('isError', () => {
  it('is error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = AppError.isError(AppError.createError(param));
    expect(actual).toBe(true);
  });

  it('is not error', () => {
    const param = {
      code: 100,
      subject: 'foo',
      message: 'bar',
    };
    const actual = AppError.isError(param);
    expect(actual).toBe(false);
  });
});
