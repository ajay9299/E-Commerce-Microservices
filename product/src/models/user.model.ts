import { Model, Schema, model, Document, Types } from "mongoose";

/** An interface that describes the properties that are required to create a new user. */
export interface UserAttrs {
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
}

/** An interface that describe the properties that a User Document has. */
export interface UserDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

/** An interface that describe the properties that a User Model has. */
export interface IUserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/** Mongoose schema of user. */
const userSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * @param attrs User basic details.
 * @return New instance of user model.
 * */
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, IUserModel>("User", userSchema);

export default User;
