import prisma from '../../configs/database-connection.ts';
import { Prisma } from '@prisma/client';

async function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findByEmail(email: string) {
  const params = {
    where: {
      email,
    },
  };
  return prisma.user.findFirst(params);
}

const userRepository = {
  createUser,
  findByEmail,
};

export default userRepository;
