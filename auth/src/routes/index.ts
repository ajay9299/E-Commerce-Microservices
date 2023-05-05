import { Router } from "../index";
import signupRoute from "./signup.route";
import loginRoute from "./login.route";
import getRoute from "./get-user.route";
import updateRoute from "./update-user.route";
import deleteRoute from "./delete-user.route";

/** Instance of Router*/
const router = Router();

/** Handle all the routes present in auth service. */
router.use(
  "/auth",
  signupRoute,
  loginRoute,
  getRoute,
  updateRoute,
  deleteRoute
);

export default router;
