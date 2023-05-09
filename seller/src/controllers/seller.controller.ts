import { log } from "console";
import { Types } from "../database";
import { Request, Response, NextFunction } from "../index";
import sellerService from "../services/seller.service";

/** Seller controller class holds all methods related to Seller model. */
class SellerController {
  private static instance: SellerController;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): SellerController {
    if (!SellerController.instance) {
      SellerController.instance = new SellerController();
    }
    return SellerController.instance;
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return newly created seller.
   * */
  async createNewSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const newSellerDetails = req.body;
    const responseOfService = await sellerService.createNewSeller(
      newSellerDetails
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
   * @return jwt token.
   * */
  async loginSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { email, password } = req.body;
    const responseOfService = await sellerService.loginSeller(email, password);
    if (responseOfService.success === false)
      return res.status(responseOfService.status).json({
        errors: responseOfService.errors,
        message: responseOfService.message,
      });
    return res
      .status(responseOfService.status)
      .json({ data: responseOfService.data });
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailBySellerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const sellerId = new Types.ObjectId(req.params.sellerId);
    const responseOfService = await sellerService.getSellerDetailBySellerId(
      sellerId
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
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailOfLoggedInSeller(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** sellerId of loggedIn seller. */
    const sellerId = req.sellerInfo?.sellerId;

    const responseOfService =
      await sellerService.getSellerDetailOfLoggedInSeller(sellerId!);
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
   * @return update seller detail based on sellerId.
   * */
  async updateSellerDetailBySellerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** sellerId of loggedIn seller. */
    const sellerId = req.sellerInfo!.sellerId;
    const sellerDetailsForUpdating = req.body;

    const responseOfService = await sellerService.updateSellerDetailBySellerId(
      sellerId,
      sellerDetailsForUpdating
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
   * @return deleted seller detail based on sellerId.
   * */
  public async deleteSellerDetailBySellerId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** sellerId of loggedIn seller. */
    const sellerId = new Types.ObjectId(req.sellerInfo!.sellerId);

    const responseOfService = await sellerService.deleteSellerDetailBySellerId(
      sellerId
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

export default SellerController.getInstance();
