import { NextFunction, Request, Response } from "../index";
import Joi from "joi";
import JoiErrorHandler from "./joi-function.validation";

class UserValidation {
  private static instance: UserValidation;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): UserValidation {
    if (!UserValidation.instance) {
      UserValidation.instance = new UserValidation();
    }
    return UserValidation.instance;
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * */
  public signupValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    /**
     * Signup schema with all required fields to create a user.
     * */

    const createProductValidationSchema = Joi.object({
      name: Joi.string().required(),
      discription: Joi.string().required(),
      images: Joi.array().items(Joi.string()),
      avlQuantity: Joi.number(),
      category: Joi.string(),
      unitPrice: Joi.string().required(),
    });

    /** If request body not validate with upper schema. */
    const isValid: any = createProductValidationSchema.validate(req.body);
    if (isValid.error) {
      return JoiErrorHandler.validatorErrorMessage(isValid, res);
    }
    next();
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * */
  public loginValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    /**
     * Login schema with all required fields for login.
     * */
    const loginValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    /** If request body not validate with upper schema. */
    const isValid: any = loginValidationSchema.validate(req.body);
    if (isValid.error) {
      return JoiErrorHandler.validatorErrorMessage(isValid, res);
    }
    next();
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * */
  public updateValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    /**
     * Update schema with all required fields for update user details.
     * */
    const updateValidationSchema = Joi.object({
      firstName: Joi.string().optional().allow(null),
      middleName: Joi.string().optional().allow(null),
      lastName: Joi.string().optional().allow(null),
    });

    /** If request body not validate with upper schema. */
    const isValid: any = updateValidationSchema.validate(req.body);
    if (isValid.error) {
      return JoiErrorHandler.validatorErrorMessage(isValid, res);
    }
    next();
  }
}

export default UserValidation.getInstance();
