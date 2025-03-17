import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import authRouter from './routers/auth';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlleware/error-handler';
import logger from './config/logger-config';
// import userRouter from './routers/user';
import mongoose from 'mongoose';
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
import userRouter from './routers/user';
import { accessTokenStrategy } from './config/passport-jwt.strategy';
import createHttpError from 'http-errors';

const app = express();
const port = config.get<number>('server.port');
const hostname = config.get<string>('server.hostname');
const dburl = config.get<string>('database.url');

/*
    TODO: Look at pm2 near the end
    TODO: implement error handling and logging
*/

mongoose
  .connect(dburl)
  .then(() => {
    logger.debug(`connected to db`);
    app.listen(port, hostname, () => {
      logger.debug(`server started at following port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(`error connecting to db -> ${error}`);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use('/api/auth', authRouter);
app.use(
  accessTokenStrategy.authenticate('jwt', {
    session: false,
    failureRedirect: '/api/auth/refreshToken',
  }),
);
app.use('/api/user', userRouter);
app.use(errorHandler);
