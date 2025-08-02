// contexts/ProfilContext.jsx
import { createContext, useState, useEffect, useContext} from "react";


import { useAuth } from "./Authcontext";
import { getOneUserProfil, getAllUserProfils } from "../services/userProfilService";

const ProfilContext = createContext();

export const ProfilProvider = ({ children }) => {
  const [currentUserProfil, setCurrentUserProfil] = useState(null);
  const [profils, setProfils] = useState([]);
  const [profilLoading, setProfilLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, isAuthenticated, loading, authComplete  } = useAuth();

  console.log("🔍 ProfilContext reçoit:", { 
  user: !!user, 
  isAuthenticated, 
  loading, 
  authComplete 
});

  const getAllProfils = async () => {
    try {
      setProfilLoading(true);
      const response = await getAllUserProfils(); // ← Service profils
      setProfils(response.profils);
      return response;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setProfilLoading(false);
    }
  };

  useEffect(() => {
  const fetchUserProfil = async () => {
    console.log("📊 État profil:", { loading, authComplete, isAuthenticated, hasUser: !!user });
    
    // Attendre que l'auth soit complètement terminée
    if (loading || !authComplete) {
      console.log("⏳ En attente de l'auth...");
      return;
    }
    
    if (!isAuthenticated || !user?.identifiant) {
      console.log("❌ Utilisateur non connecté");
      setCurrentUserProfil(null);
      return;
    }

    setProfilLoading(true);
    try {
      console.log("🔍 Récupération profil pour:", user.identifiant);
      const userProfil = await getOneUserProfil(user.identifiant);
      setCurrentUserProfil(userProfil);
      console.log("✅ Profil utilisateur récupéré:", userProfil);
    } catch (err) {
      console.error("❌ Erreur profil:", err);
      setError(err.message);
      setCurrentUserProfil(null);
    } finally {
      setProfilLoading(false);
    }
  };

  fetchUserProfil();
}, [user, isAuthenticated, loading, authComplete]); // ← Ajoutez authComplete dans les dépendances
  return (
    <ProfilContext.Provider
      value={{
        authUser: user,              // ← Données auth (User)
        currentUserProfil,           // ← Données profil (UserProfil)
        profils,                     // ← Liste des profils
        profilLoading,
        error,
        getAllProfils,
      }}
    >
      {children}
    </ProfilContext.Provider>
  );
  
};



export const useProfil = () => {
  const context = useContext(ProfilContext);
  if (!context) {
    throw new Error("useProfil must be used within a ProfilProvider");
  }
  return context;
};

export default ProfilContext;