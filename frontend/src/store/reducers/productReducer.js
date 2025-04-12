import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createProductSuccess(state, action) {
      state.products.unshift(action.payload);
    },
    updateProductSuccess(state, action) {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    toggleProductStatusSuccess(state, action) {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index].enabled = action.payload.enabled;
      }
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductSuccess,
  updateProductSuccess,
  toggleProductStatusSuccess,
} = productSlice.actions;

export default productSlice.reducer;