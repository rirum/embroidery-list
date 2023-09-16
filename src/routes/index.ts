import { Router } from 'express';
import { userRouter } from './user-router.ts';
import { signInRouter } from './auth-router.ts';
import { flossRouter } from './floss-router.ts';
import { authGoogle } from './auth-google.ts';
const routes = Router();

routes.use('/users', userRouter);
routes.use('/signin', signInRouter);
routes.use('/floss', flossRouter);
routes.use('/sign-in/google', authGoogle);
export default routes;
