import { log } from "console";
import { NextFunction, Request, Response, Router } from "../index";
import productController from "../controllers/product.controller";

/** Instance of router. */
const router = Router();

/** This route is used to create new product. */
router.post("/create", productController.createNewProduct);

export default router;
