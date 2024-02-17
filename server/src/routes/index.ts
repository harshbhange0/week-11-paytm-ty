import express from "express";
import { Request, Response } from "express";

import {
  GetBalance,
  Login,
  Register,
  Transaction,
  Authenticate,
  GetUser,
} from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
const mainRouter = express.Router();

mainRouter.post("/register", Register); // res=> id, token, account
mainRouter.post("/login", Login); // res=> id, token
mainRouter.post("/auth-check", authMiddleware, Authenticate); //res=> true&false
mainRouter.get("/balance/:id", authMiddleware, GetBalance); //res=> some balance
mainRouter.get("/transaction/:id", authMiddleware, Transaction); // res=> transaction
mainRouter.get("/all-users", authMiddleware, GetUser); // res=> all users[]
mainRouter.get("/*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});
mainRouter.post("/*", (req: Request, res: Response) => {
  res.status(404).json({ msg: "Not Found" });
});

export default mainRouter;