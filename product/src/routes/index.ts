import { Router } from "../index";
import productRoute from "./product.route";

/** Instance of router. */
const router = Router();
/** Handle all the routes present in auth service. */
router.use("/product", productRoute);

export default router;
