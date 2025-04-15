import express from 'express';
import mongoose from 'mongoose';
import User from '../model/user.model.js';
import { 
  getAllUsers, 
  createUser, 
  loginUser, 
  updateRole, 
  logoutUser 
} from '../controller/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Lấy tất cả người dùng
router.get('/', getAllUsers);

// Đăng ký người dùng
router.post("/register", createUser);

// Đăng nhập người dùng
router.post("/login", loginUser);

// Lấy thông tin người dùng đang đăng nhập
router.get("/me", protect, async (req, res) => {
  res.status(200).json({ user: req.user });
});
// Cập nhật vai trò người dùng (chỉ dành cho admin)
router.post("/update-role", protect, updateRole);
// Đăng xuất người dùng
router.post("/logout", protect, logoutUser);

export default router;
