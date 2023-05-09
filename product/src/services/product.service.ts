import { uniqueValues } from "../constants";
import { Types } from "../database";
import APIFeatures from "../helpers/api-features.helper";
import { ControllerResponse } from "../helpers/response.helper";
import { Request, Response, NextFunction } from "../index";
import { ProductModel } from "../models";

import Product, { ProductAttrs, ProductDoc } from "../models/product.model";
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
   * @param productId productId of logged in user.
   * @return product detail based on productId.
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
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return update product detail based on productId.
   * */
  async updateProductDetailByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ControllerResponse> {
    console.log("<<<req>>>", req);
    // productDetails.userId = userId;

    // const updateProductsDetails =
    //   productRepository.updateProductDetailByProductId();

    // /**
    //  * Push newlyCreated user info inside queue.
    //  * */
    // await queueProducer.publishMessage(
    //   "product-info",
    //   newlyCreatedProduct,
    //   uniqueValues.PRODUCT_CREATE_EVENT
    // );
    // return {
    //   success: true,
    //   status: 200,
    //   data: newlyCreatedProduct,
    // };
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return deleted product detail based on productId.
   * */
  // async deleteProductDetailByProductId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {}
}

export default new ProductService();
