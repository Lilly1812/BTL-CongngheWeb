import Order from "../model/order.model.js";
import mongoose from "mongoose";

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders (admin):", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (!orders) return res.status(404).json({ message: "Orders not found" });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
  
      const order = await Order.findById(orderId).populate("items.productId");
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(order);
    } catch (error) {
      console.error("Error getting order:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
export const createOrder = async (req, res) => {
  const { orderId, userId, items, shippingAddress, paymentMethod, total } = req.body;

  try {
    const newOrder = new Order({
      orderId,
      userId,
      items,
      shippingAddress,
      paymentMethod,
      total
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const cancelOrder = async (req, res) => {
    const { orderId } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Kiểm tra nếu đã bị hủy hoặc hoàn tất thì không được hủy nữa
      if (order.status === "Đã hủy" || order.status === "Đã hoàn tất") {
        return res.status(400).json({ message: "Không thể hủy đơn hàng này" });
      }
  
      order.status = "Chờ hủy";
      await order.save();
  
      res.json({ message: "Đơn hàng đã được gửi yêu cầu hủy", order });
    } catch (error) {
      console.error("Error canceling order:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const changeOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { targetStatus } = req.body;
  
    const validTransitions = {
      "Chờ xác nhận": ["Đã xác nhận"],
      "Đã xác nhận": ["Đang giao"],
      "Đang giao": ["Đã giao"],
      "Chờ hủy": ["Đã hủy"],
    };
  
    try {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "ID đơn hàng không hợp lệ" });
      }
  
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  
      const currentStatus = order.status;
  
      // Không cho thay đổi nếu đã giao hoặc đã hủy
      if (["Đã giao", "Đã hủy"].includes(currentStatus)) {
        return res.status(400).json({ message: `Không thể thay đổi trạng thái khi đơn hàng đã ở trạng thái "${currentStatus}"` });
      }
  
      const allowedNextStatuses = validTransitions[currentStatus] || [];
      if (!allowedNextStatuses.includes(targetStatus)) {
        return res.status(400).json({
          message: `Không thể chuyển từ "${currentStatus}" sang "${targetStatus}"`,
        });
      }
  
      // Cập nhật deliveryTime nếu đã giao
      if (targetStatus === "Đã giao") {
        order.deliveryTime = new Date();
      }
  
      order.status = targetStatus;
      await order.save();
  
      res.json({
        message: `Trạng thái đơn hàng đã được cập nhật thành "${targetStatus}"`,
        order,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  };
  
  
         