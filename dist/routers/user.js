"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../handlers/user");
const userRouter = (0, express_1.Router)();
userRouter.get('', user_1.getUser);
exports.default = userRouter;
