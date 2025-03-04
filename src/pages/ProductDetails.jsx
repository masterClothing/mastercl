import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import { addToFavorite } from "../Slices/favoriteSlice";

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const item = location.state?.item; // استقبال بيانات المنتج

  if (!item) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>;
  }

  return (
    <div className="font-[sans-serif] bg-gray-50">
      {/* 📌 Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 🔹 Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white p-6 rounded-2xl shadow-lg">
              <img
                src={item.image}
                className="w-full h-full object-contain hover:scale-105 transition-transform"
                alt={item.name}
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-semibold">
                25% OFF
              </div>
            </div>
          </div>

          {/* 🔹 Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{item.name}</h1>
            <p className="text-gray-600 mt-2">{item.description}</p>

            <div className="text-4xl font-bold text-gray-900">
              ${item.price}
              {item.oldPrice && (
                <span className="text-xl text-gray-500 line-through ml-2">
                  ${item.oldPrice}
                </span>
              )}
            </div>

            {/* 🔹 Action Buttons */}
            <div className="flex gap-4 mt-6">
              {/* ✅ زر الإضافة إلى السلة */}
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                onClick={() => dispatch(addToCart(item))}
              >
                Add to Cart
              </button>

              {/* ✅ زر الإضافة إلى المفضلة */}
              <button
                className="p-4 border-2 border-gray-200 hover:border-pink-400 rounded-xl transition-colors"
                onClick={() => dispatch(addToFavorite(item))}
              >
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-pink-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
