import { usuarios } from '@prisma/client';
import bcrypt from 'bcrypt';

import userRepository from '../../repositories/auth-repository';

export async function createUser({ nome, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);

  return userRepository.createUser({
    nome: nome,
    email: email,
    password: hashedPassword,
  });
}

const userService = {
  createUser,
};

export default userService;
