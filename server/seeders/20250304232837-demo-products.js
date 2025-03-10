"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      // ✅ ملابس رجالي
      {
        name: "تيشيرت قطن أسود",
        description: "تيشيرت رجالي قطن 100% بتصميم كلاسيكي",
        price: 15.99,
        image: "mens_tshirt_black.jpg",
        stock: 50,
        categoryId: 1, // Men
        isNewArrival: false,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "بنطلون جينز أزرق",
        description: "بنطلون جينز مريح للرجال من ماركة مشهورة",
        price: 39.99,
        image: "mens_jeans_blue.jpg",
        stock: 30,
        categoryId: 1,
        isNewArrival: true, // ✅ منتج جديد
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "جاكيت شتوي أسود",
        description: "جاكيت رجالي مقاوم للبرد مصنوع من الصوف",
        price: 79.99,
        image: "mens_jacket_black.jpg",
        stock: 20,
        categoryId: 1,
        isNewArrival: false,
        onSale: true, // ✅ منتج في التخفيضات
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ ملابس نسائي
      {
        name: "فستان سهرة أنيق",
        description: "فستان نسائي فاخر مصنوع من الحرير بتصميم أنيق",
        price: 129.99,
        image: "womens_evening_dress.jpg",
        stock: 15,
        categoryId: 2, // Women
        isNewArrival: true,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "بلوزة حرير وردية",
        description: "بلوزة حريرية ناعمة ومريحة بتصميم أنيق",
        price: 25.99,
        image: "womens_silk_blouse.jpg",
        stock: 35,
        categoryId: 2,
        isNewArrival: false,
        onSale: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ ملابس أطفال
      {
        name: "تيشيرت أطفال ملون",
        description: "تيشيرت قطن 100% بألوان زاهية للأطفال",
        price: 10.99,
        image: "kids_tshirt_colored.jpg",
        stock: 50,
        categoryId: 3, // Kids
        isNewArrival: true,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "بنطلون أطفال جينز",
        description: "بنطلون جينز مريح وعالي الجودة للأطفال",
        price: 29.99,
        image: "kids_jeans_blue.jpg",
        stock: 30,
        categoryId: 3,
        isNewArrival: false,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ منتجات ضمن قسم التخفيضات
      {
        name: "حذاء رياضي رجالي مخفض",
        description: "حذاء رياضي مريح مصنوع من الجلد الصناعي",
        price: 45.99,
        image: "mens_sneakers_sale.jpg",
        stock: 25,
        categoryId: 4, // Sale
        isNewArrival: false,
        onSale: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "حقيبة نسائية جلدية - خصم 40%",
        description: "حقيبة يد أنيقة تناسب جميع المناسبات",
        price: 59.99,
        image: "womens_handbag_sale.jpg",
        stock: 15,
        categoryId: 4,
        isNewArrival: false,
        onSale: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // ✅ منتجات جديدة (New Arrivals)
      {
        name: "ساعة يد أنيقة للرجال",
        description: "ساعة فاخرة مقاومة للماء بتصميم أنيق",
        price: 99.99,
        image: "mens_watch_new.jpg",
        stock: 10,
        categoryId: 5, // New Arrivals
        isNewArrival: true,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "نظارات شمسية نسائية جديدة",
        description: "نظارات شمسية مع حماية UV",
        price: 35.99,
        image: "womens_sunglasses_new.jpg",
        stock: 20,
        categoryId: 5,
        isNewArrival: true,
        onSale: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
