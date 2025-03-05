import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingItems } from "../../Slices/trendingSlice";
import { addToCart } from "../../Slices/cartSlice";
import { addToFavorite, removeFromFavorite } from "../../Slices/favoriteSlice"; // ✅ استيراد الحذف من المفضلة
import { useNavigate } from "react-router-dom";

const discoverMore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading, error } = useSelector((state) => state.trending);
  const favoriteItems = useSelector((state) => state.favorite.favorite); // ✅ الحصول على المفضلة من Redux

  useEffect(() => {
    dispatch(fetchTrendingItems());
  }, [dispatch]);

  return (
    <div>
      <div className="font-sans p-4 mx-auto lg:max-w-6xl md:max-w-3xl ">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Trending</h2>

        {/* 🔄 عرض رسالة تحميل أو خطأ */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const isFavorite = favoriteItems.some((fav) => fav.id === item.id); // ✅ التحقق إذا كان المنتج في المفضلة

            return (
              <div
                key={item.id}
                className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                {/* ✅ التنقل إلى صفحة التفاصيل عند الضغط على الصورة */}
                <div
                  className="w-full"
                  onClick={() =>
                    navigate(`/product/${item.id}`, { state: { item } })
                  }
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full object-cover object-top aspect-[230/307]"
                  />
                </div>

                <div className="p-2 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h5 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                      {item.name}
                    </h5>
                    <p className="mt-1 text-gray-500 truncate">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap justify-between gap-2 mt-2">
                      <div className="flex gap-2">
                        <h6 className="text-sm sm:text-base font-bold text-gray-800">
                          ${item.price}
                        </h6>
                        {item.oldPrice && (
                          <h6 className="text-sm sm:text-base text-gray-500">
                            <strike>${item.oldPrice}</strike>
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    {/* ❤️ زر الإضافة إلى المفضلة */}
                    <div
                      className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
                      title="Wishlist"
                      onClick={() =>
                        isFavorite
                          ? dispatch(removeFromFavorite(item.id))
                          : dispatch(addToFavorite(item))
                      } // ✅ التبديل بين الإضافة والحذف من المفضلة
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className={`fill-${
                          isFavorite ? "red-600" : "pink-600"
                        } inline-block`} // ✅ تغيير لون القلب إذا كان المنتج مضافًا
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>

                    {/* 🛒 زر الإضافة إلى السلة */}
                    <button
                      type="button"
                      className="text-sm px-2 min-h-[36px] w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                      onClick={() => dispatch(addToCart(item))}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default discoverMore;
