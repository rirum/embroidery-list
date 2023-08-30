import { User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type SignInType = {
  id: number;
  email: string;
  token: string;
};

export type CreateUserParams = Pick<User, 'name' | 'password' | 'email'>;
