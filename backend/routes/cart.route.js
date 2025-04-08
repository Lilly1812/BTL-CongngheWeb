import express from "express";
import { getAllCarts} from "../controller/cart.controller.js";
import { addToCart } from "../controller/cart.controller.js";
import { updateCartItemQuantity } from "../controller/cart.controller.js"; 
import { removeSelected } from "../controller/cart.controller.js";
import Cart from "../model/cart.model.js";
import mongoose, { get } from "mongoose";

const router = express.Router();

// Get all carts
router.get("/:userId", getAllCarts);
router.post("/add", addToCart);
router.post("/update", updateCartItemQuantity);
router.post("/remove", removeSelected);
export default router;