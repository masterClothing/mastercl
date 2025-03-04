import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from "../Slices/favoriteSlice";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favoriteItems = useSelector((state) => state.favorite.favorite); // ✅ جلب المنتجات من المفضلة

  return (
    <div className="font-sans p-4 mx-auto lg:max-w-6xl md:max-w-3xl ">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Favorite Products
      </h2>

      {/* ✅ عرض رسالة إذا لم يكن هناك منتجات مضافة */}
      {favoriteItems.length === 0 ? (
        <p className="text-center text-gray-500">No favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoriteItems.map((item) => (
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
                  {/* ❌ زر إزالة المنتج من المفضلة */}
                  <button
                    type="button"
                    className="text-sm px-2 min-h-[36px] w-full bg-red-500 hover:bg-red-600 text-white tracking-wide ml-auto outline-none border-none rounded"
                    onClick={() => dispatch(removeFromFavorite(item.id))}
                  >
                    Remove from Favorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
