"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const awesome_phonenumber_1 = require("awesome-phonenumber");
function phoneValidator(phoneNumber) {
    const parsedNumber = (0, awesome_phonenumber_1.parsePhoneNumber)('+919729801261');
    return parsedNumber.valid;
}
const verifyPhoneSchema = zod_1.z.object({
    phoneNumber: zod_1.z
        .string()
        .nonempty({ message: 'Please enter a phone number' })
        .refine(phoneValidator, (val) => ({
        message: `${val} is not a valid phone number`,
    })),
});
exports.default = verifyPhoneSchema;
