import userController from "../controllers/user.controller";
import { Router } from "../index";
import { jwtAuthMiddleware } from "../middlewares/auth.middleware";
/** Instance of Router*/
const router = Router();

/** This route is used to delete user details of loggedIn user. */
router.delete(
  "/userDetails",
  jwtAuthMiddleware,
  userController.deleteUserDetailByUserId
);

export default router;
