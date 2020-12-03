import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const headerToken = request.headers.authorization;

  if (!headerToken) {
    throw new AppError('Token is missing');
  }

  const [, token] = headerToken.split(' ');

  try {
    const decoded = verify(token, auth.secret) as ITokenPayload;

    request.user = {
      id: decoded.sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
