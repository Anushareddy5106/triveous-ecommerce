import express from "express";

import {
  placeOrder,
  getOrderHistory,
  getOrderById,
} from "../controllers/order.js";

const router = express.Router();

router.post("/placeOrder", placeOrder);
router.get("/history", getOrderHistory);
router.get("/orderDetails/:orderId", getOrderById);

export default router;
