import { log } from "console";
import { NextFunction, Request, Response, Router } from "../index";

/** Instance of router. */
const router = Router();

/** This route is used to signup the new user. */
router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
  log("This is signup route...");
  res.status(200).json({ ok: "OK" });
});

export default router;
