import { Request, Response, NextFunction } from "../index";
import userService from "../services/user.service";
/** User controller class holds all methods related to User model. */
class UserController {
  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return newly created user.
   * */
  async createNewUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const newUserDetails = req.body;
    const responseOfService = await userService.createNewUser(newUserDetails);
    if (responseOfService.success === false)
      return res
        .status(responseOfService.status)
        .json({ errors: responseOfService.errors });
    return res
      .status(responseOfService.status)
      .json({ data: responseOfService.data });
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

export default new UserController();