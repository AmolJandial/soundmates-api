import { NextFunction, Request, Response } from 'express-serve-static-core';
import createHttpError from 'http-errors';
import verifyPhoneSchema, { verifyPhoneDto } from '../dto/verify-phone.dto';
import logger from '../config/logger-config';
import { formatZodErrors } from '../config/z-config';
import { AuthDto } from '../dto/auth.dto';
import { Gender, UserModel } from '../models/user';
import payloadSchema from '../dto/payload';
import jwt from 'jsonwebtoken';
import config from 'config';
import cookie from 'cookie';
import argon2 from 'argon2';
import { createTokens, updateRefreshToken } from '../utils/token_helper';

export async function verifyPhone(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const parsed = verifyPhoneSchema.safeParse(req.body);
  if (parsed.error) {
    const message = formatZodErrors(parsed.error);
    next(createHttpError.BadRequest(message));
  }
  logger.debug(`correct number -> ${parsed.data}`);
}

export async function login(
  req: Request<{}, {}, AuthDto>,
  res: Response,
  next: NextFunction,
) {
  try {
    const phoneNumber = req.body.phoneNumber;

    const userExists = await UserModel.findOne({ phoneNumber: phoneNumber });
    if (!userExists) {
      next(
        createHttpError.NotFound("This user doesn't exist, register instead"),
      );
    } else {
      const accessToken = await handleTokens(
        userExists._id.toString(),
        userExists.phoneNumber,
        res,
      );
      res.json({ accessToken: accessToken, result: userExists });
    }
  } catch (error) {
    logger.error(`register error -> ${error}`);
    next(
      createHttpError.InternalServerError(
        'An unexpected error has occured, please try again later',
      ),
    );
  }
}

export async function register(
  req: Request<{}, {}, AuthDto>,
  res: Response,
  next: NextFunction,
) {
  try {
    const phoneNumber = req.body.phoneNumber;

    const newUser = await UserModel.create({
      phoneNumber: phoneNumber,
    });
    const accessToken = await handleTokens(
      newUser._id.toString(),
      newUser.phoneNumber,
      res,
    );
    res.json({ accessToken: accessToken, result: newUser });
  } catch (error) {
    logger.error(`register error -> ${error}`);
    next(
      createHttpError.InternalServerError(
        'An unexpected error has occured, please try again later',
      ),
    );
  }
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.debug(`refresh route redirect`);
}

async function handleTokens(id: string, phoneNumber: string, res: Response) {
  const tokens = createTokens(id, phoneNumber);

  await updateRefreshToken(id, tokens.refreshToken);

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: true,
  });
  return tokens.accessToken;
}
