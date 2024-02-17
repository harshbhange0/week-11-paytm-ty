"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const mainRouter = express_1.default.Router();
mainRouter.post("/register", user_controller_1.Register); // res=> id, token, account
mainRouter.post("/login", user_controller_1.Login); // res=> id, token
mainRouter.post("/auth-check", user_controller_1.Authenticate); //res=> true&false
mainRouter.get("/balance/:id", auth_middleware_1.default, user_controller_1.GetBalance); //res=> some balance
mainRouter.get("/transaction/:id", auth_middleware_1.default, user_controller_1.Transaction); // res=> transaction
mainRouter.get("/all-users", auth_middleware_1.default, user_controller_1.GetUser); // res=> all users[]
mainRouter.get("/*", (req, res) => {
    res.status(404).json({ msg: "Not Found" });
});
mainRouter.post("/*", (req, res) => {
    res.status(404).json({ msg: "Not Found" });
});
exports.default = mainRouter;
