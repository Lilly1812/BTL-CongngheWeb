import express from "express";
import {
  getCartByUserId,
  addToCart,
  updateCartItemQuantity,
  removeSelected
} from "../controller/cart.controller.js";

import { protect } from "../middleware/authMiddleware.js"; // << Thêm dòng này

const router = express.Router();

router.get("/me", protect, getCartByUserId);
router.post("/add", protect, addToCart);
router.post("/update", protect, updateCartItemQuantity);
router.post("/remove", protect, removeSelected);

export default router;
