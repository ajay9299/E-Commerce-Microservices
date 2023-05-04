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
  async getUserDetailByUserId(
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const userDetailsByUserId = await userRepository.getUserDetailByUserId(
      userId
    );
    return {
      success: true,
      status: 200,
      data: userDetailsByUserId,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return user detail based on userId.
   * */
  async getUserDetailOfLoggedInUser(
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const userDetailsByUserId =
      await userRepository.getUserDetailOfLoggedInUser(userId);
    return {
      success: true,
      status: 200,
      data: userDetailsByUserId,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return update user detail based on userId.
   * */
  async updateUserDetailByUserId(
    userId: Types.ObjectId,
    userDetails: any
  ): Promise<ControllerResponse> {
    const updatedUserDetails = await userRepository.updateUserDetailByUserId(
      userId,
      userDetails
    );
    return {
      success: true,
      status: 200,
      data: updatedUserDetails,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return deleted user detail based on userId.
   * */
  async deleteUserDetailByUserId(
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const updatedUserDetails = await userRepository.deleteUserDetailByUserId(
      userId
    );
    return {
      success: true,
      status: 200,
      data: updatedUserDetails,
    };
  }
}

export default new UserService();
