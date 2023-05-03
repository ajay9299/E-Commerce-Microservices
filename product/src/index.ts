import { log } from "console";
import morgan from "morgan";
import express, { Application, NextFunction, Request, Response } from "express";
import { incomingRequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { dbConnector } from "./database";
export { Request, Response, NextFunction };

const PORT = 3003;
const app: Application = express();

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for product service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for product service..." });
});

app.listen(PORT, async () => {
  dbConnector();
  log(
    "<==================Product server up on port====================>",
    PORT
  );
});
