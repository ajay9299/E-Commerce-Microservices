import { Types } from "../database";
import { ControllerResponse } from "../helpers/response.helper";
import { Request, Response, NextFunction } from "../index";
import { UserModel } from "../models";

import User, { UserAttrs, UserDoc } from "../models/user.model";
import userRepository from "../repository/user.repository";
/** User service class holds all methods related to User model. */
class UserService {
  /**
   * @param userDetails content all required information to create new user.
   * @return newly created user.
   * */
  async createNewUser(userDetails: UserAttrs): Promise<ControllerResponse> {
    const newlyCreatedUser = await userRepository.createNewUser(userDetails);
    return {
      success: true,
      status: 200,
      data: newlyCreatedUser,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return user detail based on userId.
   * */
  async getUserDetailByUserId(userId: Types.ObjectId): Promise<UserDoc | null> {
    return await UserModel.findById({ _id: userId });
  }

  /**
   * @param userId userId of logged in user.
   * @return user detail based on userId.
   * */
  async getUserDetailOfLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return update user detail based on userId.
   * */
  async updateUserDetailByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return deleted user detail based on userId.
   * */
  async deleteUserDetailByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}
}

export default new UserService();
