//context pour It
//gestion de la collection user pour la création

import { createContext, useState, useContext} from "react";


import {createUser, getAllUser, resetPassword, toggleActive, changeRole} from '../services/userServices'

const UsersContext = createContext();

 

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  
 
 const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUser();
    
      setUsers(data.users);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers(prev => [...prev, newUser]);
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
      setUsers(prev => prev.map(u => 
        u.identifiant === identifiant ? updatedUser : u
      ));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const changeUserRole = async (identifiant, newRole, reason) => {
    try {
      const updatedUser = await changeRole(identifiant, newRole, reason);
      setUsers(prev => prev.map(u => 
        u.identifiant === identifiant ? updatedUser : u
      ));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  return (
    <UsersContext.Provider value={{
      users,
      loading,
      error,
      fetchAllUsers,
      createNewUser,
      // Actions IT spécialisées
      resetUserPassword,
      toggleUserActive,
      changeUserRole
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};

export default UsersContext