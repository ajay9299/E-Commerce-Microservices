import { Model, Schema, model, Document } from "mongoose";

/** An interface that describes the properties that are required to create a new product. */
export interface ProductAttrs {
  name: string;
  description: string;
  images: [string];
}

/** An interface that describe the properties that a Product Model has. */
export interface ProductModel extends Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

/** An interface that describe the properties that a Product Document has. */
export interface ProductDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

/** Mongoose schema of product. */
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: null },
  },
  { timestamps: true, versionKey: false }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = model<ProductDoc, ProductModel>("Product", productSchema);

export default Product;