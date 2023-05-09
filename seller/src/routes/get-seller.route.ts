import sellerController from "../controllers/seller.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";

/** Instance of Router*/
const router = Router();

/** This route is used to get user details of loggedIn seller. */
router.get(
  "/sellerDetails",
  jwtAuthMiddleware,
  sellerController.getSellerDetailOfLoggedInSeller
);

/** This route is used to get user details based on sellerId. */
router.get(
  "/sellerDetails/:sellerId",
  sellerController.getSellerDetailBySellerId
);

export default router;
