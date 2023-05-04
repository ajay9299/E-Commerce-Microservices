import { log } from "console";
import { NextFunction, Request, Response, Router } from "../index";
/** Instance of router. */
const router = Router();

/** This route is used to login the valid user. */
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  log("This is login route...");
  res.status(200).json({ ok: "OK" });
});

export default router;
