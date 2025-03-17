"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("config"));
/*
    TODO: log files to logtail
    TODO: add morgan logs to winston as well
*/
const { combine, timestamp, json, ms, errors, colorize, align, printf } = winston_1.default.format;
const errorFilter = winston_1.default.format((info, opts) => {
    return info.level === 'error' ? info : false;
});
const infoFilter = winston_1.default.format((info, opts) => {
    return info.level === 'info' ? info : false;
});
const warnFilter = winston_1.default.format((info, opts) => {
    return info.level === 'warn' ? info : false;
});
const httpFilter = winston_1.default.format((info, opts) => {
    return info.level === 'http' ? info : false;
});
const timeFormat = config_1.default.get('log.time-format');
const dir = config_1.default.get('log.path');
winston_1.default.loggers.add(config_1.default.get('log.file-key'), {
    level: config_1.default.get('log.level') || 'http',
    format: combine(errors({ stack: true })),
    exceptionHandlers: [
        new winston_1.default.transports.File({
            dirname: dir,
            filename: 'app-exception.log',
        }),
    ],
    transports: [
        new winston_1.default.transports.File({
            dirname: dir,
            level: 'error',
            filename: 'app-error.log',
            format: combine(errorFilter(), timestamp({ format: timeFormat }), json()),
        }),
        new winston_1.default.transports.File({
            dirname: dir,
            level: 'info',
            filename: 'app-info.log',
            format: combine(infoFilter(), timestamp({ format: timeFormat }), json()),
        }),
        new winston_1.default.transports.File({
            dirname: dir,
            level: 'warn',
            filename: 'app-warn.log',
            format: combine(warnFilter(), timestamp({ format: timeFormat }), json()),
        }),
        new winston_1.default.transports.File({
            dirname: dir,
            level: 'http',
            filename: 'app-http.log',
            format: combine(httpFilter(), timestamp({ format: timeFormat }), json()),
        }),
    ],
});
winston_1.default.loggers.add(config_1.default.get('log.console-key'), {
    level: config_1.default.get('log.level'),
    format: combine(colorize({ all: true }), timestamp({
        format: 'ddd YYYY-MM-DD hh:mm:ss.SSS A',
    }), ms(), align(), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
    transports: [new winston_1.default.transports.Console()],
});
const logger = winston_1.default.loggers.get(config_1.default.get('log.console-key'));
exports.fileLogger = winston_1.default.loggers.get(config_1.default.get('log.file-key'));
exports.default = logger;
