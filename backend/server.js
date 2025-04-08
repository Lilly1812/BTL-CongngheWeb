import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ⬅ Thêm dòng này
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // ⬅ Cho phép CORS
app.use(express.json());

// Kết nối Database trước khi chạy server
connectDB();

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log("🚀 Server started at http://localhost:" + PORT);
});
