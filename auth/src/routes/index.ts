import { Router } from "../index";
import signupRoute from "./signup.route";
import loginRoute from "./login.route";

/** Instance of router. */
const router = Router();
/** Handle all the routes present in auth service. */
router.use("/auth", signupRoute, loginRoute);

export default router;
