import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  
  // Đăng nhập
  login: async (email, password) => {
    try {
      const res = await axios.post("${BASE_URL}/api/users/login", {
        email,
        password,
      });
  
      const { token, user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      set({ user });
      console.log("Login successful. User data:", user);
  
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Đăng nhập thất bại",
      };
    }
  },
  
  // Đăng ký
  register: async (name, email, password) => {
    try {
      const res = await axios.post("${BASE_URL}/api/users/register", {
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

  // Đăng xuất
  logout: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      // Gửi yêu cầu logout
      await axios.post("${BASE_URL}/api/users/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Xoá thông tin người dùng và token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
  
      // Cập nhật trạng thái state
      set({ user: null });
  
      console.log("Đăng xuất thành công.");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  }
,  

  // Lấy thông tin người dùng từ token
  fetchUserFromToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const res = await axios.get("${BASE_URL}/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res.data && res.data.user) {
        set({ user: res.data.user });
        console.log("Fetched user from token:", res.data.user);
      }
  
    } catch (error) {
      console.error("❌ Token error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null });
    }
  },
  
  // Lấy danh sách người dùng
  fetchAllUsers: async () => {
    try {
      const res = await axios.get("${BASE_URL}/api/users");
      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Không thể lấy danh sách người dùng",
      };
    }
  },

  // Cập nhật vai trò
  updateRole: async (role) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        success: false,
        message: "Vui lòng đăng nhập để thực hiện hành động này.",
      };
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const validRoles = ["customer", "admin"];
      if (!validRoles.includes(role)) {
        return {
          success: false,
          message: "Vai trò không hợp lệ.",
        };
      }

      const res = await axios.post(
        "${BASE_URL}/api/users/update-role",
        { userId, newRole: role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Không thể cập nhật quyền người dùng",
      };
    }
  },
}));
