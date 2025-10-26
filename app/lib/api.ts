import axios from "axios";
import { useAuthStore } from "@/app/lib/auth-store";

// Modifica esto si tu API corre en otro puerto/host
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";


export const api = axios.create({
baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});