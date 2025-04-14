// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../model/user.model.js"; // điều chỉnh đường dẫn nếu khác

export const protect = async (req, res, next) => {
  let token;

  console.log("👉 Request headers:", req.headers); // Để chắc chắn token được gửi chính xác

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Chú ý secret phải đúng với lúc tạo token

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Không tìm thấy người dùng." });
      }

      next();
    } catch (error) {
      console.error("❌ Token không hợp lệ:", error.message);
      res.status(401).json({ message: "Token không hợp lệ." });
    }
  } else {
    res.status(401).json({ message: "Không có token xác thực." });
  }
};

