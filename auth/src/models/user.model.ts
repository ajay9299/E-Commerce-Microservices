import { Model, Schema, model, Document } from "../database";
import bcrypt from "bcryptjs";

/** An interface that describes the properties that are required to create a new user. */
export interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/** An interface that describe the properties that a User Document has. */
export interface UserDoc extends Document {
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

/** An interface that describe the properties that a User Model has. */
export interface IUserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
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
  { timestamps: true, versionKey: false, toJSON: {transform(doc,ret){
    ret.userId = ret._id
    delete ret.password
  }} }
);

/**
 * @param attrs User basic details.
 * @return New instance of user model.
 * */
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

/**
 * @param candidatePassword login password.
 * @param userPassword user stored hash password.
 * @return true and false, If password match then return true otherwise false.
 * */
userSchema.statics.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/** This pre hook used to save the password in hash formate whenever save method calls. */
userSchema.pre("save", async function (next) {
  /** New password hashing. */
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = model<UserDoc, IUserModel>("User", userSchema);

export default User;
