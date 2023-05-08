import { log } from "console";
import morgan from "morgan";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { incomingRequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { dbConnector } from "./database";
import { consumeMessages } from "./queues/queue-consumer";

const PORT = 3002;
const app: Application = express();

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for order service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for order service..." });
});

app.get("/health", (req: Request, res: Response) => {
  log("This is health route from order service....");
  res.status(200).json({ ok: "Health is good...." });
});

app.listen(PORT, async () => {
  dbConnector();
  consumeMessages();
  log(
    "<>==================Order server up on port====================<>",
    PORT
  );
});

export { Request, Response, NextFunction, Router };
