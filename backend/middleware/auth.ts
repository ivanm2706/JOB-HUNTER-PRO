/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt, { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { JWT_SECRET } from '../routes/auth';
import { NextFunction, Request, Response } from 'express';

interface JwtPayload {
  id: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(404).json({ message: 'No token provided ' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = (await jwt.verify(token, JWT_SECRET)) as JwtPayload;

    (req as any).userId = decoded.id;

    next();
  } catch (e) {
    const error = e as VerifyErrors;

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: `token expired at ${error.expiredAt}` });
    }

    return res.status(401).json({ message: 'server error' });
  }
};
