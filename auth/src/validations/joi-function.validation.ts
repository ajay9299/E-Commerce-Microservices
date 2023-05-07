import { statusCodes } from "../constants";
import { Response } from "../index";

/** JoiErrorHandler is class content a method that is used to send the
 * response to the client whenever client send invalid body. */
class JoiErrorHandler {
  private static instance: JoiErrorHandler;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): JoiErrorHandler {
    if (!JoiErrorHandler.instance) {
      JoiErrorHandler.instance = new JoiErrorHandler();
    }
    return JoiErrorHandler.instance;
  }

  /**
   * @param isValid isValid is the error response of joi validate function.
   * @res express response object.
   * @return bad request response to the client.
   * */
  public validatorErrorMessage = (isValid: any, res: Response): Response => {
    return res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      status: statusCodes.BAD_REQUEST,
      error: isValid.error.details[0].message,
    });
  };
}

export default JoiErrorHandler.getInstance();
