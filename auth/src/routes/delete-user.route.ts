import userController from "../controllers/user.controller";
import { Router } from "../index";
/** Instance of Router*/
const router = Router();

/** This route is used to delete user details of loggedIn user. */
router.delete("/userDetails",userController.deleteUserDetailByUserId);

export default router;
