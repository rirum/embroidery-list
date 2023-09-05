import { NextFunction, Request, Response } from 'express';
import prisma from '../configs/database-connection.ts';
import * as jwt from 'jsonwebtoken';
import { unauthorizedError } from '../errors/unauthorized-error.ts';

export async function authenticateToken(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader.split(' ')[1];
  console.log(token);
  if (!token) return generateUnauthorizedResponse(res);

  try {
    console.log('passou');
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = { userId };
    console.log(req.user);
    const session = await prisma.session.findFirst({ where: { token } });

    if (!session) return generateUnauthorizedResponse(res);

    next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(401).send(unauthorizedError());
}

export type AuthenticationRequest = Request & { user?: JwtPayload };

type JwtPayload = {
  userId: number;
};
