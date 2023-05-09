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
import sellerServiceRoutes from "./routes";
import "./helpers/express-request.helper";
import { dbConnector } from "./database";
import { consumeMessages } from "./queues/queue-consumer";

const PORT = 3004;
const app: Application = express();

/** Body parse middleware. */
app.use(express.json());

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for seller service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for seller service..." });
});

/** This route handle available routes inside the seller service. */
app.use("/v1", sellerServiceRoutes);

app.listen(PORT, async () => {
  /** Connect to database*/
  dbConnector();
  /** Consume queue messages. */
  consumeMessages();
  log("<>==================Seller server up on port====================<>", PORT);
});

export { Request, Response, NextFunction, Router };
