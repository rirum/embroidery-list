import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from '../service/user-service/index.ts';
import authService from '../service/auth-service/index.ts';

export async function postUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser(name, email, password);

    return res.status(httpStatus.CREATED).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await authService.signIn({ email, password });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
