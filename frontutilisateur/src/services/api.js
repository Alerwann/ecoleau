import axios from 'axios';
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL });

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Échec de la connexion');
  }
};

// export const getCurrentUser = async () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

  // try {
  //   const response = await api.get('/api/me', {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   });
  //   return response.data;
  // } catch (error) {
  //   localStorage.removeItem('token');
  //   return null;
  // }
// };