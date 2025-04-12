import { create } from "zustand";
import axios from "axios";
export const useCartStore = create((set, get) => ({
  cart: [],

  fetchCart: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/carts/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const cartData = res.data?.data;
  
      if (!cartData || !Array.isArray(cartData.items)) {
        set({ cart: [] });
        return;
      }
  
      const items = cartData.items.map((item) => ({
        id: item._id,
        title: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        productId: item.product._id,
      }));
  
      set({ cart: items });
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
    }
  },  

  addToCart: async ({ productId, quantity }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/carts/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await get().fetchCart();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  },

  removeSelected: async ({ productIds }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/carts/remove",
        { productIds }, // 🟡 Kiểm tra xem productIds có phải là mảng hợp lệ
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await get().fetchCart();
    } catch (err) {
      console.error("❌ Lỗi khi xóa các sản phẩm đã chọn:", err.response?.data || err);
    }
  },
  updateCartItemQuantity: async ({ productId, quantity }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/carts/update",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response từ API: ", response);  // Kiểm tra phản hồi từ server
      await get().fetchCart();
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err.response ? err.response.data : err.message);  // In chi tiết lỗi
    }
    
  },

  clearCart: () => set({ cart: [] }),
}));
