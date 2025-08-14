// hooks/useCurrentUser.js
import { useAuth } from "../contexts/AuthContext";
import { useUsers } from "../contexts/UsersContext";

export const useCurrent = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { currentUser, userLoading, users } = useUsers();

  console.log(currentUser, users, "👀info dans useCurrent");
  return {
    // Données auth
    identifiant: user?.identifiant,
    role: user?.role,
    isAuthenticated,

    // Données profil
    rhId: currentUser?.rhId,

    // États
    loading: authLoading || userLoading,

    // Actions
    logout,

    // Données complètes
    user,
    Users: users,
  };
};
