import { model, Model, Schema, Types, Document } from "../database";

export interface CartItem {
  productId: Types.ObjectId;
  productQuantity: string;
}

export interface CartAttribute {
  items: [CartItem];
  userId: Types.ObjectId;
}

export interface CartDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
  items: [CartItem];
  userId: Types.ObjectId;
}

export interface ICartModel extends Model<CartDoc> {
  build(attributes: CartAttribute): CartDoc;
}

const cartSchema = new Schema(
  {
    items: {
      type: [
        {
          productId: { type: Types.ObjectId },
          productQuantity: { type: String },
          _id: false,
        },
      ],
    },
    userId: { type: Types.ObjectId, required: true, ref: "User", unique: true },
  },
  { timestamps: true, versionKey: false }
);

cartSchema.statics.build = (attributes: CartAttribute) => {
  return new Cart(attributes);
};
const Cart = model<CartDoc, ICartModel>("Cart", cartSchema);

export default Cart;
