import userController from "../controllers/user.controller";
import { Router } from "../index";

/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.post("/login", userController.loginUser);

export default router;
