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
    const newlyUserInstance = UserModel.build(userDetails);
    const newlyCreatedUserDetails = await newlyUserInstance.save();
    return newlyCreatedUserDetails;
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return user detail based on userId.
   * */
  async getUserDetailByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
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

export default new UserRepository();
