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
const mainRouter = express.Router();

mainRouter.post("/register", Register); // res=> id, token, account
mainRouter.post("/login", Login); // res=> id, token
mainRouter.get("/auth-check", authMiddleware, Authenticate); //res=> true&false
mainRouter.get("/balance/:id", authMiddleware, GetBalance); //res=> some balance
mainRouter.post(
  "/transaction/:id",
  authMiddleware,
  Transaction,
  addTransaction
); // res=> transaction
mainRouter.get(
  "/transaction-history/:id",
 
  authMiddleware,
  GetTransactionHistory
);
mainRouter.get("/all-users", authMiddleware, GetUsers); // res=> all users[]
mainRouter.get("/user/:id", authMiddleware, GetUser); // res=>  user{}
mainRouter.get("/*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});
mainRouter.post("/*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

export default mainRouter;
