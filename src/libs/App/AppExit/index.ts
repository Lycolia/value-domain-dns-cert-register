import { Log } from 'src/libs/App/Log';
import { AppErrorType } from 'src/types/AppError';

type AppExitType = {
  exit: (err: AppErrorType) => never;
};

const exit = (err: AppErrorType) => {
  Log.error(err.reason.message);
  process.exit(err.reason.code);
};

export const AppExit: AppExitType = {
  exit,
};
