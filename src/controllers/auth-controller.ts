import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from '../service/user-service';

export async function postUser(req: Request, res: Response) {
  const { nome, password, email } = req.body;
  try {
    const user = await userService.createUser({ nome, password, email });

    return res.status(httpStatus.CREATED).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
