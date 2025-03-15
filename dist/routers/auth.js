"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../handlers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post('/verifyPhone', auth_1.verifyPhone);
authRouter.post('/register', auth_1.register);
authRouter.post('/login', auth_1.login);
exports.default = authRouter;
