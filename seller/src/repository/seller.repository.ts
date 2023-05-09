import { Types } from "../database";
import { SellerModel } from "../models";
import { SellerAttrs, SellerDoc } from "../models/seller.model";
/** Seller repository class holds all methods related to Seller model. */
class SellerRepository {
  /**
   * @param SellerDetails content all required information to create new Seller.
   * @return newly created Seller.
   * */
  async createNewSeller(SellerDetails: SellerAttrs): Promise<SellerDoc> {
    const newlySellerInstance = SellerModel.build(SellerDetails);
    const newlyCreatedSellerDetails = await newlySellerInstance.save();
    return newlyCreatedSellerDetails;
  }

  /**
   * @param sellerId Seller's sellerId.
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailBySellerId(
    sellerId: Types.ObjectId
  ): Promise<SellerDoc | null> {
    return await SellerModel.findById({ _id: sellerId });
  }

  /**
   * @param sellerId loggedIn Seller's sellerId.
   * @return seller detail based on sellerId.
   * */
  async getSellerDetailOfLoggedInSeller(
    sellerId: Types.ObjectId
  ): Promise<SellerDoc | null> {
    return await SellerModel.findById(sellerId);
  }

  /**
   * @param email loggedIn seller's email.
   * @return seller detail based on email.
   * */
  async getSellerDetailByEmail(email: string): Promise<SellerDoc | null> {
    return await SellerModel.findOne({ email });
  }

  /**
   * @param sellerId loggedIn seller's SellerId.
   * @return update seller detail based on sellerId.
   * */
  async updateSellerDetailBySellerId(
    sellerId: Types.ObjectId,
    sellerInfo: any
  ): Promise<SellerDoc | null> {
    return await SellerModel.findByIdAndUpdate({ _id: sellerId }, sellerInfo, {
      new: true,
    });
  }

  /**
   * @param sellerId loggedIn seller's sellerId.
   * @return deleted seller detail based on sellerId.
   * */
  async deleteSellerDetailBySellerId(
    sellerId: Types.ObjectId
  ): Promise<SellerDoc | null> {
    return await SellerModel.findByIdAndDelete({ _id: sellerId });
  }
}

export default new SellerRepository();
