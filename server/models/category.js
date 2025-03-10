"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: "categoryId",
        as: "products",
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // ✅ الفئات لا يجب أن تتكرر
      },
    },
    {
      sequelize,
      modelName: "Category", // ✅ تأكد من أن الاسم مطابق تمامًا
      timestamps: true,
    }
  );

  return Category;
};
