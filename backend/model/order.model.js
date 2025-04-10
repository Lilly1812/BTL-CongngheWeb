import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  title: String,
  image: String,
  price: Number,
  quantity: Number
});

const ShippingAddressSchema = new mongoose.Schema({
  province: String,
  district: String,
  ward: String,
  detail: String
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [OrderItemSchema],
    shippingAddress: ShippingAddressSchema,
    paymentMethod: {
      type: String,
      enum: ["COD", "Chuyển khoản ngân hàng"],
      required: true
    },
    status: {
      type: String,
      enum: [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đang giao",
        "Đã giao",
        "Chờ hủy",
        "Đã hủy"
      ],
      default: "Chờ xác nhận"
    },
    shippingFee: {
      type: Number,
      default: 30000
    },
    total: Number,
    deliveryTime: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true
  }
);

// 🛠 Gán orderId tự động trước khi lưu
OrderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = "DH" + Date.now();
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
