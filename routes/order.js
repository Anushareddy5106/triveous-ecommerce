import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import {
  placeOrder,
  getOrderHistory,
  getOrderById,
} from "../controllers/order.js";

const router = express.Router();

router.post("/placeOrder", authenticate, authorize(["customer"]), placeOrder);
router.get("/history", authenticate, authorize(["customer"]), getOrderHistory);
router.get(
  "/orderDetails/:orderId",
  authenticate,
  authorize(["customer"]),
  getOrderById
);

export default router;
