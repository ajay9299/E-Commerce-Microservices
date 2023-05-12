import { Router } from "../index";
import createProductRoute from "./create-product.route";
import getAllProducts from "./get-all-products.route";
import updateProductRoute from "./update-product.route";
import deleteProductRoute from "./delete-product.route";

/** Instance of router. */
const router = Router();
/** Handle all the routes present in product service. */
router.use(
  "/products",
  createProductRoute,
  getAllProducts,
  updateProductRoute,
  deleteProductRoute
);

export default router;
