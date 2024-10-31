import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { LibraryAppError } from '../error/LibraryAppError';
import { LibraryAppErrorCode } from '../error/LibraryAppErrorCode';

export const validateRequest = (
    req: Request, res: Response, next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map(err => `${err.msg}`).join(', ');

    return next(new LibraryAppError(LibraryAppErrorCode.VALIDATION_ERROR, message));
  }

  next();
};
