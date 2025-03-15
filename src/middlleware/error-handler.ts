import { Request, Response, NextFunction } from 'express-serve-static-core';
import { HttpError } from 'http-errors';
import { fileLogger } from '../config/logger-config';

export function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  fileLogger.http(`${err.statusCode}, ${err.message}, ${err.stack}`);
  res
    .status(err.statusCode)
    .json({ statusCode: err.statusCode, message: err.message, result: [] });
}
