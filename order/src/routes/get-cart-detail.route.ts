import cartController from "../controllers/cart.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.get("/cartDetails", jwtAuthMiddleware, cartController.getCartDetailOfLoggedInUser);

export default router;
