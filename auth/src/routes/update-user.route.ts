import userController from "../controllers/user.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";
import userValidation from "../validations/user.validation";

/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.patch(
  "/userDetails",
  jwtAuthMiddleware,
  userValidation.updateValidation,
  userController.updateUserDetailByUserId
);

export default router;
