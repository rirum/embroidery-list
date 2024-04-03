import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors.ts';
import { exclude } from '../../utils/prisma-utils.ts';
import userRepository from '../../repositories/auth-repository/index.ts';

async function signIn(params: SignInType): Promise<SignInResult> {
  const { email, password } = params;

  const user = await userExist(email);

  await validatePassword(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function userExist(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
  return user;
}

async function validatePassword(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

async function createSession(userId: number): Promise<string> {
  const existingSession = await userRepository.getUserSession(userId);

  if (existingSession && existingSession.token) {
    return existingSession.token;
  }

  const newToken = jwt.sign({ userId }, process.env.JWT_SECRET as string);

  await userRepository.signIn({
    token: newToken,
    userId,
  });

  return newToken;
}
export type SignInType = Pick<Users, 'email' | 'password'>;
export type SignInResult = {
  user: Pick<Users, 'id' | 'email'>;
  token: string;
};

export type GetUserOrFailResult = Pick<Users, 'id' | 'email' | 'password'>;

const authService = {
  signIn,
  createSession,
};

export default authService;
