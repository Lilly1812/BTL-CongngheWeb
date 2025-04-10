import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,

  // Lấy tất cả đơn hàng của user
  fetchOrders: async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      set({ orders: res.data });
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
      set({ orders: [] });
    }
  },

  // 🆕 Lấy tất cả đơn hàng (admin)
  fetchAllOrdersForAdmin: async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/admin/all`);
      set({ orders: res.data });
    } catch (err) {
      console.error("Lỗi khi lấy tất cả đơn hàng (admin):", err);
      set({ orders: [] });
    }
  },
  
  // Lấy đơn hàng theo ID
  fetchOrderById: async (orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      set({ selectedOrder: res.data });
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      set({ selectedOrder: null });
    }
  },

  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/orders`, orderData);
      return res.data;
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng:", err);
      throw err;
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async ({ orderId, status }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/status/${orderId}`, { status });
      return res.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      throw err;
    }
  },

  // Gửi yêu cầu hủy đơn hàng
  cancelOrder: async (orderId) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/cancel/${orderId}`);
      return res.data;
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      throw err;
    }
  },
    // 🆕 Thay đổi trạng thái đơn hàng (dành cho admin)
    changeOrderStatus: async ({ orderId, targetStatus }) => {
      try {
        const res = await axios.patch(`http://localhost:5000/api/orders/change-status/${orderId}`, {
          targetStatus,
        });
        return res.data;
      } catch (err) {
        console.error("Lỗi khi thay đổi trạng thái đơn hàng:", err);
        throw err;
      }
    },
  
  // Reset đơn hàng đã chọn
  clearSelectedOrder: () => set({ selectedOrder: null }),
}));
