import { log } from "console";
import { NextFunction, Request, Response, Router } from "express";
import "./helpers/express-request.helper";
import { dbConnector } from "./database";
import { consumeMessages } from "./queues/queue-consumer";
import app from "./app";
const PORT = 3001;

app?.listen(PORT, async () => {
  /** Connect to database*/
  dbConnector();
  /** Consume queue messages. */
  // consumeMessages();
  log("<>==================Auth server up on port====================<>", PORT);
});

export { Request, Response, NextFunction, Router };
