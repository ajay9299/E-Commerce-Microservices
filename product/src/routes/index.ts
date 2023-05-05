import { Router } from "../index";
import createProductRoute from "./create-product.route";

/** Instance of router. */
const router = Router();
/** Handle all the routes present in auth service. */
router.use("/products", createProductRoute);

export default router;
