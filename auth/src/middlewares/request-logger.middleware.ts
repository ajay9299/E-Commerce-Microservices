import { Request, Response, NextFunction } from "../index";

/** Incoming request logger middleware. */
export const incomingRequestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hitApi = `${req.method} ${req.url}`;
    console.log(hitApi, "\n|\nv\n|\nv\n|\nv");
    next();
  } catch (error) {
    next(error);
  }
};
