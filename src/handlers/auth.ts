import { NextFunction, Request, Response } from 'express-serve-static-core';
import createHttpError from 'http-errors';

export function verifyPhone(req: Request, res: Response, next: NextFunction) {
  next(createHttpError.BadRequest('this is a bad request'));
}

export function login(req: Request, res: Response) {}

export function register(req: Request, res: Response) {
  res.json({ result: 'Hello Bitch' });
}
