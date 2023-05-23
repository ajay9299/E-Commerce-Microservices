import { log } from "console";
import { responseMessages, statusCodes, uniqueValues } from "../constants";
import { Types } from "../database";
import { ControllerResponse } from "../helpers/response.helper copy";
import { CartAttribute, CartItem } from "../model/cart.model";
import cartRepository from "../repository/cart.repository";
/** Cart service class holds all methods related to Cart model. */
class CartService {
  private static instance: CartService;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The Singleton class defines the `getInstance` method that lets clients access
   * the unique singleton instance.
   */
  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  /**
   * @param cartDetails content all required information to create new Cart.
   * @return newly created Cart.
   * */
  async addToCart(
    productDetails: CartItem,
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    let isCartPresentForUser;
    isCartPresentForUser = await cartRepository.getCartDetailOfLoggedInUser(
      userId
    );

    log("isCartPresentForUser", isCartPresentForUser);

    /**If user cart not present in db */
    if (!isCartPresentForUser) {
      isCartPresentForUser = await cartRepository.crateNewCart(
        productDetails,
        userId
      );
    } else {
      isCartPresentForUser.items.push(productDetails);
      cartRepository.updateCartDetailByUserId(userId, isCartPresentForUser);
    }

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.PRODUCT_ADD_TO_CART_SUCCESSFULLY,
      data: isCartPresentForUser,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return Cart detail based on userId.
   * */
  async getCartDetailOfLoggedUserByUserId(
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const cartDetailsByUserId =
      await cartRepository.getCompleteCartDetailOfLoggedInUser(userId);
    log("cartDetailsByUserId", cartDetailsByUserId);
    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.USER_CART_DETAILS_FETCHED_SUCCESSFULLY,
      data: cartDetailsByUserId ? cartDetailsByUserId[0] : null,
    };
  }

  // /**
  //  * @param userId userId of logged in user.
  //  * @return update Cart detail based on userId.
  //  * */
  // async updateCartDetailByUserId(
  //   userId: Types.ObjectId,
  //   CartDetails: any
  // ): Promise<ControllerResponse> {
  //   const updatedCartDetails = await cartRepository.updateCartDetailByUserId(
  //     userId,
  //     CartDetails
  //   );

  //   return {
  //     success: uniqueValues.TRUE,
  //     status: statusCodes.SUCCESS,
  //     message: responseMessages.SUCCESSFULLY_PROFILE_UPDATED,
  //     data: updatedCartDetails,
  //   };
  // }
}

export default CartService.getInstance();
