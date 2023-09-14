import { NextFunction, Request, Response } from 'express';
import prisma from '../configs/database-connection.ts';
import jwt from 'jsonwebtoken';
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
    req.userId = userId;
    const session = await prisma.session.findFirst({ where: { token } });

    if (!session) throw generateUnauthorizedResponse(res);

    return next();
  } catch (error) {
    return console.log(error.message);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(401).send(unauthorizedError());
}

export type AuthenticationRequest = Request & { userId?: number };

type JwtPayload = {
  userId: number;
};
