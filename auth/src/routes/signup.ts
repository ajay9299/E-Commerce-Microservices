import { Router } from "../index";
import userController from "../controllers/user.controller";
import userValidation from "../validations/user.validation";

/** Instance of Router*/
const router = Router();

/** This route is used to signup the new user. */
router.post(
  "/signup",
  userValidation.signupValidation,
  userController.createNewUser
);

export default router;
