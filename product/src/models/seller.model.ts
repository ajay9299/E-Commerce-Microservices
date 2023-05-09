import { Schema, model, Document, Model, Types } from "../database";

/** An interface that describes the properties that are required to create a new user. */
export interface SellerAttrs {
  email: string;
  sellerId: Types.ObjectId;
  companyName: string;
  companyAddress: string;
}

/** An interface that describe the properties that a Seller Document has. */
export interface SellerDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

/** An interface that describe the properties that a Seller Model has. */
export interface ISellerModel extends Model<SellerDoc> {
  build(attrs: SellerAttrs): SellerDoc;
  correctPassword(
    candidatePassword: string,
    SellerPassword: string
  ): Promise<boolean>;
}

/** Mongoose schema of Seller. */
const sellerSchema = new Schema(
  {
    sellerId: { type: Types.ObjectId, required: true },
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * @param attrs Seller basic details.
 * @return New instance of Seller model.
 * */
sellerSchema.statics.build = (attrs: SellerAttrs) => {
  return new Seller(attrs);
};

const Seller = model<SellerDoc, ISellerModel>("Seller", sellerSchema);

export default Seller;
