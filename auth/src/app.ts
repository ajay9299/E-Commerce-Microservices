import { log } from "console";
import morgan from "morgan";
import express, { Application, Request, Response } from "express";
import { incomingRequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import authServiceRoutes from "./routes";
import "./helpers/express-request.helper";
import cors from "cors";

const app: Application = express();

/** Body parse middleware. */
app.use(express.json());

/** Outgoing request logger middleware. */
app.use(morgan("dev"));
/** Incoming request logger middleware. */
app.use(incomingRequestLoggerMiddleware);
app.use(cors({ origin: "*" }));
app.get("/v1/test/auth", (req: Request, res: Response) => {
  log("This is test route for auth service...");
  res
    .status(200)
    .json({ ok: "ok", message: "This is test route for auth service..." });
});

app.post("/love", (req: Request, res: Response) => {
  new Promise((resolve, rej) => {
    setTimeout(() => {
      resolve(res.status(200).json({ ok: "ok" }));
    }, 5000);
  });
});

/** This route handle available routes inside the auth service. */
app.use("/v1", authServiceRoutes);

export default app;
