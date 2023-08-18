import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cart.js";

const router = express.Router();

router.post("/", authenticate, authorize(["customer"]), addToCart);
router.patch("/", authenticate, authorize(["customer"]), updateCartItem);
router.delete("/", authenticate, authorize(["customer"]), removeCartItem);
router.get("/", authenticate, authorize(["customer"]), getCart);

export default router;
