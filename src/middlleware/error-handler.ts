import { Request, Response, NextFunction } from 'express-serve-static-core';
import { HttpError } from 'http-errors';
import logger, { fileLogger } from '../config/logger-config';

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.debug(`normal error -> ${err}`);

  if (err instanceof HttpError) {
    fileLogger.http(`${err.statusCode}, ${err.message}, ${err.stack}`);
    res
      .status(err.statusCode)
      .json({ statusCode: err.statusCode, message: err.message, result: [] });
  } else if (err instanceof Error) {
    logger.debug(`normal error -> ${err}`);
  }
}
