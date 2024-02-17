"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(res) {
    let token = "";
    if (process.env.JWT_SECRET) {
        token = jsonwebtoken_1.default.sign({
            email: res.email,
            password: res.password,
            firstName: res.firstName,
            lastName: res.lastName,
        }, process.env.JWT_SECRET.toString());
    }
    return token;
}
exports.default = generateToken;
