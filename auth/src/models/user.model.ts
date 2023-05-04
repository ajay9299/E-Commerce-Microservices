import { Model, Schema, model, Document } from "mongoose";

/** An interface that describes the properties that are required to create a new user. */
interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/** An interface that describe the properties that a User Model has. */
interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/** An interface that describe the properties that a User Document has. */
interface UserDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
}

/** Mongoose schema of user. */
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};


const User = model<UserDoc, UserModel>("User", userSchema);

export default User;
