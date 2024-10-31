
import { Request, Response, NextFunction } from 'express';
import { LibraryAppError } from '../error/LibraryAppError';
import { LibraryAppErrorCode } from '../error/LibraryAppErrorCode';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  const message = err.message || 'Internal Server Error';
  const stack = JSON.stringify(err.stack);
  const errorCode = err instanceof LibraryAppError 
    ? err.errorCode : LibraryAppErrorCode.UNDEFINED_ERROR;

  res.status(500).json({
    message,
    errorCode,
    stack,
  });
};
