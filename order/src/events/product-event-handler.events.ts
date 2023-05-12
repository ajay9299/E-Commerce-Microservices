import uniqueValuesConstants from "../constants/unique-values.constants";
import { Types } from "../database";
import { ProductModel } from "../model";

/**
 * Below ProductEventHandler class based on Facade design pattern.
 * */

/** ProductEventHandler event class holds methods related to Product model. */
class ProductEventHandler {
  private async createProduct(productInfo: any): Promise<void> {
    try {
      const { name, description, images, avlQuantity, category, productId,unitPrice } =
        productInfo;
      const newlyProductInstance = ProductModel.build({
        name,
        description,
        images,
        avlQuantity,
        category,
        productId,
        unitPrice
      });
      await newlyProductInstance.save();
    } catch (err) {
      console.log("error", err);
    }
  }
  private async updateProduct(ProductInfo: any): Promise<void> {
    try {
      const { name, description, images, avlQuantity, category, productId,unitPrice } =
        ProductInfo;
      await ProductModel.findOneAndUpdate(
        { productId: new Types.ObjectId(productId) },
        {
          name,
          description,
          images,
          avlQuantity,
          category,
          unitPrice
        }
      );
    } catch (err) {
      console.log("error", err);
    }
  }
  async deleteProduct(productInfo: any): Promise<void> {
    try {
      const { productId } = productInfo;
      await ProductModel.findOneAndDelete({
        ProductId: new Types.ObjectId(productId),
      });
    } catch (err) {
      console.log("error", err);
    }
  }
  async operation(eventName: any, data: any): Promise<void> {
    switch (eventName) {
      case uniqueValuesConstants.PRODUCT_CREATE_EVENT:
        this.createProduct(data);
        break;
      case uniqueValuesConstants.PRODUCT_DELETE_EVENT:
        this.deleteProduct(data);
        break;
      case uniqueValuesConstants.PRODUCT_UPDATE_EVENT:
        this.updateProduct(data);
        break;
      default:
        break;
    }
  }
}

export default new ProductEventHandler();
