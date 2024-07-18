import { UnknownError } from '../../resources/ErrorDefines';
import { MyError } from '../MyError';

export const getError = (err: unknown) => {
  if (err instanceof Error) {
    return err;
  } else {
    const cause = JSON.stringify(err);
    return new MyError(
      UnknownError.message,
      UnknownError.code,
      new Error(cause)
    );
  }
};
