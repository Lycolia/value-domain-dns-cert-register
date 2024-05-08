import { getErrorOrExit } from '../GetErrorOrExit';
import { MyError } from '../MyError';

type ReThrowOrExitFunc = (
  message: string,
  exitCode: number,
  cause?: unknown
) => never;

export const reThrowOrExit: ReThrowOrExitFunc = (
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
