// src/services/dashboardService.js
import apiInstance from "../utils/apiInstance";

export const fetchProducts = async () => {
  const response = await apiInstance.get("/products?enabled=true");
  return response.data;
};

export const fetchPromotions = async () => {
  const response = await apiInstance.get("/promotions?enabled=true");
  return response.data;
};

export const fetchOrders = async () => {
  const response = await apiInstance.get("/orders?limit=5");
  // console.log(response.data);
  return response.data.orders;
};

export const fetchStats = async () => {
  const response = await apiInstance.get("/auth/dashboard/stats");
  return response.data;
};