import { Request, Response, NextFunction } from "../index";

import productService from "../services/product.service";

/** Product controller class holds methods related to Product model. */

class ProductController {
  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return newly created product.
   * */
  async createNewProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const newProductDetails = req.body;
    const responseOfService = await productService.createNewProduct(
      newProductDetails
    );
    if (responseOfService.success === false)
      return res
        .status(responseOfService.status)
        .json({ errors: responseOfService.errors });
    return res
      .status(responseOfService.status)
      .json({ data: responseOfService.data });
  }

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return product detail based on productId.
   * */
  async getProductDetailByProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {}

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

export default new ProductController();
