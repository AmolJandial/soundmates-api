"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("config"));
/*
    TODO: log files to logtail
    TODO: add morgan logs to winston as well
*/
const { combine, timestamp, json, ms, errors, cli } = winston_1.default.format;
const errorFilter = winston_1.default.format((info, opts) => {
    return info.level === "error" ? info : false;
});
const infoFilter = winston_1.default.format((info, opts) => {
    return info.level === "info" ? info : false;
});
const warnFilter = winston_1.default.format((info, opts) => {
    return info.level === "warn" ? info : false;
});
const timeFormat = config_1.default.get("log.time-format");
const dir = config_1.default.get("log.path");
const logger = winston_1.default.createLogger({
    level: config_1.default.get("log.level") || 'info',
    defaultMeta: {
        service: 'admin-service',
    },
    format: combine(errors({ stack: true }), cli()),
    exceptionHandlers: [
        new winston_1.default.transports.File({
            dirname: dir,
            filename: "app-exception.log"
        })
    ],
    transports: [new winston_1.default.transports.File({
            dirname: dir,
            level: "error",
            filename: "app-error.log",
            format: combine(errorFilter(), timestamp({ format: timeFormat }), ms(), json())
        }),
        new winston_1.default.transports.File({
            dirname: dir,
            level: "info",
            filename: "app-info.log",
            format: combine(infoFilter(), timestamp({ format: timeFormat }), ms(), json())
        }),
        new winston_1.default.transports.File({
            dirname: dir,
            level: "warn",
            filename: "app-warn.log",
            format: combine(warnFilter(), timestamp({ format: timeFormat }), ms(), json())
        }),
        new winston_1.default.transports.Console({
            level: "debug",
        })
    ]
});
exports.default = logger;
