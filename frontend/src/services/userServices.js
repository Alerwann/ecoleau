import axios from 'axios';


const userApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

export const getAllUser = async () => {
  try {
   const usersData= await userApi.get('/user/users');
    console.log(usersData.data)
    return usersData.data
  } catch (error) {
    console.error('Erreur get API:', error);
    throw error;
  }
};

export const getOneUser = async(identifiant)=>{
  try{
    const usersData = await userApi.get(`/user/getone/${identifiant}`)
     console.log(usersData.data)
    return usersData.data
  }
  catch(error){
      if (error.response?.status === 404) {
      throw new Error("Utilisateur introuvable");
    }
      console.error('Erreur get API:', error);
    throw error;
  }
}







export default userApi