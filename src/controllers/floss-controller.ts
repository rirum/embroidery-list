import httpStatus from 'http-status';
import { Request, Response } from 'express';
import flossService from '../service/floss-service/index.ts';
import { AuthenticationRequest } from '../middlewares/authentication-middleware';

export async function postFloss(req: AuthenticationRequest, res: Response) {
  try {
    const flossData = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).send(`user not authenticated`);
    }
    const floss = await flossService.postFloss(userId, flossData);
    return res.status(201).json(floss);
  } catch (error) {
    console.log(error.message);
  }
}
