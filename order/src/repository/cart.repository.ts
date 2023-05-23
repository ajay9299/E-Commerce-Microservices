import { Types } from "../database";
import { CartModel } from "../model";
import { CartDoc, CartItem } from "../model/cart.model";

/** Cart repository class holds all methods related to Cart model. */
class CartRepository {
  /**
   * @param productDetails content all required information to create new Cart.
   * @return newly created Cart.
   * */
  async crateNewCart(
    productDetails: CartItem,
    userId: Types.ObjectId
  ): Promise<CartDoc> {
    const newlyCartInstance = CartModel.build({
      items: [productDetails],
      userId,
    });
    return await newlyCartInstance.save();
  }

  /**
   * @param userId loggedIn user's userId.
   * @return Cart detail based on userId.
   * */
  async getCartDetailOfLoggedInUser(
    userId: Types.ObjectId
  ): Promise<CartDoc | null> {
    return await CartModel.findOne({ userId });
  }

  /**
   * @param userId loggedIn user's userId.
   * @return Cart detail based on userId.
   * */
  async getCompleteCartDetailOfLoggedInUser(
    userId: Types.ObjectId
  ): Promise<CartDoc[] | null> {
    return await CartModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "productId",
          as: "productInfo",
          pipeline: [
            {
              $project: {
                name: 1,
                description: 1,
                unitPrice: 1,
                images: 1,
                productQuantity: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          productInfo: 1,
        },
      },
      {
        $addFields: {
          totalPrice: {
            $sum: {
              $map: {
                input: "$productInfo",
                as: "item",
                in: {
                  $toDouble: "$$item.unitPrice",
                },
              },
            },
          },
          totalItems: {
            $size: "$productInfo",
          },
        },
      },
    ]);
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
