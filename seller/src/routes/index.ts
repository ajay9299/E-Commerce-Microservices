import { Router } from "../index";
import signupRoute from "./signup.route";
import loginRoute from "./login.route";
import getRoute from "./get-seller.route";
import updateRoute from "./update-seller.route";
import deleteRoute from "./delete-seller.route";

/** Instance of Router*/
const router = Router();

/** Handle all the routes present in seller service. */
router.use(
  "/seller",
  signupRoute,
  loginRoute,
  getRoute,
  updateRoute,
  deleteRoute
);

export default router;
