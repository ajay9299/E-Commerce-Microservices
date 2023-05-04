import { Types } from "../database";
import { ControllerResponse } from "../helpers/response.helper";
import { Request, Response, NextFunction } from "../index";
import { ProductModel } from "../models";

import Product, { ProductAttrs, ProductDoc } from "../models/product.model";
import productRepository from "../repository/product.repository";
/** Product service class holds all methods related to Product model. */
class ProductService {
  /**
   * @param productDetails content all required information to create new product.
   * @return newly created product.
   * */
  async createNewProduct(
    productDetails: ProductAttrs
  ): Promise<ControllerResponse> {
    const newlyCreatedProduct = await productRepository.createNewProduct(
      productDetails
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
  async getProductDetailByProductId(
    productId: Types.ObjectId
  ): Promise<ProductDoc | null> {
    return await ProductModel.findById({ _id: productId });
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
  ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return deleted product detail based on productId.
   * */
  async deleteProductDetailByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}
}

export default new ProductService();
