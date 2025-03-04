import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "./Slices/trendingSlice";
import cartReducer from "./Slices/cartSlice";
import favoriteReducer from "./Slices/favoriteSlice"; // ✅ تأكد من صحة المسار

const store = configureStore({
  reducer: {
    trending: trendingReducer,
    cart: cartReducer,
    favorite: favoriteReducer// ✅ تحقق أنه مضاف هنا
  },
});

export default store;
