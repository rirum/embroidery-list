import { Prisma } from '@prisma/client';
import userRepository from '../../repositories/auth-repository/index.ts';
import flossRepository from '../../repositories/floss-repository/index.ts';
import { NotFoundError } from '../../errors/not-found-error.ts';

async function postFloss(userId: number, data: Prisma.FlossCreateInput) {
  const user = await userRepository.getUserById(userId);

  if (!user) throw NotFoundError();
  try {
    const createFlossInput: Prisma.FlossCreateInput = {
      ...data,
      user: { connect: { id: userId } },
    };

    const createFloss = await flossRepository.postFloss(createFlossInput);

    return createFloss;
  } catch (error) {
    console.log(error.message);
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
