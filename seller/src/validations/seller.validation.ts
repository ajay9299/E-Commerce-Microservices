import { NextFunction, Request, Response } from "../index";
import Joi from "joi";
import JoiErrorHandler from "./joi-function.validation";

class SellerValidation {
  private static instance: SellerValidation;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): SellerValidation {
    if (!SellerValidation.instance) {
      SellerValidation.instance = new SellerValidation();
    }
    return SellerValidation.instance;
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
    const signupValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      companyName: Joi.string().required(),
      companyAddress: Joi.string().required(),
      password: Joi.string().required(),
    });

    /** If request body not validate with upper schema. */
    const isValid: any = signupValidationSchema.validate(req.body);
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
      companyName: Joi.string().optional().allow(null),
      companyAddress: Joi.string().optional().allow(null),
    });

    /** If request body not validate with upper schema. */
    const isValid: any = updateValidationSchema.validate(req.body);
    if (isValid.error) {
      return JoiErrorHandler.validatorErrorMessage(isValid, res);
    }
    next();
  }
}

export default SellerValidation.getInstance();
