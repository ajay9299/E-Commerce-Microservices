import { Router } from "../index";
import createProductRoute from "./create-product.route";
import getAllProducts from "./get-all-products.route";

/** Instance of router. */
const router = Router();
/** Handle all the routes present in auth service. */
router.use("/products", createProductRoute, getAllProducts);

export default router;
