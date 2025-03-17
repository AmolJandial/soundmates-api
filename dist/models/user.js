"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.Gender = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var Gender;
(function (Gender) {
    Gender["male"] = "Male";
    Gender["female"] = "Female";
    Gender["transgender"] = "Transgender";
    Gender["other"] = "Other";
    Gender["notDefined"] = "NotDefined";
})(Gender || (exports.Gender = Gender = {}));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    gender: { enum: Gender, required: true },
    favoriteArtists: {
        type: [
            {
                mbid: String,
                name: String,
                genres: [String],
                imageUrl: String,
            },
        ],
        required: true,
    },
    location: {
        type: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: [Number],
        },
        required: true,
    },
});
userSchema.index({ location: '2dsphere' });
exports.UserModel = mongoose_1.default.model('User', userSchema);
