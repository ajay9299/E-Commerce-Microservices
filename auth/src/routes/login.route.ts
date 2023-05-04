import { NextFunction, Request, Response, Router } from "../index";

/** Instance of Router*/
const router = Router();

/** This route is used to login the valid user. */
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ ok: "OK" });
});

export default router;
