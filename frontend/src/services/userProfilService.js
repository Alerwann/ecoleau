// services/userProfilServices.js


import authApi from './authServices';


export const getOneUserProfil = async (_id) => {
  try {
    const response = await authApi.get(`/profils/getone/${_id}`);
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

export const getProfilsWithoutAccount = async () => {
  try {

    const response = await authApi.get('/profils/without-account');
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur récupération profils');
  }
};

export const getUserProfilByID =async (id)=>{
try{  const response = await authApi.get(`/profils/getonebyid/${id}`);
  return response.data.profil;}
   catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profil');}


}