import { Router } from 'express';
import { authGoogleSignIn } from '../middlewares/auth-google-middleware.ts';

const authGoogle = Router();
authGoogle.post('/', authGoogleSignIn);

export { authGoogle };
