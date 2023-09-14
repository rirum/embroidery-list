import prisma from '../../configs/database-connection.ts';
import { Prisma, Floss } from '@prisma/client';

async function postFloss(data: Prisma.FlossCreateInput) {
  return prisma.floss.create({
    data,
  });
}

async function getAllFloss(): Promise<Floss[]> {
  return prisma.floss.findMany();
}

async function getFlossById(id: number): Promise<Floss | null> {
  return prisma.floss.findUnique({ where: { id: id } });
}

async function getFlossByName(flossId: string): Promise<Floss | null> {
  return prisma.floss.findFirst({ where: { flossId: flossId } });
}
const flossRepository = {
  postFloss,
  getAllFloss,
  getFlossById,
  getFlossByName,
};

export default flossRepository;
