import { Model, Schema, model, Document } from "../database";
import bycrpt from "bcryptjs";

/** An interface that describes the properties that are required to create a new user. */
export interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}


/** An interface that describe the properties that a User Model has. */
export interface IUserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

/** An interface that describe the properties that a User Document has. */
export interface UserDoc extends Document {
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

userSchema.pre("save", async function (next) {
  /** New password hashing. */
  this.password = await bycrpt.hash(this.password, 12);
  next();
});

const User = model<UserDoc, IUserModel>("User", userSchema);

export default User;
