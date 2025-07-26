import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/auth';

// 1. Création du contexte
const AuthContext = createContext();

// 2. Provider (fournit les données aux composants enfants)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Chargement de l'utilisateur au démarrage
  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser(); // Appel API pour vérifier le token
      setUser(user);
      setLoading(false);
    };
    loadUser();
  }, []);

  // 4. Fonction de déconnexion
  const handleLogout = () => {
    logout(); // Supprime le token du localStorage
    setUser(null); // Met à jour l'état global
  };

  // 5. Valeurs partagées
  const value = {
    user,
    loading,
    isAuthenticated: !!user, // Booléen pour vérifier la connexion
    logout: handleLogout,
    setUser // Permet de mettre à jour l'user après login
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 6. Hook personnalisé pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}