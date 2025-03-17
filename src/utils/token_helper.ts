import argon2 from 'argon2';
import { UserModel } from '../models/user';
import payloadSchema from '../dto/payload';
import jwt from 'jsonwebtoken';
import config from 'config';

export async function updateRefreshToken(id: string, refreshToken: string) {
  const encryptedRefreshToken = await argon2.hash(refreshToken);
  await UserModel.findByIdAndUpdate(id, {
    refreshToken: encryptedRefreshToken,
  });
}

export function createTokens(id: string, phoneNumber: string) {
  const payload = payloadSchema.parse({
    sub: id,
    phoneNumber: phoneNumber,
  });

  const [accessToken, refreshToken] = [
    jwt.sign(payload, config.get<string>('auth.access-token-key'), {
      expiresIn: '30m',
    }),
    jwt.sign(payload, config.get<string>('auth.refresh-token-key'), {
      expiresIn: '30d',
    }),
  ];

  return { accessToken, refreshToken };
}
