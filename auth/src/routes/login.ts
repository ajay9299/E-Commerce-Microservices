import userController from "../controllers/user.controller";
import { Router } from "../index";
import userValidation from "../validations/user.validation";
/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.post("/login", userValidation.loginValidation, userController.loginUser);

export default router;
