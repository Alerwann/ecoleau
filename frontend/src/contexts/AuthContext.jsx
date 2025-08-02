import { createContext, useState, useEffect, useContext } from "react";
import {
  setAccessToken,
  userAuthentification as apiuserAuthentification,
  loginAPI,
  logoutAPI,
} from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateAccessToken = (token) => {
    console.log("🔧 updateAccessToken appelé avec:", !!token);

    setAccessTokenState(token);
    setAccessToken(token); // Met à jour api.js
  };

  // Au chargement : essayer de récupérer un token
  useEffect(() => {
    const initAuth = async () => {
      console.log("🔄 InitAuth démarré");

      try {
        const response = await apiuserAuthentification();

        console.log("✅ Refresh réussi:", response);

        updateAccessToken(response.accessToken);
        setUser(response.user);

        console.log(
          "📊 Après mise à jour - user:",
          !!response.user,
          "token:",
          !!response.accessToken
        );
      } catch (error) {
        console.log("❌ Pas de session active:", error);
      } finally {
        setLoading(false);
        console.log("✅ Loading terminé");
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    console.log("📊 État Context FINAL:", {
      hasUser: !!user,
      hasToken: !!accessToken,
      loading,
      isAuthenticated: !!user,
    });
  }, [user, accessToken, loading]);

  // ✅ CORRIGÉE dans AuthContext
  const login = async (identifiant, password) => {
    try {
      const data = await loginAPI({ identifiant, password });
      updateAccessToken(data.accessToken);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error("❌ Erreur login:", error);
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
    <AuthContext.Provider
      value={{
        user,

        accessToken,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthContext;
