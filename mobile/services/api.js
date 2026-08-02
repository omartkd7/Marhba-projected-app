import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export const TOKEN_KEY = "marhba_token";
const BACKEND_PORT = 5001;

// Reprend l'IP locale que le serveur Metro d'Expo utilise déjà pour connecter
// le téléphone — évite d'avoir à la mettre à jour à la main à chaque changement de réseau.
const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(":")[0];

  if (!host) {
    throw new Error(
      "Impossible de détecter l'IP du serveur de dev — lance l'app via `npx expo start`."
    );
  }

  return `http://${host}:${BACKEND_PORT}/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
