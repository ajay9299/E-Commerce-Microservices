import { model, Model, Schema, Types } from "../database";
import { BasicProductDetails } from "./product.model";

export interface CartItem {
  product: BasicProductDetails;
  quantity: number;
}

export interface CartAttribute {
  items: CartItem[];
  totalPrice: number;
  user: Types.ObjectId;
}

export interface CartDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartModel extends Model<CartDoc> {
  build(attributes: CartAttribute): CartDoc;
}

const cartSchema = new Schema(
  {
    items: { type: Types.ObjectId, ref: "CartItem", default: [] },
    totalPrice: { type: Number },
    user: { type: Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);

const Cart = model<CartDoc, ICartModel>("Cart", cartSchema);

cartSchema.statics.build = (attributes: CartAttribute) => {
  return new Cart(attributes);
};

export default Cart;
