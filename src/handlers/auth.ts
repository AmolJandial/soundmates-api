import { Request, Response } from 'express-serve-static-core';

export function verifyPhone(req: Request, res: Response) {}

export function login(req: Request, res: Response) {}

export function register(req: Request, res: Response) {
  res.json({ result: 'Hello Bitch' });
}
