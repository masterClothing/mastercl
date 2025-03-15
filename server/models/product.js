"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // علاقة المنتج مع الفئة (واحد - متعدد)
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });

      // علاقة المنتج مع المناسبات (متعدد - متعدد)
      // through: "ProductOccasions" هو نفس اسم الجدول الوسيط
      // foreignKey: "productId" هو اسم العمود داخل ذلك الجدول
      Product.belongsToMany(models.Occasion, {
        through: "ProductOccasions",
        foreignKey: "productId",
        as: "occasions",
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isNewArrival: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      onSale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      paranoid: true, // دعم الـ Soft Delete
    }
  );

  return Product;
};
