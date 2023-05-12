import { uniqueValues } from "../constants";
import { Types } from "../database";
import APIFeatures from "../helpers/api-features.helper";
import { ControllerResponse } from "../helpers/response.helper";

import { ProductAttrs } from "../models/product.model";
import queueProducer from "../queues/queue-producer";
import productRepository from "../repository/product.repository";
/** Product service class holds all methods related to Product model. */
class ProductService {
  /**
   * @param productDetails content all required information to create new product.
   * @return newly created product.
   * */
  async createNewProduct(
    productDetails: ProductAttrs,
    sellerId: Types.ObjectId
  ): Promise<ControllerResponse> {
    productDetails.sellerId = sellerId;
    const newlyCreatedProduct = await productRepository.createNewProduct(
      productDetails
    );

    /**
     * Push newlyCreated user info inside queue.
     * */
    await queueProducer.publishMessage(
      "product-info",
      newlyCreatedProduct,
      uniqueValues.PRODUCT_CREATE_EVENT
    );
    return {
      success: true,
      status: 200,
      data: newlyCreatedProduct,
    };
  }

  /**
   * @param page pass the page number
   * @param limit pass the limit number
   * @return all products details.
   * */
  async getAllProductsDetails(
    page: number,
    limit: number
  ): Promise<ControllerResponse> {
    const allProductsDetails = productRepository.getAllProductsDetails();

    const features = new APIFeatures(allProductsDetails, {
      page,
      limit,
    }).paginate();
    const products = await features.query;
    return {
      success: true,
      status: 200,
      data: products,
    };
  }

  /**
   * @param productDetails product details object.
   * @param sellerId seller Id object.
   * @param productId product Id.
   * @return updated product detail based on productId.
   * */
  async updateProductDetailsByProductId(
    productDetails: ProductAttrs,
    sellerId: Types.ObjectId,
    productId: string
  ): Promise<ControllerResponse> {
    const newlyUpdatedProduct =
      await productRepository.updateProductDetailsByProductId(
        productDetails,
        sellerId,
        productId
      );
    console.log("<<<newlyUpdatedProduct>>>", newlyUpdatedProduct);
    /**
     * Push newlyUpdated product info inside queue.
     * */
    await queueProducer.publishMessage(
      "product-info",
      newlyUpdatedProduct,
      uniqueValues.PRODUCT_UPDATE_EVENT
    );
    return {
      success: true,
      status: 200,
      data: newlyUpdatedProduct,
    };
  }

  /**
   * @param sellerId seller Id object.
   * @param productId product Id.
   * @return deleted product detail based on productId.
   * */
  async deleteProductDetailByProductId(
    sellerId: Types.ObjectId,
    productId: string
  ): Promise<ControllerResponse> {
    const deletedProduct =
      await productRepository.deleteProductDetailByProductId(
        sellerId,
        productId
      );
    console.log("<<<deletedProduct>>>", deletedProduct);
    /**
     * Push deleted product info inside queue.
     * */
    await queueProducer.publishMessage(
      "product-info",
      deletedProduct,
      uniqueValues.PRODUCT_DELETE_EVENT
    );
    return {
      success: true,
      status: 204,
      data: null,
    };
  }
}

export default new ProductService();
