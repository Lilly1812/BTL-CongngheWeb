// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },

    // 👇 Thêm role: mặc định là "customer"
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    // 👇 Đếm số lần người dùng đăng nhập / truy cập
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
