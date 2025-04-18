import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import userRoutes from "./routes/user.route.js"; 
import orderRoutes from "./routes/order.route.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _dirname = path.resolve();

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/users", userRoutes); 
app.use("/api/orders", orderRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
    console.log("🚀 Server started at http://localhost:" + PORT);
});
