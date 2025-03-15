import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../Slices/allProductsSlice";
import { addToCart } from "../../Slices/cartSlice";
import { addToFavorite, removeFromFavorite } from "../../Slices/favoriteSlice";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.allProducts);
  const favoriteItems = useSelector((state) => state.favorite.favorite);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="font-sans p-6 mx-auto lg:max-w-7xl md:max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Products Collection
        </h2>
        <div className="hidden md:flex space-x-4">
          <button className="text-gray-500 hover:text-gray-800">Latest</button>
          <button className="text-gray-500 hover:text-gray-800">Popular</button>
          <button className="text-gray-500 hover:text-gray-800">
            Featured
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => {
          const isFavorite = favoriteItems.some((fav) => fav.id === product.id);
          const isHovered = hoveredProduct === product.id;

          const imageUrl = product.image.startsWith("http")
            ? product.image
            : `http://localhost:5000/uploads/${product.image}`;

          return (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div
                className="relative overflow-hidden"
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: { item: product },
                  })
                }
              >
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full object-cover object-top aspect-[4/5] transform transition-transform duration-500 hover:scale-105"
                />
                {product.oldPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h5 className="text-sm sm:text-base font-medium text-gray-800 truncate">
                    {product.name}
                  </h5>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center mt-3">
                    <h6 className="text-base sm:text-lg font-bold text-gray-900">
                      ${product.price}
                    </h6>
                    {product.oldPrice && (
                      <h6 className="ml-2 text-sm text-gray-500">
                        <strike>${product.oldPrice}</strike>
                      </h6>
                    )}
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 mt-4 transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-90"
                  }`}
                >
                  <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                      isFavorite
                        ? "bg-pink-100 text-pink-600"
                        : "bg-gray-100 text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                    } transition-colors duration-300`}
                    title={
                      isFavorite ? "Remove from wishlist" : "Add to wishlist"
                    }
                    onClick={() =>
                      isFavorite
                        ? dispatch(removeFromFavorite(product.id))
                        : dispatch(addToFavorite(product))
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      height="18px"
                      fill="currentColor"
                      viewBox="0 0 64 64"
                    >
                      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="text-sm font-medium px-4 py-2.5 flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 flex items-center justify-center"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && products.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
