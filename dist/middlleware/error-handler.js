"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_config_1 = require("../config/logger-config");
function errorHandler(err, req, res, next) {
    logger_config_1.fileLogger.http(`${err.statusCode}, ${err.message}, ${err.stack}`);
    res
        .status(err.statusCode)
        .json({ statusCode: err.statusCode, message: err.message, result: [] });
}
