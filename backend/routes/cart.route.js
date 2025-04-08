import express from "express";
import { getAllCarts} from "../controller/cart.controller.js";
import { addToCart } from "../controller/cart.controller.js";
import Cart from "../model/cart.model.js";
import mongoose, { get } from "mongoose";

const router = express.Router();

// Get all carts
router.get("/:userId", getAllCarts);
router.post("/add", addToCart);
export default router;