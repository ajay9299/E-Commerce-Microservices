import { Router } from "../index";
import productController from "../controllers/product.controller";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";

/** Instance of router. */
const router = Router();

/** This route is used to create new product. */
router.post("/create", jwtAuthMiddleware, productController.createNewProduct);

export default router;
