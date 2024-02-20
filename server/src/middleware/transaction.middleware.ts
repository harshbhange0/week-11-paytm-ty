import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function addTransaction(req: Request, res: Response) {
  const from = req.params.id;
  const { to, amount } = req.body;
  try {
    const tr = await prisma.transaction.create({
      data: {
        senderId: from,
        receiverId: to,
        amount: parseInt(amount),
      },
    });
    if (!tr) {
      res
        .status(200)
        .json({ msg: "transition successful but no transaction created" });
    } else {
      res
        .status(200)
        .json({ msg: "transaction added successfully", transaction: tr });
    }
  } catch (error) {
    console.log(error);
  }
}
