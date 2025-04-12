import axios from "axios";
import store from "../store";
import { authActions } from "../store/reducers/authReducer";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
apiInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with refresh token logic
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 error and not a login request and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = store.getState().auth.refreshToken;
        if (!refreshToken) throw new Error("No refresh token available");
        
        // Call refresh token endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Dispatch action to update tokens in Redux store
        store.dispatch(authActions.updateAccessToken(accessToken));
        store.dispatch(authActions.updateRefreshToken(newRefreshToken));
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear auth state and redirect to login
        store.dispatch(authActions.signout());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    // For all other errors
    return Promise.reject(error);
  }
);

export default apiInstance;