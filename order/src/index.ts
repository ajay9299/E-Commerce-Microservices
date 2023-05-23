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
import cors from "cors";
import orderRoutes from "./routes";

const PORT = 3002;
const app: Application = express();

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for order service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for order service..." });
});

app.use("/v1", orderRoutes);

app.listen(PORT, async () => {
  dbConnector();
  consumeMessages();
  log(
    "<>==================Order server up on port====================<>",
    PORT
  );
});

export { Request, Response, NextFunction, Router };
