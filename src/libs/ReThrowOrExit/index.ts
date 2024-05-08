import { getErrorOrExit } from '../GetErrorOrExit';
import { MyError } from '../MyError';

export const reThrowOrExit = (
  message: string,
  exitCode: number,
  cause?: unknown
) => {
  if (cause === undefined) {
    throw new MyError(message, exitCode);
  } else {
    const err = getErrorOrExit(cause);
    throw new MyError(message, exitCode, err);
  }
};
