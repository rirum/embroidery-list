import { Router } from 'express';
import { postUser } from '../controllers/auth-controller.ts';
import { validateBody } from '../middlewares/validation.middleware.ts';
import { createUserSchema } from '../schema/user-schema.ts';

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), postUser);

export { userRouter };
