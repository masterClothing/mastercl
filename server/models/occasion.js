"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Occasion extends Model {
    static associate(models) {
      // علاقة متعدد - متعدد مع المنتجات
      // through: "ProductOccasions" هو اسم الجدول الوسيط
      // foreignKey: "occasionId" هو اسم العمود داخل ذلك الجدول
      Occasion.belongsToMany(models.Product, {
        through: "ProductOccasions",
        foreignKey: "occasionId",
        as: "products",
      });
    }
  }
  Occasion.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Occasion",
    }
  );
  return Occasion;
};
