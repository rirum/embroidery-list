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
  console.log(token);
  if (!token) return generateUnauthorizedResponse(res);

  try {
    // const userDecoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log(userDecoded);
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const session = await prisma.session.findFirst({ where: { token } });

    if (!session) return;
    req.user = { userId };

    return next();
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
