import { log } from "console";
import { NextFunction, Request, Response, Router } from "../index";
import userController from "../controllers/user.controller";

/** Instance of router. */
const router = Router();

/** This route is used to signup the new user. */
router.post("/signup", userController.createNewUser);

export default router;
