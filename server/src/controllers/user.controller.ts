import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import zod from "zod";
import generateToken from "../utils/generateToken";
const prisma = new PrismaClient();
const zodSchemaUser = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  firstName: zod.string(),
  lastName: zod.string(),
});

export const Register = async (req: Request, res: Response) => {
  const input = zodSchemaUser.safeParse(req.body);
  try {
    if (!input.success) {
      res.status(400).json({
        msg: input.error.issues[0].message,
        type: input.error.issues[0].path[0] || "",
      });
    } else {
      const existsUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (!existsUser) {
        const User = await prisma.user.create({
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
        const newAccount = await prisma.account.create({
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
        const token = generateToken(User);
        const userId = await prisma.user.findUnique({
          where: { email: req.body.email },
        });
        res.status(200).json({
          msg: "User Register Successfully",
          id: userId?.id,
          token: token,
          account: newAccount,
        });
      } else {
        res.status(409).json({ error: "User already exists" });
      }
    }
  } catch (error) {
    res.status(422).json({ msg: "User Registration failed", error });
  }
};
const zodSchemaUselog = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
export const Login = async (req: Request, res: Response) => {
  const input = zodSchemaUselog.safeParse(req.body);
  try {
    if (!input.success) {
      return res.status(400).json({ msg: "Invalid Input", input });
    } else {
      const User = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      if (!User) {
        res.status(404).json({ msg: "User not found" });
      } else {
        const token = generateToken(User);
        res.status(200).json({
          msg: "log in successfully",
          id: User.id,
          token,
        });
      }
    }
  } catch (error) {
    res.status(422).json({ msg: "User Log in failed", error });
  }
};

export const GetBalance = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (id === undefined || id === null) {
    res.status(404).json({ msg: "Provide UserId" });
  } else {
    const userId = id;
    const balance = await prisma.account.findUnique({
      where: { userId: userId },
    });
    if (balance === null) {
      res.status(404).json({ msg: "Account not found" });
    } else {
      res.status(200).json(balance);
    }
  }
};

export const Transaction = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { to, amount } = req.body;
  try {
    const balanceOfSender = await prisma.account.findUnique({ where: { id } });
    const balanceOfReceiver = await prisma.account.findUnique({
      where: { id: to },
    });
    prisma.$transaction(async () => {
      if (!balanceOfSender?.balance) {
        res.status(400).json({
          msg: "sending user not found",
        });
      } else {
        if (balanceOfSender.balance < amount) {
          res.status(400).json({
            msg: "insufficient sender balance",
          });
        }
        await prisma.account.update({
          data: { balance: balanceOfSender.balance - amount },
          where: { id },
        });
      }
      if (!balanceOfReceiver?.balance) {
        res.status(400).json({
          msg: "reserving user not found",
        });
      } else {
        await prisma.account.update({
          data: { balance: balanceOfReceiver.balance + amount },
          where: { id: to },
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error, msg: "something went wrong" });
  }
  res.status(200).json({ msg: "transaction successful" });
};
export const Authenticate = async (req: Request, res: Response) => {
 return res.status(200).json({ auth: true });
};
export const GetUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  if (!users) {
    res.status(404).json({ msg: "no users found" });
  }
  res.status(200).json(users);
};
export const GetUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ msg: "User Not Found!" });
  }
  res.status(200).json(user);
};
