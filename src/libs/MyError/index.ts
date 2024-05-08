export class MyError extends Error {
  public constructor(
    public readonly message: string,
    public readonly exitCode: number,
    cause?: Error
  ) {
    super(message, cause);
  }
}
