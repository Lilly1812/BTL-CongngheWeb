// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Có thể thêm password nếu cần đăng nhập
  password: { type: String },
  // Một người dùng sẽ có 1 giỏ hàng liên kết
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  }},
  {
    timestamps: true
},
);

const User = mongoose.model("User", userSchema);
export default User;
