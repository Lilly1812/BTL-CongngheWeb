import Product from "../model/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("❌ Error in Get All Products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
