import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import {
  addProduct,
  fetchProductById,
  fetchProductsByCategory,
} from "../controllers/product.js";

const router = express.Router();

router.post("/add", authenticate, authorize(["seller"]), addProduct);
router.get(
  "/:productId",
  authenticate,
  authorize(["seller", "customer"]),
  fetchProductById
);
router.get(
  "/categories/:categoryId",
  authenticate,
  authorize(["seller", "customer"]),
  fetchProductsByCategory
);

export default router;
