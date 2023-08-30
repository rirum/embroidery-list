import Joi from 'joi';
import { CreateUserParams } from '../protocols';

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
