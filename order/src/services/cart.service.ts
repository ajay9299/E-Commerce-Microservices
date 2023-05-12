import { responseMessages, statusCodes, uniqueValues } from "../constants";
import { Types } from "../database";
import { ControllerResponse } from "../helpers/response.helper copy";
import { CartAttribute } from "../model/cart.model";
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
    cartDetails: CartAttribute,
    userId: Types.ObjectId
  ): Promise<ControllerResponse> {
    const isCartPresentForUser =
      await cartRepository.getCartDetailOfLoggedInUser(userId);

    /**If user cart not present in db */ 
    if (!isCartPresentForUser) {
      await cartRepository.crateNewCart(cartDetails);
    }
    

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_SIGNUP,
      data: newlyCreatedCart,
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
      await cartRepository.getCartDetailOfLoggedInUser(userId);
    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_GET_OF_LOGGED_IN_Cart,
      data: cartDetailsByUserId,
    };
  }

  /**
   * @param userId userId of logged in user.
   * @return update Cart detail based on userId.
   * */
  async updateCartDetailByUserId(
    userId: Types.ObjectId,
    CartDetails: any
  ): Promise<ControllerResponse> {
    const updatedCartDetails = await cartRepository.updateCartDetailByUserId(
      userId,
      CartDetails
    );

    return {
      success: uniqueValues.TRUE,
      status: statusCodes.SUCCESS,
      message: responseMessages.SUCCESSFULLY_PROFILE_UPDATED,
      data: updatedCartDetails,
    };
  }
}

export default CartService.getInstance();
