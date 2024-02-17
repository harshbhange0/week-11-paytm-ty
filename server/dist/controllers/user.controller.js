"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = exports.Authenticate = exports.Transaction = exports.GetBalance = exports.Login = exports.Register = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const prisma = new client_1.PrismaClient();
const zodSchemaUser = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
});
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zodSchemaUser.safeParse(req.body);
    try {
        if (!success) {
            res.status(400).json({
                msg: "invalid input",
            });
        }
        else {
            const existsUser = yield prisma.user.findUnique({
                where: { email: req.body.email },
            });
            if (!existsUser) {
                const User = yield prisma.user.create({
                    data: {
                        email: req.body.email,
                        password: req.body.password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                    },
                });
                if (!User) {
                    res.status(500).json({ msg: "Setting user credentials failed" });
                }
                const balance = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;
                const newAccount = yield prisma.account.create({
                    data: {
                        balance: balance,
                        userId: User.id,
                    },
                });
                if (!newAccount) {
                    res.status(400).json({
                        msg: "Account creation failed",
                    });
                }
                const token = (0, generateToken_1.default)(User);
                const userId = yield prisma.user.findUnique({
                    where: { email: req.body.email },
                });
                res.status(200).json({
                    msg: "user Register Successfully",
                    userId: userId === null || userId === void 0 ? void 0 : userId.id,
                    token: token,
                    account: newAccount,
                });
            }
            else {
                res.status(409).json({ error: "User already exists" });
            }
        }
    }
    catch (error) {
        res.status(422).json({ msg: "User Registration failed", error });
    }
});
exports.Register = Register;
const zodSchemaUselog = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zodSchemaUselog.safeParse(req.body);
    try {
        if (!success) {
            return res.status(400).json({ msg: "Invalid Input" });
        }
        else {
            const User = yield prisma.user.findUnique({
                where: { email: req.body.email },
            });
            if (!User) {
                res.status(404).json({ msg: "User not found" });
            }
            else {
                const token = (0, generateToken_1.default)(User);
                res.status(200).json({
                    msg: "log in successfully",
                    id: User.id,
                    token,
                });
            }
        }
    }
    catch (error) {
        res.status(422).json({ msg: "User Log in failed", error });
    }
});
exports.Login = Login;
const GetBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id === undefined || id === null) {
        res.status(404).json({ msg: "Provide UserId" });
    }
    else {
        const userId = id;
        const balance = yield prisma.account.findUnique({
            where: { userId: userId },
        });
        if (balance === null) {
            res.status(404).json({ msg: "Account not found" });
        }
        else {
            res.status(200).json(balance);
        }
    }
});
exports.GetBalance = GetBalance;
const Transaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { to, amount } = req.body;
    try {
        const balanceOfSender = yield prisma.account.findUnique({ where: { id } });
        const balanceOfReceiver = yield prisma.account.findUnique({
            where: { id: to },
        });
        prisma.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
            if (!(balanceOfSender === null || balanceOfSender === void 0 ? void 0 : balanceOfSender.balance)) {
                res.status(400).json({
                    msg: "sending user not found",
                });
            }
            else {
                if (balanceOfSender.balance < amount) {
                    res.status(400).json({
                        msg: "insufficient sender balance",
                    });
                }
                yield prisma.account.update({
                    data: { balance: balanceOfSender.balance - amount },
                    where: { id },
                });
            }
            if (!(balanceOfReceiver === null || balanceOfReceiver === void 0 ? void 0 : balanceOfReceiver.balance)) {
                res.status(400).json({
                    msg: "reserving user not found",
                });
            }
            else {
                yield prisma.account.update({
                    data: { balance: balanceOfReceiver.balance + amount },
                    where: { id: to },
                });
            }
        }));
    }
    catch (error) {
        res.status(400).json({ error: error, msg: "something went wrong" });
    }
    res.status(200).json({ msg: "transaction successful" });
});
exports.Transaction = Transaction;
const Authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ auth: true });
});
exports.Authenticate = Authenticate;
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    if (!users) {
        res.status(404).json({ msg: "no users found" });
    }
    res.status(200).json(users);
});
exports.GetUser = GetUser;
