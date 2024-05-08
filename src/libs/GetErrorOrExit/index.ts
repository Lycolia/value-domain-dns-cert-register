import { UnknownError } from '../../resources/ErrorDefines';

export const getErrorOrExit = (err: unknown) => {
  if (err instanceof Error) {
    return err;
  } else {
    console.error(UnknownError.message, err);
    process.exit(UnknownError.code);
  }
};
