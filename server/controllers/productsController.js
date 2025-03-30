const { Product } = require("../models");
const upload = require("../config/multerConfig");

// Create Product
const createProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const {
        name,
        description,
        price,
        categoryId,
        occasionId,
        stock,
        status,
        isNewArrival,
        onSale,
      } = req.body;

      const image = req.file ? req.file.path : null;

      const product = await Product.create({
        name,
        description,
        price,
        categoryId,
        occasionId,
        image,
        stock,
        status,
        isNewArrival,
        onSale,
      });

      res
        .status(201)
        .json({ message: "Product created successfully", product });
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Edit Single Product
const updateProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      const { id } = req.params;
      const updateData = req.body;

      if (req.file) {
        updateData.image = req.file.path;
      }

      const [updated] = await Product.update(updateData, {
        where: { id },
      });

      if (updated) {
        const updatedProduct = await Product.findByPk(id);
        return res.status(200).json({
          message: "Product updated successfully",
          product: updatedProduct,
        });
      }
      return res.status(404).json({ message: "Product not found" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete Single Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({
      where: { id },
    });

    if (deleted) {
      return res.status(200).json({ message: "Product deleted successfully" });
    }
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Get Product Count
const getProductCount = async (req, res) => {
  try {
    const count = await Product.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error getting product count", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductCount,
};
