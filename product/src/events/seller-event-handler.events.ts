import uniqueValuesConstants from "../constants/unique-values.constants";
import { Types } from "../database";
import SellerModel from "../models/seller.model";

/** SellerEventHandler event class holds methods related to User model. */

class SellerEventHandler {
  /**
   * @param sellerInfo details of newly created seller.
   * @return void
   * */
  private async createSeller(sellerInfo: any): Promise<void> {
    try {
      const { sellerId, companyName, email, companyAddress } = sellerInfo;
      const newlySellerInstance = SellerModel.build({
        sellerId,
        email,
        companyName,
        companyAddress,
      });
      await newlySellerInstance.save();
    } catch (err) {
      console.log("error", err);
    }
  }

  /**
   * @param sellerInfo details of updates seller.
   * @return void
   * */
  private async updateSeller(sellerInfo: any): Promise<void> {
    try {
      const { sellerId, companyName, companyAddress } = sellerInfo;
      await SellerModel.findOneAndUpdate(
        { sellerId: new Types.ObjectId(sellerId) },
        {
          companyName,
          companyAddress,
        }
      );
    } catch (err) {
      console.log("error", err);
    }
  }
  /**
   * @param sellerInfo details of deleted seller.
   * @return void
   * */
  async deleteSeller(sellerInfo: any): Promise<void> {
    try {
      const { sellerId } = sellerInfo;
      await SellerModel.findOneAndDelete({
        SellerId: new Types.ObjectId(sellerId),
      });
    } catch (err) {
      console.log("error", err);
    }
  }
  /**
   * @param eventName event coming in queue.
   * @param data data coming in queue.
   * */
  async operation(eventName: any, data: any): Promise<void> {
    switch (eventName) {
      case uniqueValuesConstants.SELLER_CREATE_EVENT:
        this.createSeller(data);
        break;
      case uniqueValuesConstants.SELLER_DELETE_EVENT:
        this.deleteSeller(data);
        break;
      case uniqueValuesConstants.SELLER_UPDATE_EVENT:
        this.updateSeller(data);
        break;
      default:
        break;
    }
  }
}

export default new SellerEventHandler();
