import express, { NextFunction } from 'express';
import config from 'config';
import morgan from 'morgan';
import authRouter from './routers/auth';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlleware/error-handler';
import logger from './config/logger-config';

const app = express();
const port = config.get<number>('server.port');
const hostname = config.get<string>('server.hostname');

/*
    TODO: Look at pm2 near the end
    TODO: implement error handling and logging
*/

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use('/api/auth', authRouter);
app.use(errorHandler);
app.listen(port, hostname, () => {
  logger.debug(`server started at following port ${port}`);
});
