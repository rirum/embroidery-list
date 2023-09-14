import prisma from '../../configs/database-connection.ts';
import { Prisma, Session } from '@prisma/client';

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
async function getUserSession(userId: number): Promise<Session | null> {
  const session = await prisma.session.findFirst({
    where: {
      userId,
    },
  });

  return session;
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
  getUserSession,
};

export default userRepository;
