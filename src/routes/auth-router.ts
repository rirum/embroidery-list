import { Router } from 'express';
import { signIn } from '../controllers/auth-controller.ts';
import { validateBody } from '../middlewares/validation.middleware.ts';
import { signInSchema } from '../schema/signIn-schema.ts';

const signInRouter = Router();

signInRouter.post('/', validateBody(signInSchema), signIn);

export { signInRouter };
