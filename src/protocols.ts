import { User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type SignInType = {
  user: Pick<User, 'email' | 'password'>;
};

export type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

export type CreateUserParams = Pick<User, 'name' | 'password' | 'email'>;
