import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    details: {
        material: { type: String, required: true }, // Chất liệu
        weight: { type: String, required: true }, // Khối lượng tịnh
        grade: { type: String, required: true }, // Mác xi măng
        fineness: { type: String, required: true }, // Độ mịn
        compressive_strength: { type: String, required: true }, // Cường độ chịu nén
        SO3_content: { type: String, required: true }, // Hàm lượng SO3
        manufacturer: { type: String, required: true } // Nhà sản xuất
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
