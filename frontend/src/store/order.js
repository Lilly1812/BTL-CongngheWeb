import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,

  // Lấy đơn hàng của user đang đăng nhập
  fetchOrders: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("orders from API", res.data);
      const ordersData = res.data?.data;
  
      // Nếu không có đơn hàng hoặc định dạng không đúng
      if (!ordersData || !Array.isArray(ordersData)) {
        set({ orders: [] });
        return;
      }
  
      const orders = ordersData.map((order) => ({
        orderId: order.orderId,
        status: order.status,
        createdAt: order.createdAt,
        total: order.total,
        items: order.items.map((item) => ({
          title: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
          image: item.productId.image,
          productId: item.productId._id,
        })),
      }));
  
      set({ orders });
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
      set({ orders: [] });
    }
  },
  

  // Admin: lấy tất cả đơn hàng
  fetchAllOrdersForAdmin: async () => {
    const token = localStorage.getItem("token");
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


  // Hủy đơn hàng
  cancelOrder: async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await get().fetchOrders();
      return res.data;
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      throw err;
    }
  },

  // Thay đổi trạng thái đơn hàng (admin)
  changeOrderStatus: async ({ orderId, targetStatus}) => {
    const token = localStorage.getItem("token");
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
      if (err.response) {
        // Server responded with a status code other than 2xx
        console.error("Error Response:", err.response.data);
      } else if (err.request) {
        // Request was made but no response was received
        console.error("No response received:", err.request);
      } else {
        // Something else triggered the error
        console.error("Error", err.message);
      }
      throw err;
    }
  },

}));
