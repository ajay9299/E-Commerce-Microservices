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

/** This route handle available routes inside the product service. */
app.use("/v1", productServiceRoutes);

app.listen(PORT, async () => {
  dbConnector();
  log(
    "<==================Product server up on port====================>",
    PORT
  );
});

export { Request, Response, NextFunction, Router };
