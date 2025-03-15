"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routers/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logger_config_1 = __importDefault(require("./config/logger-config"));
const app = (0, express_1.default)();
const port = config_1.default.get("server.port");
const hostname = config_1.default.get("server.hostname");
/*
    TODO: Look at pm2 near the end
    TODO: implement error handling and logging
*/
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use('/api/auth', auth_1.default);
app.listen(port, hostname, () => {
    logger_config_1.default.debug(`server started at following port ${port}`);
});
