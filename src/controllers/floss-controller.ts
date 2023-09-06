import httpStatus from 'http-status';
import { Request, Response } from 'express';
import flossService from '../service/floss-service';
import { AuthenticationRequest } from '../middlewares/authentication-middleware';

export async function postFloss(req: AuthenticationRequest, res: Response) {
  try {
    const flossData = req.body;
    // console.log(flossData.code);
    // console.log(flossData.brandName);
    // console.log(flossData.flossId);
    console.log(flossData);
    const userId = req.user?.userId;
    console.log(userId);

    if (!userId) {
      return res.status(401).send(`User not authenticated`);
    }

    const floss = await flossService.postFloss(userId, flossData);
    return res.status(201).json(floss);
  } catch (error) {
    console.log(error);
  }
}
