export class LibraryAppError extends Error {
    public errorCode: string;
  
    constructor(errorCode: string, message: string) {
      super(message);
      this.errorCode = errorCode;

      Error.captureStackTrace(this, this.constructor);
    }
}
