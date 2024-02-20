import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export default async (req: Request, res: Response, next: NextFunction) => {
  const token: string = String(req.headers.token);
  if (process.env.JWT_SECRET) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken) {
        //@ts-ignore
        const email = decodedToken?.email;
        const userExist = await prisma.user.findUnique({ where: { email } });
        if (!userExist) {
          res.status(404).json({
            auth: false,
          });
        }
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        mgs: "wrong auth token",
      });
    }
  }
};
