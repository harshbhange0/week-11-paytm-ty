import { NextFunction, Request, Response } from "express";
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
export const Transaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const from = req.params.id;
  const { to, amount } = req.body;

  if (from === to) {
    return res.status(400).json({ msg: "You cannot pay yourself." });
  }

  try {
    const balanceOfSender = await prisma.account.findUnique({
      where: { userId: from },
    });

    const balanceOfReceiver = await prisma.account.findUnique({
      where: { userId: to },
    });

    if (!balanceOfSender) {
      return res.status(400).json({
        msg: "Sending user not found.",
      });
    } else if (balanceOfSender.balance < parseInt(amount)) {
      return res.status(400).json({
        msg: "Insufficient sender balance.",
      });
    }

    await prisma.$transaction(async () => {
      await prisma.account.update({
        data: { balance: balanceOfSender.balance - parseInt(amount) },
        where: { userId: from },
      });

      if (!balanceOfReceiver) {
        return res.status(400).json({
          msg: "Receiving user not found.",
        });
      }

      await prisma.account.update({
        data: { balance: balanceOfReceiver.balance + parseInt(amount) },
        where: { userId: to },
      });
    });
    next();
  } catch (error) {
    res.status(400).json({ error: error, msg: "Something went wrong." });
  } finally {
    await prisma.$disconnect();
  }
};
export const GetTransactionHistory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const trHs = await prisma.transaction.findMany({
      where: {
        senderId: id,
      },
    });
    let aryUser: any = [];
    for (const data of trHs) {
      const sender = await prisma.user.findUnique({
        where: { id: data.senderId },
      });
      const receiver = await prisma.user.findUnique({
        where: { id: data.receiverId },
      });
      if (sender && receiver) {
        aryUser.push({
          sender: sender.firstName + " " + sender.lastName,
          receiver: receiver.firstName + " " + receiver.lastName,
          amount: data.amount,
          time: data.createdAt
        });
      } else {
        return res.status(404).json({ msg: "user not found" });
      }
    }
    return res.status(200).json({ transaction_history: aryUser });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "error in finding users" });
  }
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
