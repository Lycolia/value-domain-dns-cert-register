import { AppErrorType, ErrorReasonType } from 'src/types/AppError';

const createError = (
  reason: ErrorReasonType,
  error?: unknown
): AppErrorType => {
  return { reason, error };
};

const isError = <T>(value: T | AppErrorType): value is AppErrorType => {
  if (value !== null && typeof value === 'object') {
    return 'reason' in value;
  }
  return false;
};

export const AppError = {
  createError,
  isError,
};
