import { NextFunction, Request, Response } from 'express';
import prisma from '../configs/database-connection.ts';
import * as jwt from 'jsonwebtoken';

import httpStatus from 'http-status';
import { unauthorizedError } from '../errors/unauthorized-error.ts';

export async function authenticateToken(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(' ')[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const session = await prisma.session.findFirst({ where: { token } });
    if (!session) return generateUnauthorizedResponse(res);
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticationRequest = Request & JwtPayload;

type JwtPayload = {
  userId: number;
};
