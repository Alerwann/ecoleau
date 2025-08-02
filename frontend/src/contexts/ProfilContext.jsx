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

  const { user, isAuthenticated, loading } = useAuth();

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
      if (loading) return;
      if (!isAuthenticated || !user?.identifiant) {
        setCurrentUserProfil(null);
        return;
      }

      setProfilLoading(true);
      try {
        console.log(user.identifiant)
        const userProfil = await getOneUserProfil(user.identifiant);
        setCurrentUserProfil(userProfil);
        console.log("✅ Profil utilisateur récupéré:", userProfil);
      } catch (err) {
        console.error("❌ Erreur profil:", err);
        setError(err.message);
      } finally {
        setProfilLoading(false);
      }
    };

    fetchUserProfil();
  }, [user, isAuthenticated, loading]);

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