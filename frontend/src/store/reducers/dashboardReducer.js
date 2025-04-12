// src/store/reducers/dashboardReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  products: [],
  promotions: [],
  orders: [],
  stats: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardDataSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.promotions = action.payload.promotions;
      state.orders = action.payload.orders;
      state.stats = action.payload.stats;
    },
    fetchDashboardDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardDataStart,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
