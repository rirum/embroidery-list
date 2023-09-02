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

async function signIn(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function getUserById(userId: number) {
  const user = prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
}
const userRepository = {
  createUser,
  findByEmail,
  signIn,
  getUserById,
};

export default userRepository;
