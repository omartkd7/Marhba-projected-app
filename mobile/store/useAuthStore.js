import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api, { TOKEN_KEY } from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  register: async (fullName, email, password) => {
    const { data } = await api.post("/auth/register", { fullName, email, password });
    await SecureStore.setItemAsync(TOKEN_KEY, data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    await SecureStore.setItemAsync(TOKEN_KEY, data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },

  restoreSession: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (!token) {
      set({ isLoading: false });
      return;
    }

    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, token, isAuthenticated: true, isLoading: false });
    } catch {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default useAuthStore;
