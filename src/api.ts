// ✅ Works with ALL Axios versions
import axios from "axios";

const API = axios.create({
  baseURL: "https://btechng-backend.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
