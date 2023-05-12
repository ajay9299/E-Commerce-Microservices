import { Types } from "../database";
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
   * @return all products details.
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
   * @param productDetails pass product details object.
   * @param sellerId pass seller Id.
   * @param productId pass product Id.
   * @return updated product detail based on productId.
   * */
  async updateProductDetailsByProductId(
    productDetails: ProductAttrs,
    sellerId: Types.ObjectId,
    productId: string
  ): Promise<ProductDoc | null> {
    return await ProductModel.findOneAndUpdate(
      { sellerId: sellerId, _id: productId },
      productDetails,
      {
        new: true,
      }
    );
  }

  /**
   * @param sellerId pass seller Id.
   * @param productId pass product Id.
   * @return deleted product(nothing) based on productId.
   * */
  async deleteProductDetailByProductId(
    sellerId: Types.ObjectId,
    productId: string
  ): Promise<ProductDoc | null> {
    return await ProductModel.findOneAndDelete({
      sellerId: sellerId,
      _id: productId,
    });
  }
}

export default new ProductRepository();
