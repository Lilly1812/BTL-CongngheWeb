import { create } from "zustand";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
export const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("${BASE_URL}/api/products");
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
