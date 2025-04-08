import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
