import { Router } from "../index";
import sellerController from "../controllers/seller.controller";
import sellerValidation from "../validations/seller.validation";

/** Instance of Router*/
const router = Router();

/** This route is used to signup the new seller. */
router.post(
  "/signup",
  sellerValidation.signupValidation,
  sellerController.createNewSeller
);

export default router;
