//context pour It
//gestion de la collection user pour la création

import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

import {
  createUser,
  getAllUser,

  resetPassword,
  toggleActive,
  changeRole,
} from "../services/userServices";


const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const { user, isAuthenticated, loading, authComplete } = useAuth();

  console.log("🔍 ProfilContext reçoit:", user, {
    user: !!user,
    isAuthenticated,
    loading,
    authComplete,
  });

  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      setUserLoading(true);
      const response = await getAllUser();
      console.log(response, "response");
      setUsers(response);
      return response;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setUserLoading(false);
    }
  };

  
  useEffect(() => {
    console.log("users mis à jour", users);
  }, [users]);

  const createNewUser = async (userData) => {
    console.log('entree dans createNew user')
    try {
      const newUser = await createUser(userData);

      setUsers((prev) => {
        // Vérification que prev est bien un tableau
        if (!Array.isArray(prev)) {
          console.warn(
            "prev n'est pas un tableau, initialisation avec le nouvel utilisateur"
          );
          return [newUser];
        }
        return [...prev, newUser];
      });

      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Actions spécialisées IT
  const resetUserPassword = async (identifiant) => {
    try {
      const result = await resetPassword(identifiant);
      // Pas besoin de mettre à jour la liste, juste retourner le mot de passe temporaire
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const toggleUserActive = async (identifiant, reason) => {
    try {
      const updatedUser = await toggleActive(identifiant, reason);
      setUsers((prev) =>
        prev.map((u) => (u.identifiant === identifiant ? updatedUser : u))
      );
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const changeUserRole = async (identifiant, newRole, reason) => {
    try {
      const updatedUser = await changeRole(identifiant, newRole, reason);
      setUsers((prev) =>
        prev.map((u) => (u.identifiant === identifiant ? updatedUser : u))
      );
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };





  return (
    <UsersContext.Provider
      value={{
        authUser: user,

        users,
        userLoading,
        error,
        fetchAllUsers,
        createNewUser,
        // Actions IT spécialisées
        resetUserPassword,
        toggleUserActive,
        changeUserRole,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export default UsersContext;
