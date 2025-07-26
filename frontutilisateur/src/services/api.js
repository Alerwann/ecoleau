import axios from 'axios';
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
withCredentials:true});




api.interceptors.request.use((config) => {
  
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        const { status } = await axios.post('/api/refresh', {}, { 
          withCredentials: true 
        });
        
        if (status === 200) return api(originalRequest);
      } catch (refreshError) {
        // Gestion propre des erreurs
        if (refreshError.response?.status === 401) {
          window.location.href = '/login?error=session_expired';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Échec de la connexion');
  }
};

export const logout = async () => {
  await api.post('/logout', {}, { withCredentials: true });
  window.location.href = '/login';
};

