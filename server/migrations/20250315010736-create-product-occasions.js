"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductOccasions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products", // اسم جدول المنتجات
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      occasionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Occasions", // اسم جدول المناسبات
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductOccasions");
  },
};
