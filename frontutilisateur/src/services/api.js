import axios from 'axios';
console.log(process.env.REACT_APP_API_URL)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL });

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
   if (error.response) {
      const { status, data } = error.response;
           if (status === 401 || status === 403) {
        throw new Error('Identifiant ou mot de passe incorrect');
      }
      if (status === 429) { // Cas spécifique pour le rate limiting
        throw new Error(data.message || 'Trop de tentatives. Veuillez réessayer plus tard.');
      }
      
      throw new Error(data.message || `Erreur ${status} lors de la connexion`);
    } 
    // Cas 2 : Pas de réponse du serveur (problème réseau)
    else if (error.request) {
      throw new Error('Pas de réponse du serveur. Vérifiez votre connexion internet.');
    }
    // Cas 3 : Erreur lors de la configuration de la requête
    else {
      throw new Error('Erreur de configuration de la requête : ' + error.message);
    }
  }
  };

