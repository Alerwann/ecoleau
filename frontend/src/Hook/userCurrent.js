// hooks/useCurrentUser.js
import { useAuth } from '../contexts/Authcontext';
import { useUsers } from '../contexts/UsersContext';

export const useCurrent = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { currentUser, userLoading, users } = useUsers();

  console.log(currentUser, users, 'info dans useCurrent')
  return {
    // Données auth
    identifiant: user?.identifiant,
    role: user?.role,
    isAuthenticated,
    
    // Données profil
   userId : currentUser?.userId,

    
    // États
    loading: authLoading || userLoading,
    
    // Actions
    logout,
    
    // Données complètes
    user,
    Users :users
    
  };
};