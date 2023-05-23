import addToCartRoute from "./add-to-cart.route";
import getCartDetailRoute from "./get-cart-detail.route";
import { Router } from "../index";
const router = Router();

router.use("/order", addToCartRoute, getCartDetailRoute);

export default router;
