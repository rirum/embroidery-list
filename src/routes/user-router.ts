import { Router } from 'express';
import { postUser } from '../controllers/auth-controller';

const userRouter = Router();

userRouter.post('/', postUser);

export { userRouter };
