import apiInstance from "../utils/apiInstance";

export const fetchPromotions = async () => {
  const response = await apiInstance.get("/promotions");
  return response.data;
};

export const createPromotion = async (promotionData) => {
  const response = await apiInstance.post("/promotions", promotionData);
  return response.data;
};

export const fetchPromotionById = async (id) => {
  const response = await apiInstance.get(`/promotions/${id}`);
  return response.data;
};

export const updatePromotion = async (id, promotionData) => {
  const response = await apiInstance.put(`/promotions/${id}`, promotionData);
  return response.data;
};

export const togglePromotionStatus = async (id) => {
  const response = await apiInstance.patch(`/promotions/${id}/enable`);
  return response.data;
};