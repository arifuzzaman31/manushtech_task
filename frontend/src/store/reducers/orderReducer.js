import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  users: [],
  availableProducts: [],
  availablePromotions: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess(state, action) {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderSuccess(state, action) {
      state.orders.unshift(action.payload);
    },
    fetchAvailableProductsSuccess(state, action) {
      state.availableProducts = action.payload;
    },
    fetchAvailablePromotionsSuccess(state, action) {
      state.availablePromotions = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    fetchUsersData(state, action) {
      state.users = action.payload;
    },
    // In your orderReducer.js
    addOrderItem: (state, action) => {
      if (!state.currentOrder) {
        state.currentOrder = {
          customerId: null,
          items: [],
          appliedPromotions: [],
        };
      }
      state.currentOrder.items.push(action.payload);
    },
    removeOrderItem(state, action) {
      state.currentOrder.items.splice(action.payload, 1);
    },
    updateOrderItemQuantity(state, action) {
      const { index, quantity } = action.payload;
      state.currentOrder.items[index].quantity = quantity;
    },
    applyPromotionToItem(state, action) {
      const { itemIndex, promotionId } = action.payload;
      state.currentOrder.items[itemIndex].appliedPromotion = promotionId;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderSuccess,
  fetchAvailableProductsSuccess,
  fetchAvailablePromotionsSuccess,
  setCurrentOrder,
  fetchUsersData,
  addOrderItem,
  removeOrderItem,
  updateOrderItemQuantity,
  applyPromotionToItem,
  clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
