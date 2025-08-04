// services/userProfilServices.js
export const getProfilsWithoutAccount = async () => {
  try {
    const response = await authApi.get('/profils/without-account');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Erreur récupération profils');
  }
};