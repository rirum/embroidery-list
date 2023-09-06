import { Prisma, Floss } from '@prisma/client';
import userRepository from '../../repositories/auth-repository';
import flossRepository from '../../repositories/floss-repository';
import { NotFoundError } from '../../errors/not-found-error';

async function postFloss(userId: number, data: Prisma.FlossCreateInput) {
  const user = await userRepository.getUserById(userId);

  if (!user) throw NotFoundError();
  try {
    const createFloss = await flossRepository.postFloss(data);
    return createFloss;
  } catch (error) {
    throw new Error(`Error on the new floss entry`);
  }
}

export type FlossType = {
  code: string;
  brandName: string;
  flossId: string;
  flossImg: string;
  description: string;
  red: number | null;
  blue: number | null;
  green: number | null;
  userId: number;
};

const flossService = {
  postFloss,
};

export default flossService;
