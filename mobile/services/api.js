import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "marhba_token";

const api = axios.create({
  baseURL: "http://192.168.1.22:5001/api",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
