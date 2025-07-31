import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});


let currentAccessToken=null;


export const setAccessToken = (token)=>{
  currentAccessToken=token;
};


export const getAccessToken = () => {
  return currentAccessToken;
};




// Intercepteur pour injecter le token
api.interceptors.request.use(config => {
if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

// Intercepteur pour rafraîchir le token
api.interceptors.response.use(
  response => response,
   async error => {
    if (error.response?.status === 401) {
      // Token expiré - le Context s'en occupera
      currentAccessToken = null;
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Échec de la connexion');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Erreur logout API:', error);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
     const response = await api.post('/auth/refresh-token', {}, {
      withCredentials: true  
    });
    return response.data;
  } catch (error) {
    console.error('Erreur de rafraichissement', error);
    throw error;
  }
};

export default api;