import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from '../service/user-service/index.ts';

export async function postUser(req: Request, res: Response) {
  const { name, password, email } = req.body;
  try {
    const user = await userService.createUser(name, password, email);

    return res.status(httpStatus.CREATED).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
