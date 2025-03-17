import { Router } from 'express';
import { login, register, verifyPhone, refreshToken } from '../handlers/auth';

const authRouter = Router();

authRouter.post('/verifyPhone', verifyPhone);

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/refreshToken', refreshToken);

export default authRouter;
