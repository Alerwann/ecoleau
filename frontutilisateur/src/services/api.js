import axios from 'axios';
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL });

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Échec de la connexion');
  }
};

export const logout = async () => {
  try{
     await api.post('/auth/logout', {}, { withCredentials: true });
 
  }catch(error){
   console.error('Erreur logout APi:', error)
  }
  window.location.href = '/login';

};

