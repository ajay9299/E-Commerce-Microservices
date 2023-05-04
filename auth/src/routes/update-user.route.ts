import userController from "../controllers/user.controller";
import { NextFunction, Request, Response, Router } from "../index";

/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.patch("/userDetails", userController.updateUserDetailByUserId);

export default router;
