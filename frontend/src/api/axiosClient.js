import axios from "axios";

// Standard environment variable fallback
const BASE_URL =
//   process.env.REACT_APP_API_URL ||
  import.meta.env?.VITE_API_URL ||
  "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s request timeout
});

// Request Interceptor: Automatically attach JWT Token from any storage key
axiosClient.interceptors.request.use(
  (config) => {
    // Check all standard token storage patterns
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;