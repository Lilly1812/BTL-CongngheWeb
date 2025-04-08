// store/user.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {
    _id: "66146f89c06c3e0ae89163b2", // mock userId để test
    name: "Test User",
  },
}));
