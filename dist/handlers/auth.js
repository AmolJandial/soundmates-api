"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPhone = verifyPhone;
exports.login = login;
exports.register = register;
const http_errors_1 = __importDefault(require("http-errors"));
const verify_phone_dto_1 = __importDefault(require("../dto/verify-phone.dto"));
const logger_config_1 = __importDefault(require("../config/logger-config"));
const z_config_1 = require("../config/z-config");
const user_1 = require("../models/user");
function verifyPhone(req, res, next) {
    const parsed = verify_phone_dto_1.default.safeParse(req.body);
    if (parsed.error) {
        const message = (0, z_config_1.formatZodErrors)(parsed.error);
        next(http_errors_1.default.BadRequest(message));
    }
    logger_config_1.default.debug(`correct number -> ${parsed.data}`);
}
function login(req, res) { }
function register(req, res) {
    const phoneNumber = req.body.phoneNumber;
    const newUser = new user_1.UserModel({
        name: '',
        phoneNumber: phoneNumber,
        age: 0,
        description: '',
        gender: user_1.Gender.notDefined,
        favoriteArtists: [],
        location: {
            coordinates: [12.12, 31.132],
        },
    });
    newUser.save();
}
