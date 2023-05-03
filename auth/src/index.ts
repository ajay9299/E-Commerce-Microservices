import { log } from "console";
import morgan from "morgan";
import express, { Application, NextFunction, Request, Response } from "express";
import { incomingRequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { dbConnector } from "./database";
import { UserModel } from "./models";
export { Request, Response, NextFunction };

const PORT = 3001;
const app: Application = express();

/** Body parse middleware. */
app.use(express.json());

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for auth service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for auth service..." });
});

app.post(
  "/newUser",
  async (req: Request, res: Response, next: NextFunction) => {
    log("This is user info", req.body);
    const newUser = UserModel.build(req.body);
    const userInfo = await newUser.save();
    return res.status(200).json({ ok: "ok", userInfo });
  }
);

app.listen(PORT, async () => {
  dbConnector();
  log("<>==================Auth server up on port====================<>", PORT);
});
