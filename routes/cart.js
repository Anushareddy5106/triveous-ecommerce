import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { rateLimiting } from "../middlewares/rateLimiting.js";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cart.js";

const router = express.Router();

router.post(
  "/add",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  addToCart
);
router.patch(
  "/update",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  updateCartItem
);
router.delete(
  "/remove",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  removeCartItem
);
router.get(
  "/get",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  getCart
);

export default router;
