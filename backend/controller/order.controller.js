import Order from "../model/order.model.js";
import mongoose from "mongoose";

// 🧾 Lấy tất cả đơn hàng - chỉ Admin
export const getAllOrdersForAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập." });
    }

    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Lỗi khi lấy tất cả đơn hàng (admin):", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// 🧾 Lấy đơn hàng của người dùng hiện tại
export const getAllOrders = async (req, res) => {
  try {
    const user = req.user; // phải là req.user do middleware auth gán vào

    // Nếu là customer => chỉ được xem đơn hàng của chính mình
    // Nếu là admin => có thể xem đơn hàng của bất kỳ user nào qua query userId
    const targetUserId = user.role === 'customer' ? user._id : req.query.userId || user._id;

    const orders = await Order.find({ userId: targetUserId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("❌ Lỗi khi lấy đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};


// 📄 Chi tiết đơn hàng theo ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ." });
    }

    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Lỗi khi lấy chi tiết đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// ➕ Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  const { orderId, items, shippingAddress, paymentMethod, total } = req.body;

  try {
    const newOrder = new Order({
      orderId,
      userId: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      total,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Lỗi khi tạo đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// 🔄 Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật trạng thái đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// ❌ Yêu cầu hủy đơn hàng
export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ." });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    if (["Đã hủy", "Đã hoàn tất"].includes(order.status)) {
      return res.status(400).json({ message: "Không thể hủy đơn hàng này." });
    }

    order.status = "Chờ hủy";
    await order.save();

    res.status(200).json({ message: "Đơn hàng đã gửi yêu cầu hủy.", order });
  } catch (error) {
    console.error("❌ Lỗi khi yêu cầu hủy đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

// 🔁 Chuyển đổi trạng thái hợp lệ của đơn hàng
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
      return res.status(400).json({ message: "ID đơn hàng không hợp lệ." });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng." });

    const currentStatus = order.status;

    if (["Đã giao", "Đã hủy"].includes(currentStatus)) {
      return res.status(400).json({
        message: `Không thể thay đổi trạng thái khi đơn hàng đã ở trạng thái "${currentStatus}".`,
      });
    }

    const allowedNextStatuses = validTransitions[currentStatus] || [];

    if (!allowedNextStatuses.includes(targetStatus)) {
      return res.status(400).json({
        message: `Không thể chuyển từ "${currentStatus}" sang "${targetStatus}".`,
      });
    }

    if (targetStatus === "Đã giao") {
      order.deliveryTime = new Date();
    }

    order.status = targetStatus;
    await order.save();

    res.status(200).json({
      message: `Trạng thái đơn hàng đã được cập nhật thành "${targetStatus}".`,
      order,
    });
  } catch (error) {
    console.error("❌ Lỗi khi đổi trạng thái đơn hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};
