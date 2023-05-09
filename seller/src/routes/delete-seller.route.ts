import sellerController from "../controllers/seller.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";
/** Instance of Router*/
const router = Router();

/** This route is used to delete user details of loggedIn seller. */
router.delete(
  "/sellerDetails",
  jwtAuthMiddleware,
  sellerController.deleteSellerDetailBySellerId
);

export default router;
