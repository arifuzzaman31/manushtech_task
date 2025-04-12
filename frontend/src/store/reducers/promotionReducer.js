import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 10,
    total: 0,
  },
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    fetchPromotionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPromotionsSuccess(state, action) {
      state.promotions = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchPromotionsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createPromotionSuccess(state, action) {
      state.promotions.unshift(action.payload);
    },
    updatePromotionSuccess(state, action) {
      const index = state.promotions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.promotions[index] = action.payload;
      }
    },
    togglePromotionStatusSuccess(state, action) {
      const index = state.promotions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.promotions[index].enabled = action.payload.enabled;
      }
    },
  },
});

export const {
  fetchPromotionsStart,
  fetchPromotionsSuccess,
  fetchPromotionsFailure,
  createPromotionSuccess,
  updatePromotionSuccess,
  togglePromotionStatusSuccess,
} = promotionSlice.actions;

export default promotionSlice.reducer;