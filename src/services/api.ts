import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("hintro-user-id") || "u1";
    config.headers["x-user-id"] = userId;
  }
  return config;
});

export default api;
