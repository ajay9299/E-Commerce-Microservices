import { Types } from "../database";
/** Basic sellerInfo for express request object. */
export interface SellerInfo {
  sellerId: Types.ObjectId;
}

/** Define the sellerInfo in express global space. */
declare global {
  namespace Express {
    interface Request {
      sellerInfo?: SellerInfo;
    }
  }
}
