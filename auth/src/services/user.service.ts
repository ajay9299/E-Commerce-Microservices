import { responseMessages, statusCodes, uniqueValues } from "../constants";
import { Types } from "../database";
import jwtTokenHelper from "../helpers/jwt-token.helper";
import { ControllerResponse } from "../helpers/response.helper";

import User, { UserAttrs } from "../models/user.model";
import userRepository from "../repository/user.repository";
/** User service class holds all methods related to User model. */
class UserService {
  private static instance: UserService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * @param userDetails content all required information to create new user.
   * @return newly created user.
   * */
  async createNewUser(userDetails: UserAttrs): Promise<ControllerResponse> {
    const newlyCreatedUser = await userRepository.createNewUser(userDetails);
    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_SIGNUP,
      data: newlyCreatedUser,
    };
  }

  /**
   * @param userDetails content all required information to login new user.
   * @return jwt token.
   * */
  async loginUser(
    email: string,
    password: string
  ): Promise<ControllerResponse> {
    /** Fetch the user details based on email address. */
    const isUserPresent = await userRepository.getUserDetailByEmail(email);

    /** Check password match with stored password or not. */
    if (
      !isUserPresent ||
      !(await User.correctPassword(password, isUserPresent.password))
    )
      return {
        success: uniqueValues.FALSE,
        status: statusCodes.UN_AUTHENTICATION,
        message: responseMessages.INVALID_LOGIN_DETAILS,
      };

    const newJwtToken = await jwtTokenHelper.jwtTokenGenerator({
      userId: isUserPresent._id,
    });

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_LOGIN,
      data: { newJwtToken },
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
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_GET_BY_USER_ID,
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
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_GET_OF_LOGGED_IN_USER,
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
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_UPDATED,
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
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_DELETED,
      data: updatedUserDetails,
    };
  }
}

export default UserService.getInstance();
