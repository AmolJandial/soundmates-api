import { Request, Response, NextFunction } from 'express-serve-static-core';
import logger from '../config/logger-config';
import createHttpError from 'http-errors';
import payloadSchema from '../dto/payload';
import { userType } from '../models/user';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  logger.debug(`${user}`);
  if (!user) {
    logger.debug(`no such user found`);
    next(createHttpError.NotFound('No such user found'));
  }
  const parsedUserPayload = payloadSchema.safeParse(user);

  res.json({ result: parsedUserPayload.data });
}
