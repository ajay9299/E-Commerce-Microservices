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
import productServiceRoutes from "./routes";
import { consumeMessages } from "./queues/queue-consumer";
import cors from 'cors'
const PORT = 3003;
const app: Application = express();

/** Body parse middleware. */
app.use(express.json());
/** Outgoing request logger middleware. */
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);

app.get("/test", (req: Request, res: Response) => {
  log("This is test route for product service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for product service..." });
});

/** This route handle available routes inside the product service. */
app.use("/v1", productServiceRoutes);

app.listen(PORT, async () => {
  dbConnector(); /** Consume queue messages. */
  consumeMessages();
  log(
    "<==================Product server up on port====================>",
    PORT
  );
});

export { Request, Response, NextFunction, Router };
