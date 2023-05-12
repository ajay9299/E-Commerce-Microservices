import { responseMessages, statusCodes, uniqueValues } from "../constants";
import { Request, Response, NextFunction } from "../index";
import Jwt from "../helpers/jwt-token.helper";
import { UserInfo } from "../helpers/express-request.helper";
import { log } from "console";
import { userInfo } from "os";

/**
 * @param req express request object.
 * @param res express request object.
 * @param next express next function.
 * */
export const jwtAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  /** Fetch the jwt token from headers. */
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.split(" ").length !== uniqueValues.TWO)
    res.status(statusCodes.BAD_REQUEST).json({
      errors: responseMessages.INVALID_TOKEN,
    });

  /** Separate token from authHeader */
  const jwtToken: string = authHeader!.split(" ")[uniqueValues.ONE];
  const userData = (await Jwt.jwtDecoder(jwtToken)) as UserInfo;

  log("payload", userData);
  req.userInfo = userData;
  next();
};
