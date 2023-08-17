import express from "express";

import {
  addProduct,
  fetchProductById,
  fetchProductsByCategory,
} from "../controllers/product.js";

const router = express.Router();

router.post("/add/:userId", addProduct);
router.get("/:productId", fetchProductById);
router.get("/categories/:categoryId", fetchProductsByCategory);

export default router;
