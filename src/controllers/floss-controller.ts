import httpStatus from 'http-status';
import { Request, Response } from 'express';
import flossService from '../service/floss-service/index.ts';
import prisma from '../configs/database-connection.ts';
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
    if (error.message === 'Floss ID Already Exists') {
      return res.status(400).send('Floss ID already exists');
    } else {
      console.log(error.message);
    }
  }
}

export async function getAllFlossByUserId(
  req: AuthenticationRequest,
  res: Response
) {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).send(`user not authenticated`);
    }
    const getAllFloss = await flossService.getAllFlossByUserId(userId);
    return res.status(201).json(getAllFloss);
  } catch (error) {
    if (error.message === 'There is no floss on this user') {
      return res.status(400).send('There is no floss on this user');
    } else {
      console.log(error.message);
    }
  }
}

export async function updateFloss(req: AuthenticationRequest, res: Response) {
  try {
    const flossId = parseInt(req.params.id);
    const updateData = req.body;
    const userId = req.userId;

    const existingFloss = await flossService.getFlossById(flossId);

    if (!existingFloss) {
      return res.status(404).json({ error: 'Floss not found' });
    }

    if (existingFloss.userId !== userId) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    const updatedFloss = await flossService.updateFloss(flossId, updateData);

    return res.status(200).json(updatedFloss);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
