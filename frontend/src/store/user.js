import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: null,

  login: async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });

      const { token, user } = response.data;

      localStorage.setItem("token", token); // lưu token nếu cần gọi API khác
      
      set({ user }); // lưu user từ backend (có id thật)

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Đăng nhập thất bại",
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });

      return {
        success: true,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Đăng ký thất bại",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },

  // Tùy chọn: nếu có route /me
  fetchUserFromToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ user: res.data.user });
    } catch (error) {
      console.error("❌ Token error:", error);
      set({ user: null });
      localStorage.removeItem("token");
    }
  },
  fetchAllUsers: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Không thể lấy danh sách người dùng",
      };
    }
  },
  
}));
