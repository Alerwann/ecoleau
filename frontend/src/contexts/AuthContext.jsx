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
      updateAccessToken(data.accessToken);
      setUser(data.user);
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
    <AuthContext.Provider
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
