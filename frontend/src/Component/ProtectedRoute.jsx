import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Authcontext from "../contexts/Authcontext";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(Authcontext);

  if (loading) {
    return <Loading />; // Spinner pendant vérification
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log("route protégée");
  return children;
};

export default ProtectedRoute;
