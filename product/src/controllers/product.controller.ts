import { log } from "console";
import { Request, Response, NextFunction } from "../index";

import productService from "../services/product.service";
import { fetchPageNumberAndLimitFromQuery } from "../helpers/Pagination.helper";

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

    log("RequestInfo", req.userInfo);
    log("Product", newProductDetails);
    /** sellerId of loggedIn seller. */
    const sellerId = req.userInfo?.sellerId;
    log(sellerId);
    if (!sellerId) {
      return res.status(400).json({ ok: "Bad" });
    }

    const responseOfService = await productService.createNewProduct(
      newProductDetails,
      sellerId!
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
   * @return all products details.
   * */
  async getAllProductsDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { pageNumber, limitNumber } = fetchPageNumberAndLimitFromQuery(req);
    const responseOfService = await productService.getAllProductsDetails(
      pageNumber,
      limitNumber
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
   * @return updated product detail based on productId.
   * */
  async updateProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const productDetails = req.body;

    log("RequestInfo", req.userInfo);
    log("Product", productDetails);
    /** sellerId of loggedIn user. */
    const sellerId = req.userInfo?.sellerId;
    const productId = req?.params?.id;
    log(sellerId);
    if (!sellerId) {
      return res.status(400).json({ ok: "Bad" });
    }

    const responseOfService =
      await productService.updateProductDetailsByProductId(
        productDetails,
        sellerId!,
        productId
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
  // async getProductDetailByProductId(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response> {}

  /**
   * @param req express request object.
   * @param res express response object.
   * @param next express next function.
   * @return nothing based on productId.
   * */
  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    log("RequestInfo", req.userInfo);

    /** sellerId of loggedIn user. */
    const sellerId = req.userInfo?.sellerId;
    const productId = req?.params?.id;
    log(sellerId);
    if (!sellerId) {
      return res.status(400).json({ ok: "Bad" });
    }

    const responseOfService =
      await productService.deleteProductDetailByProductId(sellerId!, productId);
    if (responseOfService.success === false)
      return res
        .status(responseOfService.status)
        .json({ errors: responseOfService.errors });
    return res
      .status(responseOfService.status)
      .json({ data: responseOfService.data });
  }
}

export default new ProductController();
