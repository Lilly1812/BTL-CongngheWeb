import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,

  // Lấy đơn hàng của user đang đăng nhập
  fetchOrders: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const ordersData = res.data;
  
      // Nếu không có đơn hàng hoặc định dạng không đúng
      if (!ordersData || !Array.isArray(ordersData)) {
        set({ orders: [] });
        return;
      }
  
      const orders = ordersData.map((order) => ({
        id: order._id,
        status: order.status,
        createdAt: order.createdAt,
        totalPrice: order.totalPrice,
        items: order.items.map((item) => ({
          title: item.product?.name,
          price: item.product?.price,
          quantity: item.quantity,
          image: item.product?.image,
          productId: item.product?._id,
        })),
      }));
  
      set({ orders });
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
      set({ orders: [] });
    }
  },
  

  // Admin: lấy tất cả đơn hàng
  fetchAllOrdersForAdmin: async (token) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ orders: res.data });
    } catch (err) {
      console.error("Lỗi khi lấy tất cả đơn hàng (admin):", err);
      set({ orders: [] });
    }
  },

  // Lấy đơn hàng theo ID
  fetchOrderById: async (orderId, token) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ selectedOrder: res.data });
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      set({ selectedOrder: null });
    }
  },

  // Tạo đơn hàng
  createOrder: async (orderData, token) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.error("Lỗi khi tạo đơn hàng:", err);
      throw err;
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async ({ orderId, status, token }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      throw err;
    }
  },

  // Hủy đơn hàng
  cancelOrder: async (orderId, token) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      throw err;
    }
  },

  // Thay đổi trạng thái đơn hàng (admin)
  changeOrderStatus: async ({ orderId, targetStatus, token }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/change-status/${orderId}`,
        { targetStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái đơn hàng:", err);
      throw err;
    }
  },

  // Reset selected
  clearSelectedOrder: () => set({ selectedOrder: null }),
}));
