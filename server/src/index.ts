import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mainRouter from "./routes";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();


const app: Express = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/v1", mainRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
