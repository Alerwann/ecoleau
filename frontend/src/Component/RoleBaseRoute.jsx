
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

import { useAuth } from "../contexts/AuthContext";


function RoleBasedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

    console.log('🔍 RoleBasedRoute - Debug:', {
    user,
    userRole: user?.role,
    isAuthenticated,
    loading,
    allowedRoles
  });
  
  // Attendre le chargement de l'auth
  if (loading) {
    return (
      <div >
        <Loading/>
      </div>
    );
  }
  
  // Pas connecté → Redirection login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
   if (!allowedRoles.includes(user?.role)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>🚫 Accès refusé</h2>
        <p>Vous n'avez pas les droits pour accéder à cette section.</p>
        <p><strong>Rôle requis :</strong> {allowedRoles.join(' ou ')}</p>
        <p><strong>Votre rôle :</strong> {user?.role}</p>
        <button onClick={() => window.history.back()}>
          ← Retour
        </button>
      </div>
    );
  }
  
  // Autorisé → Afficher le contenu
  return children;
}

export default RoleBasedRoute;