import { log } from "console";
import { Types } from "../database";
import { Request, Response, NextFunction } from "../index";
import cartService from "../services/cart.service";

/** Cart controller class holds all methods related to cart model. */
class CartController {
  private static instance: CartController;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): CartController {
    if (!CartController.instance) {
      CartController.instance = new CartController();
    }
    return CartController.instance;
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return newly created Cart.
   * */
  async addToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const productDetails = req.body;
    const userId = req.userInfo?.userId;
    const { status, data, message, errors, success } =
      await cartService.addToCart(productDetails, userId!);
    if (success === false) return res.status(status).json({ errors: errors });
    return res.status(status).json(data);
  }

  // /**
  //  * @param req express request object.
  //  * @param res express response object.
  //  * @param next express next function.
  //  * @return Cart detail based on CartId.
  //  * */
  // async getCartDetailByCartId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {
  //   const CartId = new Types.ObjectId(req.params.CartId);
  //   const responseOfService = await CartService.getCartDetailByCartId(CartId);
  //   if (responseOfService.success === false)
  //     return res
  //       .status(responseOfService.status)
  //       .json({ errors: responseOfService.errors });
  //   return res
  //     .status(responseOfService.status)
  //     .json({ data: responseOfService.data });
  // }

  // /**
  //  * @param req express request object.
  //  * @param res express response object.
  //  * @param next express next function.
  //  * @return Cart detail based on CartId.
  //  * */
  async getCartDetailOfLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    /** userId of loggedIn user*/
    const userId = req.userInfo?.userId;

    console.log("userId", userId);
    const { status, data, message, errors, success } =
      await cartService.getCartDetailOfLoggedUserByUserId(userId!);
    if (success === false) return res.status(status).json({ errors: errors });
    return res.status(status).json({ data, message });
  }

  // /**
  //  * @param req express request object.
  //  * @param res express response object.
  //  * @param next express next function.
  //  * @return update Cart detail based on CartId.
  //  * */
  // async updateCartDetailByCartId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {
  //   /** CartId of loggedIn Cart. */
  //   const CartId = req.CartInfo!.CartId;
  //   const CartDetailsForUpdating = req.body;

  //   const responseOfService = await CartService.updateCartDetailByCartId(
  //     CartId,
  //     CartDetailsForUpdating
  //   );
  //   if (responseOfService.success === false)
  //     return res
  //       .status(responseOfService.status)
  //       .json({ errors: responseOfService.errors });
  //   return res
  //     .status(responseOfService.status)
  //     .json({ data: responseOfService.data });
  // }

  // /**
  //  * @param req express request object.
  //  * @param res express response object.
  //  * @param next express next function.
  //  * @return deleted Cart detail based on CartId.
  //  * */
  // public async deleteCartDetailByCartId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {
  //   /** CartId of loggedIn Cart. */
  //   const CartId = new Types.ObjectId(req.CartInfo!.CartId);

  //   const responseOfService = await CartService.deleteCartDetailByCartId(
  //     CartId
  //   );
  //   if (responseOfService.success === false)
  //     return res
  //       .status(responseOfService.status)
  //       .json({ errors: responseOfService.errors });
  //   return res
  //     .status(responseOfService.status)
  //     .json({ data: responseOfService.data });
  // }
}

export default CartController.getInstance();
