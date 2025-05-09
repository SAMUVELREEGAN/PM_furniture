import axios from "axios";

// Configurable base URL
const BASE_URL = "http://127.0.0.1:8000";

// Create Axios instance with default settings
const api = axios.create({
  baseURL: `${BASE_URL}/api/`,  // Using the configurable base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Export both the configured instance and the base URL if needed elsewhere
export { BASE_URL };
export default api;