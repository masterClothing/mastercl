module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        name: "T-Shirt",
        description: "A high-quality cotton T-Shirt",
        price: 20.99,
        image: "https://via.placeholder.com/150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sneakers",
        description: "Comfortable running sneakers",
        price: 49.99,
        image: "https://via.placeholder.com/150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
