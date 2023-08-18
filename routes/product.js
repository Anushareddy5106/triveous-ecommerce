import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { rateLimiting } from "../middlewares/rateLimiting.js";

import {
  addProduct,
  fetchProductById,
  fetchProductsByCategory,
} from "../controllers/product.js";

const router = express.Router();

router.post(
  "/add",
  authenticate,
  authorize(["seller"]),
  rateLimiting,
  addProduct
);
router.get(
  "/:productId",
  authenticate,
  authorize(["seller", "customer"]),
  rateLimiting,
  fetchProductById
);
router.get(
  "/categories/:categoryId",
  authenticate,
  authorize(["seller", "customer"]),
  rateLimiting,
  fetchProductsByCategory
);

export default router;
