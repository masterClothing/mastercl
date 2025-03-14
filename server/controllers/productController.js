const { Product, Category } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء جلب المنتجات", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "خطأ أثناء جلب المنتج", error });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;

    console.log(`✅ Fetching Products for Category: ${categoryName}`);

    const category = await Category.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: `❌ No category found with name: ${categoryName}`,
      });
    }

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
      `🔥 Error fetching products for category: ${req.params.category}`,
      error
    );
    res.status(500).json({
      success: false,
      message: "🔥 Error fetching products",
      error: error.message,
    });
  }
};

exports.getNewArrivals = async (req, res) => {
  try {
    const newArrivals = await Product.findAll({
      where: {
        isNewArrival: true,
      },
      include: [{ model: Category, as: "category" }],
    });

    res.status(200).json(newArrivals);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
