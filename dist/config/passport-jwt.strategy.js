"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("config"));
const cookieExtractor = function (req) {
    let token = null;
    return token;
};
const accessTokenStrategy = passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.get('access-token-key'),
}, function (payload, done) { }));
exports.default = accessTokenStrategy;
