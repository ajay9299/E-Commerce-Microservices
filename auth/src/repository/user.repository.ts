import { Types } from "../database";
import { Request, Response, NextFunction } from "../index";
import { UserModel } from "../models";
import { UserAttrs, UserDoc } from "../models/user.model";
/** User repository class holds all methods related to User model. */
class UserRepository {
  /**
   * @param userDetails content all required information to create new user.
   * @return newly created user.
   * */
  async createNewUser(userDetails: UserAttrs): Promise<UserDoc> {
    return await UserModel.build(userDetails).save();
  }

  /**
   * @param userId user's userId.
   * @return user detail based on userId.
   * */
  async getUserDetailByUserId(userId: Types.ObjectId): Promise<UserDoc | null> {
    return await UserModel.findById(userId);
  }

  /**
   * @param userId loggedIn user's userId.
   * @return user detail based on userId.
   * */
  async getUserDetailOfLoggedInUser(
    userId: Types.ObjectId
  ): Promise<UserDoc | null> {
    return await UserModel.findById(userId);
  }

  /**
   * @param email loggedIn user's email.
   * @return user detail based on email.
   * */
  async getUserDetailByEmail(email: string): Promise<UserDoc | null> {
    return await UserModel.findOne({ email });
  }

  /**
   * @param userId loggedIn user's userId.
   * @return update user detail based on userId.
   * */
  async updateUserDetailByUserId(
    userId: Types.ObjectId,
    userInfo: any
  ): Promise<UserDoc | null> {
    return await UserModel.findByIdAndUpdate({ _id: userId }, userInfo, {
      new: true,
    });
  }

  /**
   * @param userId loggedIn user's userId.
   * @return deleted user detail based on userId.
   * */
  async deleteUserDetailByUserId(
    userId: Types.ObjectId
  ): Promise<UserDoc | null> {
    return await UserModel.findByIdAndDelete({ _id: userId });
  }
}

export default new UserRepository();
