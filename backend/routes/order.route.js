import express from "express";
import {
  getAllOrdersForAdmin,
  getAllOrders,
  createOrder,
  cancelOrder,
  changeOrderStatus,
} from "../controller/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/admin/all", protect, getAllOrdersForAdmin); // chỉ admin mới nên được dùng
router.get("/me", protect, getAllOrders); // user tự lấy order của mình
router.post("/", protect, createOrder);
router.patch("/cancel/:orderId", protect, cancelOrder);
router.patch("/change-status/:orderId", protect, changeOrderStatus);

export default router;
