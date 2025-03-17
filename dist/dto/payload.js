"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const payloadSchema = zod_1.z.object({
    sub: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
});
exports.default = payloadSchema;
