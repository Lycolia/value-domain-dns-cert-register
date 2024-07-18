import { getError } from '../GetError';
import { MyError } from '../MyError';

type ReThrow = (message: string, exitCode: number, cause?: unknown) => never;

export const reThrow: ReThrow = (
  message: string,
  exitCode: number,
  cause?: unknown
) => {
  if (cause === undefined) {
    throw new MyError(message, exitCode);
  } else {
    const err = getError(cause);
    throw new MyError(message, exitCode, err);
  }
};
