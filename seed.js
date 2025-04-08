import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Product from "./backend/model/product.model.js"; // Đảm bảo import đúng model

dotenv.config(); // Load biến môi trường từ .env
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Tạo danh sách sản phẩm giả
const generateFakeProducts = (num) => {
  return Array.from({ length: num }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 100000, max: 500000 }), // Giá ngẫu nhiên từ 100k - 500k
    image: faker.image.url(), // Ảnh sản phẩm ngẫu nhiên
    stock: faker.number.int({ min: 10, max: 100 }), // Số lượng tồn kho
    details: {
      material: faker.commerce.productMaterial(),
      weight: `${faker.number.int({ min: 10, max: 50 })}kg`,
      grade: `PCB${faker.number.int({ min: 30, max: 50 })}`,
      fineness: `${faker.number.int({ min: 3000, max: 4000 })} cm²/g`,
      compressive_strength: `${faker.number.int({ min: 30, max: 60 })} MPa`,
      SO3_content: `${faker.number.float({ min: 1.5, max: 3.0, fractionDigits: 1 })}%`,
      manufacturer: faker.company.name()
    }
  }));
};

// Seed dữ liệu
const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Xóa toàn bộ dữ liệu cũ
    const fakeProducts = generateFakeProducts(100); // Tạo 100 sản phẩm giả
    const insertedProducts = await Product.insertMany(fakeProducts);
    console.log("✅ Đã thêm 100 sản phẩm giả thành công!", insertedProducts);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu giả:", error);
    mongoose.connection.close();
  }
};

// Chạy seed script
seedProducts();
