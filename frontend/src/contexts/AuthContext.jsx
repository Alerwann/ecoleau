import { createContext, useState, useEffect, useContext } from "react";
import {
  setAccessToken,
  userAuthentification as apiuserAuthentification,
  loginAPI,
  logoutAPI,
} from "../services/authServices";

import { useNavigate } from "react-router-dom";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authComplete, setAuthComplete] = useState(false);

  const updateAccessToken = (token) => {
    setAccessTokenState(token);
    setAccessToken(token); // Met à jour api.js
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await apiuserAuthentification();

        updateAccessToken(response.accessToken);
        setUser(response.user);
        setAuthComplete(true);
      } catch (error) {
        setAuthComplete(true);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    console.log("📊 État Context FINAL:", {
      user,
      hasUser: !!user,
      hasToken: !!accessToken,
      loading,
      isAuthenticated: !!user,
    });
  }, [user, accessToken, loading]);

const login = async (identifiant, password) => {
  try {
    const data = await loginAPI({ identifiant, password });
    
    console.log("🔍 User data reçu:", data.user);
    
    // 🎯 VÉRIFICATION IMMÉDIATE après login réussi
    if (data.user.mustChangePassword) {
      console.log("🔄 Redirection immédiate - Changement obligatoire");
      
      // Stocker les données avant redirection (important !)
      updateAccessToken(data.accessToken);
      setUser(data.user);
      
      // Redirection immédiate
      navigate('/change-password');
      return { requirePasswordChange: true };
    }

    // Login normal - navigation selon le rôle
    updateAccessToken(data.accessToken);
    setUser(data.user);
    
    // Navigation normale selon le rôle
    switch (data.user.role) {
      case "it": navigate("/it"); break;
      case "rh": navigate("/rh"); break;
      case "manager": navigate("/manager"); break;
      case "conseiller": navigate("/sommaire"); break;
      default: navigate("/"); break;
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Erreur logout:", error);
    }
    // Nettoyage Context dans tous les cas
    updateAccessToken(null);
    setUser(null);
  };

  return (
    <Authcontext.Provider
      value={{
        user,

        accessToken,
        loading,
        authComplete,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default Authcontext;
