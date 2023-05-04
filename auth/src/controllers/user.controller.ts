import { Types } from "../database";
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
  ): Promise<Response> {
    const userId = new Types.ObjectId(req.params.userId);
    const responseOfService = await userService.getUserDetailByUserId(userId);
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
  async getUserDetailOfLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** userId of loggedIn user. */

    const userId = new Types.ObjectId(req.userInfo!.userId);

    const responseOfService = await userService.getUserDetailOfLoggedInUser(
      userId
    );
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
   * @return update user detail based on userId.
   * */
  async updateUserDetailByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** userId of loggedIn user. */
    const userId = new Types.ObjectId(req.userInfo!.userId);
    const userDetailsForUpdating = req.body;

    const responseOfService = await userService.updateUserDetailByUserId(
      userId,
      userDetailsForUpdating
    );
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
   * @return deleted user detail based on userId.
   * */
  async deleteUserDetailByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** userId of loggedIn user. */
    const userId = new Types.ObjectId(req.userInfo!.userId);

    const responseOfService = await userService.deleteUserDetailByUserId(
      userId
    );
    if (responseOfService.success === false)
      return res
        .status(responseOfService.status)
        .json({ errors: responseOfService.errors });
    return res
      .status(responseOfService.status)
      .json({ data: responseOfService.data });
  }
}

export default new UserController();
