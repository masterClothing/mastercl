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


// Replace with the exact origin(s) you want to allow
const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,   // cannot be '*'
  credentials: true         // <--- Required for fetch/axios to include cookies
}));

// ✅ Routes
app.use("/api/users", authRoutes);
app.use("/api", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/api", userRoutes);
app.use("/api/occasion", occasionRoutes);





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
