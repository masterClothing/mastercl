"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductOccasion extends Model {
    static associate(models) {
      // غالباً لا نعرّف علاقات هنا
      // لأن العلاقات الحقيقية تُضبط داخل Models: Product و Occasion.
    }
  }

  ProductOccasion.init(
    {
      // لو أردت إظهار أعمدة الـ productId و occasionId هنا
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      occasionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // إن أردت إضافة حقول أخرى مثل تاريخ انتهاء المناسبة أو نسبة خصم معينة ... إلخ
      // discountRate: {
      //   type: DataTypes.FLOAT,
      //   defaultValue: 0,
      // },
    },
    {
      sequelize,
      modelName: "ProductOccasion",
      tableName: "ProductOccasions", // يجب أن يطابق اسم الجدول في الـMigration
      timestamps: true, // لو أردت استخدام createdAt و updatedAt
    }
  );

  return ProductOccasion;
};
