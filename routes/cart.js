import express from "express";

import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../controllers/cart.js";

const router = express.Router();

router.post("/", addToCart);
router.patch("/", updateCartItem);
router.delete("/", removeCartItem);
router.get("/", getCart);

export default router;
