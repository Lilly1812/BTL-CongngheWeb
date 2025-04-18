import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Tạo người dùng mới
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email đã được đăng ký." });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "customer", // Mặc định là khách hàng
            loginCount: 0 // Ban đầu là 0 lượt truy cập
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công",
            data: { id: newUser._id, name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error("❌ Error in Create User:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};

// Đăng nhập người dùng
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      
        if (!user) {
            return res.status(400).json({ success: false, message: "Tài khoản không tồn tại." });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Sai mật khẩu." });
        }

        // Tăng số lượt truy cập
        user.loginCount += 1;
        user.isActive = true;
        await user.save();

        // Tạo JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "your_jwt_secret", // Nên lưu biến môi trường
            { expiresIn: "3d" }
        );

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                loginCount: user.loginCount,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error("❌ Error in Login User:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};

// Lấy tất cả người dùng
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("❌ Error in Get All Users:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Cập nhật vai trò người dùng
export const updateRole = async (req, res) => {
    const { userId, newRole } = req.body;

    // Kiểm tra giá trị newRole hợp lệ
    const validRoles = ['customer', 'admin'];
    if (!validRoles.includes(newRole)) {
        return res.status(400).json({ success: false, message: "Vai trò không hợp lệ." });
    }

    try {
        // Kiểm tra xem người dùng có tồn tại không
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại." });
        }

        // Cập nhật vai trò người dùng
        user.role = newRole;
        await user.save();

        res.status(200).json({ success: true, message: "Cập nhật vai trò thành công.", data: user });
    } catch (error) {
        console.error("❌ Error in Update Role:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};


// Đăng xuất người dùng
export const logoutUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: "Người dùng không tồn tại." });

        user.isActive = false;
        await user.save();

        res.status(200).json({ success: true, message: "Đăng xuất thành công." });
    } catch (error) {
        console.error("❌ Error in Logout User:", error.message);
        res.status(500).json({ success: false, message: "Lỗi server." });
    }
};
