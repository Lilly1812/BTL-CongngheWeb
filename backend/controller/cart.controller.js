import Cart from "../model/cart.model.js";
import mongoose from "mongoose";

export const getAllCarts = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product"); // dùng đúng field
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json(cart);
  } catch (error) {
    console.error("Lỗi khi lấy giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // Nếu chưa có giỏ hàng thì tạo mới
        cart = new Cart({ user: userId, items: [] });
      }
  
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
  
      if (itemIndex >= 0) {
        // Nếu đã có sản phẩm đó thì tăng số lượng
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Nếu chưa có thì thêm mới
        cart.items.push({ product: productId, quantity });
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  export const updateCartItemQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      const item = cart.items.find(
        (item) => item.product.toString() === productId
      );
  
      if (!item) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
  
      item.quantity = quantity;
  
      await cart.save();
  
      res.status(200).json(cart);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  };
  export const removeSelected = async (req, res) => {
    try {
      const { userId, productIds } = req.body;
      console.log("📦 Xóa sản phẩm:", { userId, productIds });
      
      if (!userId || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: "Dữ liệu không hợp lệ." });
      }
  
      const objectIds = productIds.map((id) => new mongoose.Types.ObjectId(id));
  
      const result = await Cart.updateOne(
        { user: userId },
        {
          $pull: {
            items: {
              product: { $in: objectIds },
            },
          },
        }
      );
  
      console.log("🧹 Kết quả xóa:", result);
  
      return res.status(200).json({ message: "Đã xóa các sản phẩm đã chọn." });
    } catch (error) {
      console.error("❌ Lỗi khi xóa nhiều sản phẩm:", error);
      return res.status(500).json({ error: "Lỗi server khi xóa sản phẩm." });
    }
  };
  
  
   