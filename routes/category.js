import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { rateLimiting } from "../middlewares/rateLimiting.js";

import { getCategory } from "../controllers/category.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["customer", "seller"]),
  rateLimiting,
  getCategory
);

export default router;
