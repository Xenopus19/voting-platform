import type { ServerErrorResponse } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverError: ServerErrorResponse = {message: "An error occured."};
    if (error.response.data) {
      serverError.message = error.response?.data.message;

      if (error.response.data.details) {
        serverError.details = error.response.data.details;
      }
    }

    return Promise.reject(serverError);
  },
);

export default api;
