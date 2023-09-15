import { Router } from 'express';
import { validateBody } from '../middlewares/validation.middleware.ts';
import { authenticateToken } from '../middlewares/authentication-middleware.ts';
import { flossSchema } from '../schema/floss-schema.ts';
import {
  getAllFlossByUserId,
  postFloss,
  updateFloss,
} from '../controllers/floss-controller.ts';

const flossRouter = Router();

flossRouter.post('/', authenticateToken, validateBody(flossSchema), postFloss);
flossRouter.get(
  '/',
  authenticateToken,
  validateBody(flossSchema),
  getAllFlossByUserId
);
flossRouter.patch(
  '/:id',
  authenticateToken,
  validateBody(flossSchema),
  updateFloss
);
export { flossRouter };
