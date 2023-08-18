import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

import { getCategory } from "../controllers/category.js";

const router = express.Router();

router.get("/", authenticate, authorize(["customer"]), getCategory);

export default router;
