// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Ou votre gestionnaire d'état

const ProtectedRoute = () => {
  const { accessToken } = useSelector((state) => state.auth); // Adaptez à votre store

  if (!accessToken) {
    // Redirige vers /login si non authentifié
    return <Navigate to="/login" replace />;
  }

  // Affiche la route enfant si authentifié
  return <Outlet />;
};

export default ProtectedRoute;