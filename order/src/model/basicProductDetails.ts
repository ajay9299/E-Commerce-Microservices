import { Types } from "mongoose";

export class BasicProductDetails {
    productId !: Types.ObjectId;
    productName !: string;
    productPrice !: string ;
    avlQuantity !: number;
}