import httpStatus from 'http-status';
import { Request, Response } from 'express';
import flossService from '../service/floss-service';

export async function postFloss(req: Request, res: Response) {
  try {
    const { code, brandName, flossId, flossImg, description } = req.body;
    const userId = req.params.userId;

    console.log(userId);
    if (!userId) {
      return res.status(401).send(`User not authenticated`);
    }

    const newFlossData = {
      code,
      brandName,
      flossId,
      flossImg,
      description,
    };

    // const floss = await flossService.postFloss(req.params.userId);
  } catch (error) {
    console.log(error);
  }
}
