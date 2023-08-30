import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors.ts';
import userRepository from '../../repositories/auth-repository/index.ts';
// import { SignInType, SignInResult } from '../../protocols.ts';

async function signIn(params: SignInType) {
  const { email, password } = params;

  const user = await userExist(email);

  await validatePassword(password, user.password);
}

async function userExist(email: string) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();
}

async function validatePassword(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInType = Pick<User, 'email' | 'password'>;
export type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};
