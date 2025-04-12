import Cart from "../model/cart.model.js";
import mongoose from "mongoose";

export const getCartByUserId = async (req, res) => {
  try {
    const user = req.user;

    // Nếu là customer, chỉ cho truy cập giỏ hàng của chính mình
    const cart = await Cart.findOne({
      user: user.role === 'customer' ? user._id : req.query.userId || user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Không tìm thấy giỏ hàng." });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("❌ Error in getCartByUserId:", error.message);
    res.status(500).json({ success: false, message: "Lỗi server." });
  }
};
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // ✅ Lấy từ token đã decode

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
    console.error("❌ Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: error.message });
  }
};

  export const updateCartItemQuantity = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
  
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
      const userId = req.user.id; // 👈 lấy userId từ token đã decode
const { productIds } = req.body;
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
  
  
   