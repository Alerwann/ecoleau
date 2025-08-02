import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

let currentAccessToken = null;

export const setAccessToken = (token) => {
  currentAccessToken = token;
};

export const getAccessToken = () => {
  return currentAccessToken;
};

// Intercepteur pour injecter le token
authApi.interceptors.request.use((config) => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

// Intercepteur pour rafraîchir le token
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré - le Context s'en occupera
      currentAccessToken = null;
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const loginAPI = async () => {
  try {
    const response = await authApi.post("/auth/login", {
      identifiant: "a",
      password: "a",
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Échec de la connexion");
  }
};

export const logoutAPI = async () => {
  try {
    await authApi.post("/auth/logout");
  } catch (error) {
    console.error("Erreur logout API:", error);
    throw error;
  }
};

export const userAuthentification = async () => {
  try {
    const response = await authApi.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur de rafraichissement", error);
    throw error;
  }
};

export default authApi;
