// contexts/ProfilContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

import { useAuth } from "./Authcontext";
import {
  getOneUserProfil,
  getAllUserProfils,
  getUserProfilByID,
} from "../services/userProfilService";

const ProfilContext = createContext();

export const ProfilProvider = ({ children }) => {
  const [currentUserProfil, setCurrentUserProfil] = useState(null);
  const [profils, setProfils] = useState([]);
  const [profilLoading, setProfilLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, isAuthenticated, loading, authComplete } = useAuth();

  console.log("🔍 ProfilContext reçoit:",user, {
    user: !!user,
    isAuthenticated,
    loading,
    authComplete,
  });

  const getAllProfils = async () => {
    try {
      setProfilLoading(true);
      const response = await getAllUserProfils(); // ← Service profils
      console.log(response,'get all response')
      setProfils(response.profils);
      return response;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setProfilLoading(false);
    }
  };

  const getOneProfil = async (identifiantRH) => {
    try {
      
      setProfilLoading(true);

      const response = await getOneUserProfil(identifiantRH);
      setProfils(response.profils);
      return response;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setProfilLoading(false);
    }
  };

  const getProfilById = async (id) => {
    try {
      setProfilLoading(true);
      const response = await getUserProfilByID(id);
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
      console.log("📊 État profil:", {
        loading,
        authComplete,
        isAuthenticated,
        hasUser: !!user,
      }
    );

      // Attendre que l'auth soit complètement terminée
      if (loading || !authComplete) {
        
        return;
      }

      if (!isAuthenticated || !user?.identifiant) {
       console.log('pas authentifier et pas user identifiant')
        setCurrentUserProfil(null);
        return;
      }

      setProfilLoading(true);
      try {
       console.log(user.userId)
        const userProfil = await getProfilById(user.userId);
        
        setCurrentUserProfil(userProfil);
        
      } catch (err) {
        
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
        authUser: user, // ← Données auth (User)
        currentUserProfil, // ← Données profil (UserProfil)
        profils, // ← Liste des profils
        profilLoading,
        error,
        getAllProfils,
        getOneProfil,
        getProfilById
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
