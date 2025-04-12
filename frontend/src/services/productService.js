import apiInstance from "../utils/apiInstance";

export const fetchProducts = async (page = 1, perPage = 10, enabled = null) => {
  const params = { pageNo: page, perPage };
  if (enabled !== null) params.enabled = enabled;
  
  const response = await apiInstance.get("/products", { params });
  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};

export const createProduct = async (productData) => {
  const response = await apiInstance.post("/products", productData);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await apiInstance.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await apiInstance.put(`/products/${id}`, productData);
  return response.data;
};

export const toggleProductStatus = async (id, enabled) => {
  const response = await apiInstance.patch(`/products/${id}/enable`, { enabled });
  return response.data;
};