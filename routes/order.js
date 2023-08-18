import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { rateLimiting } from "../middlewares/rateLimiting.js";

import {
  placeOrder,
  getOrderHistory,
  getOrderById,
} from "../controllers/order.js";

const router = express.Router();

router.post(
  "/placeOrder",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  placeOrder
);
router.get(
  "/history",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  getOrderHistory
);
router.get(
  "/orderDetails/:orderId",
  authenticate,
  authorize(["customer"]),
  rateLimiting,
  getOrderById
);

export default router;
