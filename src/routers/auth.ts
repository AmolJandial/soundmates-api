import { Router } from 'express';
import { login, register, verifyPhone } from '../handlers/auth';

const authRouter = Router();

authRouter.post('/verifyPhone', verifyPhone);

authRouter.post('/register', register);

authRouter.post('/login', login);

export default authRouter;
