import { create } from "zustand";
import axios from "axios";

export const useCartStore = create((set, get) => ({
  cart: [],
  
  fetchCart: async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/carts/${userId}`);
      const cartData = Array.isArray(res.data) ? res.data[0] : res.data;

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

  addToCart: async ({ userId, productId, quantity }) => {
    try {
      await axios.post("http://localhost:5000/api/carts/add", {
        userId,
        productId,
        quantity,
      });
      await get().fetchCart(userId);
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
    }
  },

  removeSelected: async ({ userId, productIds }) => {
    try {
      await axios.post("http://localhost:5000/api/carts/remove", {
        userId,
        productIds,
      });
      await get().fetchCart(userId);
    } catch (err) {
      console.error("❌ Lỗi khi xóa các sản phẩm đã chọn:", err);
    }
  },

  updateCartItemQuantity: async ({ userId, productId, quantity }) => {
    try {
      await axios.post("http://localhost:5000/api/carts/update", {
        userId,
        productId,
        quantity,
      });
      await get().fetchCart(userId);
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng:", err);
    }
  },

  clearCart: () => set({ cart: [] }),
}));
