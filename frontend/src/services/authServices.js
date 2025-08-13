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
   console.log('🚀 Requête envoyée vers:', config.url);
  console.log('🍪 withCredentials:', config.withCredentials);
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  
  return config;
});

// Intercepteur pour rafraîchir le token

authApi.interceptors.response.use(
  (response) => response, // ✅ Laisser passer toutes les réponses réussies
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré - le Context s'en occupera
      currentAccessToken = null;
    }
    
    // 🎯 Redirection SEULEMENT si c'est une vraie erreur 403
    // if (error.response?.status === 403 && error.response?.data?.requirePasswordChange) {
    //   console.log("🔄 Redirection vers changement de mot de passe");
    //   window.location.href = '/change-password';
    // }
    
    return Promise.reject(error);
  }
);


export const loginAPI = async (credentials) => {
  try {
    const response = await authApi.post("/auth/login", credentials);
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
     console.log('🔄 Tentative refresh token...');
    console.log('🍪 Cookies disponibles:', document.cookie);
    const response = await authApi.post("/auth/refresh-token" );
    return response.data;
  } catch (error) {
    console.error("Erreur de rafraichissement", error);
    throw error;
  }
};

export const changePasswordAPI = async (currentPassword, newPassword) => {
  try {
    const response = await authApi.put("/auth/change-password", {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Erreur lors du changement de mot de passe");
  }
};

export default authApi;
