import winston from 'winston';
import config from 'config';

/*
    TODO: log files to logtail
    TODO: add morgan logs to winston as well
*/

const { combine, timestamp, json, ms, errors, cli } = winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === 'warn' ? info : false;
});

const timeFormat = config.get<string>('log.time-format');
const dir = config.get<string>('log.path');

const logger = winston.createLogger({
  level: config.get<string>('log.level') || 'info',
  defaultMeta: {
    service: 'admin-service',
  },
  format: combine(errors({ stack: true }), cli()),
  exceptionHandlers: [
    new winston.transports.File({
      dirname: dir,
      filename: 'app-exception.log',
    }),
  ],
  transports: [
    new winston.transports.File({
      dirname: dir,
      level: 'error',
      filename: 'app-error.log',
      format: combine(
        errorFilter(),
        timestamp({ format: timeFormat }),
        ms(),
        json(),
      ),
    }),
    new winston.transports.File({
      dirname: dir,
      level: 'info',
      filename: 'app-info.log',
      format: combine(
        infoFilter(),
        timestamp({ format: timeFormat }),
        ms(),
        json(),
      ),
    }),
    new winston.transports.File({
      dirname: dir,
      level: 'warn',
      filename: 'app-warn.log',
      format: combine(
        warnFilter(),
        timestamp({ format: timeFormat }),
        ms(),
        json(),
      ),
    }),
    new winston.transports.Console({
      level: 'debug',
    }),
  ],
});

export default logger;
