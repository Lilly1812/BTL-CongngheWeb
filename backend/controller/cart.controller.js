import Cart from "../model/cart.model.js";

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