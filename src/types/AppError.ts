export type ErrorReasonType = {
  code: number;
  message: string;
};

export type AppErrorType = {
  reason: ErrorReasonType;
  error?: unknown;
};
