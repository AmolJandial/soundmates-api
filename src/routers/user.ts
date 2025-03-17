import { NextFunction, Request, Response, Router } from 'express';
import { getUser } from '../handlers/user';
import { accessTokenStrategy } from '../config/passport-jwt.strategy';
import { payloadType } from '../dto/payload';
import logger from '../config/logger-config';
import createHttpError from 'http-errors';

const userRouter = Router();

userRouter.get('/', getUser);

export default userRouter;
