// api/axiosConfig.ts
import axios from "axios";
import store from "../store";

// Base URL configuration for your API
const baseURL = "http://localhost:4000/api";

// Create a protected instance of Axios
const apiProtected = axios.create({ baseURL });

// Interceptor to attach token for protected requests
apiProtected.interceptors.request.use(
  (config) => {
    // Access the token from Redux state
    const { auth } = store.getState(); // Assuming `auth` slice has userInfo and token
    const token = auth.userInfo?.token;

    // const token = localStorage.getItem("token"); // Get token from localStorage or sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiPublic = axios.create({ baseURL });
export default apiProtected;
