import bcrypt from 'bcrypt';

import userRepository from '../../repositories/auth-repository/index.ts';

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const teste = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  console.log(teste);

  return userRepository.createUser({
    name: name,
    email: email,
    password: hashedPassword,
  });
}

const userService = {
  createUser,
};

export default userService;
