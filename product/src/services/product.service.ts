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
  async getAllProductsDetails(page, limit): Promise<ControllerResponse> {
    const allProductsDetails = await productRepository.getAllProductsDetails();
    // const page = page * 1 || 1;
    // const limit = limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // page=3&limit=10, 1-10, page 1, 11-20, page 2, 21-30 page 3
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page does not exist");
    // }
    return {
      success: true,
      status: 200,
      data: allProductsDetails,
    };
  }

  // /**s
  //  * @param productId productId of logged in user.
  //  * @return product detail based on productId.
  //  * */
  // async getProductDetailByProductId(
  //   productId: Types.ObjectId
  // ): Promise<ProductDoc | null> {
  //   return await ProductModel.findById({ _id: productId });
  // }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return update product detail based on productId.
   * */
  // async updateProductDetailByProductId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {}

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
