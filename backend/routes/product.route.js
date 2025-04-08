import express from "express";
import mongoose from "mongoose";
import Product from "../model/product.model.js";
import { getAllProducts } from "../controller/product.controller.js";

const router =express.Router();

router.get("/", getAllProducts);
export default router;