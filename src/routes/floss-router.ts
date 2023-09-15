import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware.ts';
import { authenticateToken } from '../middlewares/authentication-middleware.ts';
import { flossSchema } from '../schema/floss-schema.ts';
import {
  deleteFloss,
  getAllFlossByUserId,
  postFloss,
  updateFloss,
} from '../controllers/floss-controller.ts';

const flossRouter = Router();

flossRouter.use(authenticateToken, validateBody(flossSchema));
flossRouter.post('/', postFloss);
flossRouter.get('/', getAllFlossByUserId);
flossRouter.patch('/:id', updateFloss);
flossRouter.delete('/:id', deleteFloss);
export { flossRouter };
