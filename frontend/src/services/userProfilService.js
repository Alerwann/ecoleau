// services/userProfilServices.js

import axios from 'axios';


const profilApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});


export const getOneUserProfil = async (identifiant) => {
  try {
    const response = await profilApi.get(`/profils/getone/${identifiant}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profil');
  }
};

export const getAllUserProfils = async () => {
  try {
    const response = await profilApi.get('/profils/getAll');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profils');
  }
};