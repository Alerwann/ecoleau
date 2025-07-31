import { createContext, useState, useEffect } from 'react';
import api, { setAccessToken, refreshToken as apiRefreshToken } from '../services/api';


const AuthContext = createContext( );

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null)
  const [loading, setLoading] = useState(true);

const updateAccessToken = (token) => {

  console.log('🔧 updateAccessToken appelé avec:', !!token);

    setAccessTokenState(token);
    setAccessToken(token); // Met à jour api.js
  };
   

  // Au chargement : essayer de récupérer un token
  useEffect(() => {
    const initAuth = async () => {

       console.log('🔄 InitAuth démarré');


      try {
        const response = await apiRefreshToken();

        console.log('✅ Refresh réussi:', response);


        updateAccessToken(response.accessToken);
        setUser(response.user);

        console.log('📊 Après mise à jour - user:', !!response.user, 'token:', !!response.accessToken);


      } catch (error) {
        console.log('❌ Pas de session active:', error);
      
      } finally {
        setLoading(false);
         console.log('✅ Loading terminé');
      }
    };

    initAuth();
  }, []);

useEffect(() => {
  console.log('📊 État Context FINAL:', { 
    hasUser: !!user, 
    hasToken: !!accessToken, 
    loading,
    isAuthenticated: !!user 
  });
}, [user, accessToken, loading]);

  const login = async (identifiant, password) => {
    const response = await api.post('/auth/login', { identifiant, password });
    setAccessToken(response.data.accessToken);
    setUser(response.data.user);
    window.location.href = '/sommaire';
    return response;
  };


  const logout = async () => {
    try {
       await api.post('/auth/logout');
    } catch (error) {
      console.error('Erreur logout:', error);
    }
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      loading,
      login,
      logout,
      isAuthenticated :!!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;