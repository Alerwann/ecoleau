import { createContext, useState, useEffect } from "react";
import userApi from "../services/userServices";
import { getOneUser } from "../services/userServices"; 
import { useAuth } from "./Authcontext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentUserDetails, setCurrentUserDetails] = useState(null);

  const { user, isAuthenticated } = useAuth();

  const getAll = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await userApi.get("/user/users");
      console.log("Users récupérés:", response.data);
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur getAll:", error);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated || !user?.identifiant) {
        setCurrentUserDetails(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("🔍 Récupération des détails pour:", user.identifiant);
        const userData = await getOneUser(user.identifiant);
        setCurrentUserDetails(userData);
        console.log("✅ Détails utilisateur récupérés:", userData);
      } catch (err) {
        console.error("❌ Erreur getOne:", err);
        setError(err.message);
        setCurrentUserDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, isAuthenticated]); // ✅ Plus besoin de getOne dans les dépendances

  return (
    <UserContext.Provider
      value={{
        authUser: user,
        currentUserDetails,
        users,
        loading,
        error,
        getAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
