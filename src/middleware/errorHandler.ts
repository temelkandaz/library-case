
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error (you could use a logger like Winston here)
  console.error(err.stack);

  // Customize the response based on the error
  res.status(500).json({
    message: err.message || 'Internal Server Error',
    // In production, avoid sending stack trace to the client
    stack: err.stack,
  });
};
