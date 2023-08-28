import { Router } from 'express';
import { postUser } from '../controllers/auth-controller.ts';

const userRouter = Router();

userRouter.post('/', postUser);

export { userRouter };
