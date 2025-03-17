import { CorsOptions } from 'cors';
import { allowedOrigins } from './allowedOrigins';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CROS'));
    }
  },
  optionsSuccessStatus: 200,
};
