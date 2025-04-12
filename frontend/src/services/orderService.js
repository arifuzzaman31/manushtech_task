import apiInstance from "../utils/apiInstance";

export const fetchOrders = async () => {
  try {
    const response = await apiInstance.get("/orders");
    return response.data?.orders || []; // Ensure we return an array
  } catch (error) {
    console.error("Error fetching orders:", error);
    return []; // Return empty array on error
  }
};

// In your orderService.js
export const fetchAvailableProducts = async () => {
  try {
    const response = await apiInstance.get("/products?enabled=true");
    return response.data?.data || []; // Ensure array is returned
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
};

export const fetchAvailablePromotions = async () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const response = await apiInstance.get(
    `/promotions?enabled=true&startDate_lte=${currentDate}&endDate_gte=${currentDate}`
  );
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await apiInstance.post("/orders", orderData);
  return response.data;
};

export const fetchUsers = async () => {
  try {
    const response = await apiInstance.get("auth/users?page=1&limit=100");
    return response.data?.users || []; // Ensure array is returned
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
};

// Helper function to calculate discounts
export const calculateDiscount = (product, promotion, quantity) => {
  if (!promotion) return 0;

  const totalWeight = product.weight * quantity;
  let discount = 0;

  switch (promotion.type) {
    case "fixed":
      discount = promotion.slabs[0].discount * quantity;
      break;
    case "percentage":
      discount =
        ((product.price * promotion.slabs[0].discount) / 100) * quantity;
      break;
    case "weighted":
      const slab = promotion.slabs.find(
        (s) =>
          s.minWeight <= totalWeight &&
          (!s.maxWeight || totalWeight <= s.maxWeight)
      );
      if (slab) {
        discount = slab.discount * quantity;
      }
      break;
    default:
      break;
  }

  return discount;
};
