import sellerController from "../controllers/seller.controller";
import { Router } from "../index";
import sellerValidation from "../validations/seller.validation";
/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.post(
  "/login",
  sellerValidation.loginValidation,
  sellerController.loginSeller
);

export default router;
