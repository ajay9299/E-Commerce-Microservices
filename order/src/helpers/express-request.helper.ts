import { Types } from "../database";
/** Basic userInfo for express request object. */
export interface UserInfo {
  userId?: Types.ObjectId;
  sellerId?: Types.ObjectId;
}

/** Define the userInfo in express global space. */
declare global {
  namespace Express {
    interface Request {
      userInfo?: UserInfo;
    }
  }
}
