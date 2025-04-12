import express from "express";
import {
  getAllOrdersForAdmin,
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  changeOrderStatus,
} from "../controller/order.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/all", protect, getAllOrdersForAdmin); // chỉ admin mới nên được dùng
router.get("/get", protect, getAllOrders); // user tự lấy order của mình
router.get("/detail/:orderId", protect, getOrderById);
router.post("/", protect, createOrder);
router.patch("/status/:orderId", protect, updateOrderStatus);
router.patch("/cancel/:orderId", protect, cancelOrder);
router.patch("/change-status/:orderId", protect, changeOrderStatus);

export default router;
