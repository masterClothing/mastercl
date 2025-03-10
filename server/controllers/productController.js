const { Product, Category } = require("../models"); // ✅ Ensure models are correctly imported

// ✅ جلب جميع المنتجات
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء جلب المنتجات", error });
  }
};

// ✅ جلب منتج واحد حسب ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء جلب المنتج", error });
  }
};

// ✅ جلب المنتجات حسب الفئة (Men, Women, Kids, Sale, New Arrivals)

// ✅ جلب المنتجات حسب الفئة (Men, Women, Kids, Sale)
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category; // ✅ Ensure categoryName is defined

    console.log(`✅ Fetching Products for Category: ${categoryName}`);

    // ✅ ابحث عن الفئة في قاعدة البيانات
    const category = await Category.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `❌ No category found with name: ${categoryName}`,
      });
    }

    // ✅ جلب المنتجات التي تنتمي لهذه الفئة
    const products = await Product.findAll({
      where: { categoryId: category.id },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: `❌ No products found in category: ${categoryName}`,
      });
    }

    res.json({ success: true, products });
  } catch (error) {
    console.error(
      `🔥 Error fetching products for category: ${req.params.category}`, // ✅ Now using `req.params.category`
      error
    );
    res.status(500).json({
      success: false,
      message: "🔥 Error fetching products",
      error: error.message,
    });
  }
};

// ✅ جلب جميع المنتجات الجديدة (New Arrivals)
// ✅ جلب جميع المنتجات الجديدة (New Arrivals)
exports.getNewArrivals = async (req, res) => {
  try {
    console.log("Fetching new arrival products...");
    const newArrivals = await Product.findAll({
      where: { isNewArrival: true },
      logging: console.log, // Log the generated SQL query
    });

    if (!newArrivals || newArrivals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "❌ No new arrival products found",
      });
    }

    res.json({ success: true, newArrivals });
  } catch (error) {
    console.error("🔥 Error fetching new arrival products:", error);
    res.status(500).json({
      success: false,
      message: "🔥 Error fetching new arrival products",
      error: error.message,
    });
  }
};