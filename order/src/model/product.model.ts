import { Types } from "mongoose";

export interface BasicProductDetails {
  productId: Types.ObjectId;
  productName: string;
  productPrice: string;
  avlQuantity: number;
}
