import express from "express";
import { Request, Response } from "express";

import {
  GetBalance,
  Login,
  Register,
  Transaction,
  Authenticate,
  GetUsers,
  GetUser,
  GetTransactionHistory,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import addTransaction from "../middleware/transaction.middleware";
import Log from "../middleware/log";
const mainRouter = express.Router();

mainRouter.post("/register", Log, Register); // res=> id, token, account
mainRouter.post("/login", Log, Login); // res=> id, token
mainRouter.get("/auth-check", Log, authMiddleware, Authenticate); //res=> true&false
mainRouter.get("/balance/:id", Log, authMiddleware, GetBalance); //res=> some balance
mainRouter.post(
  "/transaction/:id",
  authMiddleware,
  Transaction,
  addTransaction
); // res=> transaction
mainRouter.get(
  "/transaction-history/:id",
  Log,
  authMiddleware,
  GetTransactionHistory
);
mainRouter.get("/all-users", Log, authMiddleware, GetUsers); // res=> all users[]
mainRouter.get("/user/:id", Log, authMiddleware, GetUser); // res=>  user{}
mainRouter.get("/*", Log, (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});
mainRouter.post("/*", Log, (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

export default mainRouter;
