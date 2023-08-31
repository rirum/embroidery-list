import Joi from 'joi';
import { SignInType } from '../service/auth-service';

export const signInSchema = Joi.object<SignInType>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
