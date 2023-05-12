import { Types } from "../database";
import { CartModel } from "../model";
import { CartAttribute, CartDoc } from "../model/cart.model";

/** Cart repository class holds all methods related to Cart model. */
class CartRepository {
  /**
   * @param CartDetails content all required information to create new Cart.
   * @return newly created Cart.
   * */
  async crateNewCart(CartDetails: CartAttribute): Promise<CartDoc> {
    const newlyCartInstance = CartModel.build(CartDetails);
    const newlyCreatedCartDetails = await newlyCartInstance.save();
    return newlyCreatedCartDetails;
  }

  /**
   * @param userId loggedIn user's userId.
   * @return Cart detail based on userId.
   * */
  async getCartDetailOfLoggedInUser(
    userId: Types.ObjectId
  ): Promise<CartDoc | null> {
    return await CartModel.findOne(userId);
  }

  /**
   * @param userId loggedIn user's userId.
   * @return update Cart detail based on userId.
   * */
  async updateCartDetailByUserId(
    userId: Types.ObjectId,
    cartInfo: any
  ): Promise<CartDoc | null> {
    return await CartModel.findOneAndUpdate({ userId }, cartInfo, {
      new: true,
    });
  }
}

export default new CartRepository();
