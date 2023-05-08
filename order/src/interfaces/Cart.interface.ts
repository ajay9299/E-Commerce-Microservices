import {  model, Model, Schema } from "mongoose";
import { BasicProductDetails } from "../model/basicProductDetails";
import { BasicUserDetails } from "../model/basicUserDetails";

export class CartItem {
  product!: BasicProductDetails;
  quantity!: number;
}

export interface CartAttribute {
  items: CartItem[];
  totalPrice: number;
  user: BasicUserDetails;
}

export interface CartDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartModel extends Model<CartDoc>{
    build(attributes:CartAttribute) : CartDoc;
}

const cartSchema = new Schema(
  {
    items: { type: [CartItem], default: [] },
    totalPrice: { type: Number },
    user: { type: BasicUserDetails },
  },
  { timestamps: true, versionKey: false }
);

const Cart = model<CartDoc, ICartModel>("Cart", cartSchema);

cartSchema.statics.build = (attributes: CartAttribute)=>{
    return new Cart(attributes);
}

export default Cart;