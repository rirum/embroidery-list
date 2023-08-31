import { Router } from 'express';
import { userRouter } from './user-router.ts';
import { signInRouter } from './auth-router.ts';
const routes = Router();

routes.use('/users', userRouter);
routes.use('/signin', signInRouter);

export default routes;
