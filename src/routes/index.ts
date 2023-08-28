import { Router } from 'express';
import { userRouter } from './user-router.ts';

const routes = Router();

routes.use('/users', userRouter);

export default routes;
