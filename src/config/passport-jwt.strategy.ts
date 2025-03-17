import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { payloadType } from '../dto/payload';
import config from 'config';
import { Request } from 'express-serve-static-core';
import { UserModel, userType } from '../models/user';
import { Error } from 'mongoose';
import logger from './logger-config';

// const cookieExtractor = function (req: Request): string | null {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies['refreshToken'];
//   }
//   return token;
// };

export const accessTokenStrategy = passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('auth.access-token-key'),
    },
    function (payload: payloadType, done: VerifiedCallback) {
      return done(null, payload);
    },
  ),
);

// export const refreshTokenStrategy = passport.use(
//   new Strategy(
//     {
//       jwtFromRequest: cookieExtractor,
//       secretOrKey: config.get<string>('auth.refresh-token.key'),
//     },
//     function (payload: payloadType, done: VerifiedCallback) {},
//   ),
// );
