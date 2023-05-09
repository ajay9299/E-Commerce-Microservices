import sellerController from "../controllers/seller.controller";
import userController from "../controllers/seller.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";
import sellerValidation from "../validations/seller.validation";
import userValidation from "../validations/seller.validation";

/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.patch(
  "/sellerDetails",
  jwtAuthMiddleware,
  sellerValidation.updateValidation,
  sellerController.updateSellerDetailBySellerId
);

export default router;
