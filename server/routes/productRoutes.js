const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// ✅ جميع المنتجات
router.get("/", productController.getAllProducts);

// ✅ منتج حسب ID
router.get("/:id", productController.getProductById);

// ✅ المنتجات حسب الفئة
router.get("/category/:category", productController.getProductsByCategory);

// ✅ المنتجات الجديدة
router.get("/new-arrivals", productController.getNewArrivals);
module.exports = router;
