import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import Product from "./model/product.model.js";

dotenv.config({ path: '../.env' });

console.log("🔹 MONGO_URI:", process.env.MONGO_URI);

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Danh sách sản phẩm theo từng loại
const constructionProductNames = [
  // cat
  "Cát vàng xây tô", "Cát đen san lấp", "Cát bê tông rửa", "Cát trắng mịn", "Cát hạt trung",
  // da
  "Đá 1x2 xanh", "Đá mi bụi", "Đá 4x6 đen", "Đá 0x4", "Đá hộc xây móng",
  // gach
  "Gạch không nung xi măng", "Gạch đất nung truyền thống", "Gạch ống 4 lỗ", "Gạch block bê tông", "Gạch tuynel",
  // gachmen
  "Gạch men lát nền 60x60", "Gạch men chống trượt 30x30", "Gạch men bóng kiếng", "Gạch men giả đá 40x40", "Gạch men ốp tường 25x40",
  // sat
  "Sắt hộp 40x80", "Sắt V 50x50", "Sắt tròn đặc 10mm", "Sắt U đen 100", "Sắt mạ kẽm 20x20",
  // son
  "Sơn nước nội thất Joton", "Sơn Dulux lau chùi hiệu quả", "Sơn Nippon Weatherbond", "Sơn Kova chống thấm", "Sơn Maxilite nội thất",
  // thep
  "Thép cây phi 16", "Thép cuộn Việt Nhật", "Thép hộp mạ kẽm 50x100", "Thép ống đúc",
  // ton
  "Tôn lạnh màu xanh dương", "Tôn mạ kẽm sóng vuông", "Tôn cách nhiệt PU",
  // ximang
  "Xi măng Hà Tiên PCB40", "Xi măng Nghi Sơn", "Xi măng Holcim", "Xi măng Chinfon", "Xi măng Fico PCB30"
];

// Map phân loại
const productTypeMap = {
  cat: constructionProductNames.slice(0, 5),
  da: constructionProductNames.slice(5, 10),
  gach: constructionProductNames.slice(10, 15),
  gachmen: constructionProductNames.slice(15, 20),
  sat: constructionProductNames.slice(20, 25),
  son: constructionProductNames.slice(25, 30),
  thep: constructionProductNames.slice(30, 34),
  ton: constructionProductNames.slice(34, 37),
  ximang: constructionProductNames.slice(37, 42),
};

// Hàm tìm loại sản phẩm từ tên
const getTypeFromName = (name) => {
  for (const [type, names] of Object.entries(productTypeMap)) {
    if (names.includes(name)) return type;
  }
  return "unknown";
};

// Hàm lấy ảnh ngẫu nhiên từ folder
const getRandomImageFromFolder = (typeFolder) => {
  const folderPath = path.join("images", typeFolder); // Đường vật lý
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
    return "";
  }

  const files = fs.readdirSync(folderPath).filter((file) =>
    file.match(/\.(jpg|png|webp)$/i)
  );

  if (files.length === 0) {
    console.warn(`⚠️ No image files found in: ${folderPath}`);
    return "";
  }

  const randomFile = files[Math.floor(Math.random() * files.length)];

  // Lấy BASE_URL từ biến môi trường và sử dụng nếu trên production
  const baseURL = process.env.NODE_ENV === "production" ? process.env.BASE_URL : "http://localhost:5000";
  
  // ❗ Thay đường dẫn tương đối bằng URL đầy đủ
  const imagePath = `${baseURL}/images/${typeFolder}/${randomFile}`;
  console.log(`✅ Selected image: ${imagePath}`);
  return imagePath;
};

// Tạo danh sách sản phẩm giả
const generateFakeProducts = (num) => {
  return Array.from({ length: num }, (_, i) => {
    const name = faker.helpers.arrayElement(constructionProductNames);
    const type = getTypeFromName(name);
    const image = getRandomImageFromFolder(type);

    console.log(`🛠️ [Product ${i + 1}] Name: ${name} | Type: ${type} | Image: ${image}`);

    return {
      name,
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 100000, max: 500000 }),
      image,
      stock: faker.number.int({ min: 10, max: 100 }),
      details: {
        material: faker.commerce.productMaterial(),
        weight: `${faker.number.int({ min: 10, max: 50 })}kg`,
        grade: `PCB${faker.number.int({ min: 30, max: 50 })}`,
        fineness: `${faker.number.int({ min: 3000, max: 4000 })} cm²/g`,
        compressive_strength: `${faker.number.int({ min: 30, max: 60 })} MPa`,
        SO3_content: `${faker.number.float({ min: 1.5, max: 3.0, fractionDigits: 1 })}%`,
        manufacturer: faker.company.name()
      }
    };
  });
};

// Seed dữ liệu
const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    const fakeProducts = generateFakeProducts(50);
    const insertedProducts = await Product.insertMany(fakeProducts);
    console.log("✅ Đã thêm 50 sản phẩm giả thành công!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Lỗi khi thêm dữ liệu giả:", error);
    mongoose.connection.close();
  }
};

seedProducts();
