import cartController from "../controllers/cart.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/addToCart", jwtAuthMiddleware, cartController.addToCart);


export default router;
