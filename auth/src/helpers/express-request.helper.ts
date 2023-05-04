import { Types } from "../database";
/** Basic userInfo for express request object. */
interface UserInfo {
  userId: Types.ObjectId;
  email: string;
}

/** Define the userInfo in express global space. */
declare global {
  namespace Express {
    interface Request {
      userInfo?: UserInfo;
    }
  }
}
