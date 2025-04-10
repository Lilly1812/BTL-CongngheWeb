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

const router = express.Router();
router.get("/admin/all", getAllOrdersForAdmin);
router.get("/:userId", getAllOrders);
router.get("/detail/:orderId", getOrderById);
router.post("/", createOrder);
router.patch("/status/:orderId", updateOrderStatus);
router.patch("/cancel/:orderId", cancelOrder); 
router.patch("/change-status/:orderId", changeOrderStatus);

export default router;
