// services/userProfilServices.js


import authApi from './authServices';


export const getOneUserProfil = async (identifiant) => {
  try {
    const response = await authApi.get(`/profils/getone/${identifiant}`);
    return response.data.profil;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profil');
  }
};

export const getAllUserProfils = async () => {
  try {
    const response = await authApi.get('/profils/getAll');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profils');
  }
};