import { Types } from "../database";
import { Request, Response, NextFunction } from "../index";
import { ProductModel } from "../models";
import { ProductAttrs, ProductDoc } from "../models/product.model";
/** Product repository class holds all methods related to Product model. */
class ProductRepository {
  /**
   * @param productDetails content all required information to create new product.
   * @return newly created product.
   * */
  async createNewProduct(productDetails: ProductAttrs): Promise<ProductDoc> {
    const newlyProductInstance = ProductModel.build(productDetails);
    const newlyCreatedProductDetails = await newlyProductInstance.save();
    return newlyCreatedProductDetails;
  }

  /**
   * @param productDetails content all required information to create new product.
   * @return newly created product.
   * */
  getAllProductsDetails(): any {
    const allProductsDetails = ProductModel.find();
    return allProductsDetails;
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return product detail based on productId.
   * */
  // async getProductDetailByProductId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return user detail based on productId.
   * */
  // async getProductDetailOfLoggedInProduct(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return update user detail based on productId.
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

export default new ProductRepository();
