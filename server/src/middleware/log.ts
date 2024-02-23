import { Request, Response, NextFunction } from "express";
export default async function Log(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("req.body", req.body);
  console.log("req.header", req.headers);
  next();
}
