import { Router } from 'express';
import { signIn } from '../controllers/auth-controller.ts';
import { validateBody } from '../middlewares/validation.middleware.ts';
// import { signInSchema } from '../schema/signIn-schema.ts';
import { authenticateToken } from '../middlewares/authentication-middleware';
const flossRouter = Router();

flossRouter.post('/', authenticateToken, validateBody);

export { flossRouter };
