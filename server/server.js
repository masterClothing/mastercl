require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/CategoriesRoutes");
const userRoutes = require("./routes/userRoutes");
const occasionRoutes = require("./routes/occasionRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/users", authRoutes);
app.use("/api", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api/occasion", occasionRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "❌ المسار غير موجود" });
});

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "🔥 خطأ في السيرفر!", error: err.message });
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
