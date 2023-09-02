import Joi from 'joi';
import { FlossType } from '../service/floss-service';

export const flossSchema = Joi.object<FlossType>({
  code: Joi.string().required(),
  brandName: Joi.string().min(3).required(),
  flossId: Joi.string().required(),
  red: Joi.number(),
  blue: Joi.number(),
  green: Joi.number(),
});
