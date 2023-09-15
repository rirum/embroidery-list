import { Prisma } from '@prisma/client';
import userRepository from '../../repositories/auth-repository/index.ts';
import flossRepository from '../../repositories/floss-repository/index.ts';
import { NotFoundError } from '../../errors/not-found-error.ts';
import { AlreadyExists } from '../../errors/already-exists.ts';
import prisma from '../../configs/database-connection.ts';

async function postFloss(userId: number, data: Prisma.FlossCreateInput) {
  const user = await userRepository.getUserById(userId);

  if (!user) throw NotFoundError();

  const flossIdAlreadyExists = await checkFlossId(data.flossId);
  if (flossIdAlreadyExists) throw new Error('Floss ID Already Exists');

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
async function checkFlossId(flossId: string) {
  const floss = await flossRepository.getFlossByName(flossId);

  return floss !== null;
}
async function getFlossById(id: number) {
  const floss = await flossRepository.getFlossById(id);
  return floss;
}

async function getAllFlossByUserId(userId: number) {
  const allFloss = await flossRepository.getAllFlossByUserId(userId);
  if (!allFloss) throw new Error('There is no floss on this user');
  return allFloss;
}

async function updateFloss(
  flossId: number,
  updateData: Prisma.FlossUpdateInput
) {
  const existingFloss = await prisma.floss.findUnique({
    where: { id: flossId },
  });

  if (!existingFloss) {
    throw new Error('Floss not found');
  }

  const updatedFloss = await prisma.floss.update({
    where: { id: flossId },
    data: updateData,
  });

  return updatedFloss;
}
export type FlossType = {
  code: string;
  brandName: string;
  flossId: string;
  flossImg: string;
  description: string;
  quantity: number;
  red: number | null;
  blue: number | null;
  green: number | null;
  userId: number;
};

const flossService = {
  postFloss,
  checkFlossId,
  getFlossById,
  getAllFlossByUserId,
  updateFloss,
};

export default flossService;
