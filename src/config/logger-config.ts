import winston from 'winston';
import config from 'config';

/*
    TODO: log files to logtail
    TODO: add morgan logs to winston as well
*/

const { combine, timestamp, json, ms, errors, colorize, align, printf } =
  winston.format;

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === 'warn' ? info : false;
});

const httpFilter = winston.format((info, opts) => {
  return info.level === 'http' ? info : false;
});

const timeFormat = config.get<string>('log.time-format');
const dir = config.get<string>('log.path');

winston.loggers.add(config.get<string>('log.file-key'), {
  level: config.get<string>('log.level') || 'http',
  format: combine(errors({ stack: true })),
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
      format: combine(errorFilter(), timestamp({ format: timeFormat }), json()),
    }),
    new winston.transports.File({
      dirname: dir,
      level: 'info',
      filename: 'app-info.log',
      format: combine(infoFilter(), timestamp({ format: timeFormat }), json()),
    }),
    new winston.transports.File({
      dirname: dir,
      level: 'warn',
      filename: 'app-warn.log',
      format: combine(warnFilter(), timestamp({ format: timeFormat }), json()),
    }),
    new winston.transports.File({
      dirname: dir,
      level: 'http',
      filename: 'app-http.log',
      format: combine(httpFilter(), timestamp({ format: timeFormat }), json()),
    }),
  ],
});

winston.loggers.add(config.get<string>('log.console-key'), {
  level: config.get<string>('log.level'),
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'ddd YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    ms(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});

const logger = winston.loggers.get(config.get<string>('log.console-key'));
export const fileLogger = winston.loggers.get(
  config.get<string>('log.file-key'),
);

export default logger;
