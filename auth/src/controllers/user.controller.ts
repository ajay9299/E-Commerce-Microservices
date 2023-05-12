import { Types } from "../database";
import { Request, Response, NextFunction } from "../index";
import userService from "../services/user.service";

/** User controller class holds all methods related to User model. */
class UserController {
  private static instance: UserController;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

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
   * @return jwt token.
   * */
  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { email, password } = req.body;
    const { success, status, data, errors, message } =
      await userService.loginUser(email, password);
    if (success === false)
      return res.status(status).json({
        errors,
        message,
      });
    return res.status(status).json(data);
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
    const { success, status, data, errors, message } =
      await userService.getUserDetailByUserId(userId);
    if (success === false) return res.status(status).json({ errors: errors });

    return res.status(status).json(data);
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

    const userId = req.userInfo?.userId;

    const responseOfService = await userService.getUserDetailOfLoggedInUser(
      userId!
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
    const userId = req.userInfo!.userId;
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
  public async deleteUserDetailByUserId(
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

export default UserController.getInstance();
