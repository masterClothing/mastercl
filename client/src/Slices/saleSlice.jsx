import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch Sale Products from API
export const fetchSaleProducts = createAsyncThunk(
  "sale/fetchSaleProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/category/Sale");
    return response.data.products; // API must return `{ success: true, products: [...] }`
  }
);

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSaleProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch sale products";
      });
  },
});

export default saleSlice.reducer;
