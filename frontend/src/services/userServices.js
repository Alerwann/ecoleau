import authApi from './authServices';



export const createUser =async(userData)=>{
  try{console.log('début createUser')

      const createData =await authApi.post("/user/createuser",userData);
      console.log(createData)
      return createData.data
  
  }catch(error){
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || "Données invalides");
    }
    if (error.response?.status === 403) {
      throw new Error("Droits insuffisants pour créer un compte");
    }
    if (error.response?.status === 409) {
      throw new Error("Un utilisateur avec cet identifiant existe déjà");
    }
    console.error('Erreur creation de compte:', error);
    throw new Error(error.response?.data?.error || 'Erreur lors de la création du compte');
  }


};


export const getAllUser = async () => {
  try {
   const usersData= await authApi.get('/user/users');
    console.log(usersData.data)
    return usersData.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur récupération profils');
  }
};

export const getOneUser = async(identifiant)=>{
  try{
    const usersData = await authApi.get(`/user/getone/${identifiant}`)
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


export const changeRole= async(identifiant, newRole, reason)=>{
  try{
    const roledata = await authApi.patch(`/change-role/${identifiant}`,{
      newRole,  // ← Le nouveau rôle
      reason    // ← La justification
    });
    console.log(roledata.data)
    return roledata.data
  }catch(error){
     if (error.response?.status === 404) {
      throw new Error("Utilisateur introuvable");
    }
      console.error('Erreur get API:', error);
    throw error;
  }
}


export const resetPassword =async(identifiant)=>{
  try{
    const passresetData =await authApi.post(`/reset-password/${identifiant}`)
    console.log(passresetData.data)
    return passresetData.data;
  }
  catch(error){
      if (error.response?.status === 404) {
      throw new Error("Utilisateur introuvable");
    }
    // Amélioration : Plus de cas d'erreur
    if (error.response?.status === 403) {
      throw new Error("Droits insuffisants pour réinitialiser ce mot de passe");
    }
    console.error('Erreur resetPassword:', error); // ← Nom plus précis
    throw new Error(error.response?.data?.error || 'Erreur réinitialisation mot de passe');
  }
}

export const toggleActive =async (identifiant, reason=null) =>{
  try{
     const body = reason ? { reason } : {};
    const toggleData = await authApi.patch(`/toggle-active/${identifiant}`,body)
    console.log(toggleData)
    return toggleData
  }
  catch(error){
    if (error.response?.status === 404) {
      throw new Error("Utilisateur introuvable");
    }
    // Amélioration : Plus de cas d'erreur
    if (error.response?.status === 403) {
      throw new Error("Droits insuffisants pour modifier l'activation du compte");
    }
    console.error('Erreur toggleActive:', error); // ← Nom plus précis
    throw new Error(error.response?.data?.error || 'Erreur désactivation du compte');
  }
}

