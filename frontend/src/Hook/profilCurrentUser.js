// hooks/useCurrentUser.js
import { useAuth } from '../contexts/Authcontext';
import { useProfil } from '../contexts/ProfilContext';

export const useCurrentUser = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { currentUserProfil, profilLoading } = useProfil();

  return {
    // Données auth
    identifiant: user?.identifiant,
    role: user?.role,
    isAuthenticated,
    
    // Données profil
    nom: currentUserProfil?.nom,
    prenom: currentUserProfil?.prenom,
    role: currentUserProfil?.role,
    managerNom: currentUserProfil?.managerNom,
    
    // États
    loading: authLoading || profilLoading,
    
    // Actions
    logout,
    
    // Données complètes
    user,
    profil: currentUserProfil
  };
};