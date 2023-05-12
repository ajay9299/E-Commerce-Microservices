import { Router } from "../index";
import productController from "../controllers/product.controller";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";

/** Instance of router. */
const router = Router();

/** This route is used to delete product. */
router.delete(
  "/delete/:id",
  jwtAuthMiddleware,
  productController.deleteProduct
);

export default router;
