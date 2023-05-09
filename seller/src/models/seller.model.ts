import { Model, Schema, model, Document } from "../database";
import bcrypt from "bcryptjs";

/** An interface that describes the properties that are required to create a new user. */
export interface SellerAttrs {
  email: string;
  companyName: string;
  companyAddress: string;
  password: string;
}

/** An interface that describe the properties that a Seller Document has. */
export interface SellerDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
  password: string;
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
    email: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    companyAddress: { type: String, default: null },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret: any) {
        ret.sellerId = ret._id;
        delete ret.password;
      },
    },
  }
);

/**
 * @param attrs Seller basic details.
 * @return New instance of Seller model.
 * */
sellerSchema.statics.build = (attrs: SellerAttrs) => {
  return new Seller(attrs);
};

/**
 * @param candidatePassword login password.
 * @param SellerPassword Seller stored hash password.
 * @return true and false, If password match then return true otherwise false.
 * */
sellerSchema.statics.correctPassword = async function (
  candidatePassword: string,
  sellerPassword: string
) {
  return await bcrypt.compare(candidatePassword, sellerPassword);
};

/** This pre hook used to save the password in hash formate whenever save method calls. */
sellerSchema.pre("save", async function (next) {
  /** New password hashing. */
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Seller = model<SellerDoc, ISellerModel>("Seller", sellerSchema);

export default Seller;
