import userController from "../controllers/user.controller";
import { Router } from "../index";

/** Instance of Router*/
const router = Router();

/** This route is used to get user details of loggedIn user. */
router.get("/userDetails", userController.getUserDetailOfLoggedInUser);

/** This route is used to get user details based on userId. */
router.get("/userDetails/:userId", userController.getUserDetailByUserId);

export default router;
