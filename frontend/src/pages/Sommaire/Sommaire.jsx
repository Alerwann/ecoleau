import "./Sommaire.css";

import { useNavigate } from "react-router-dom";

import Loading from "../../Component/Loading";
import Error from "../../Component/Error";

import { logout } from "../../services/authServices";

import { useUser } from "../../Hook/useUser";

function Sommaire() {
 

  const navigate = useNavigate();

  const {
    
    currentUserDetails, 
    loading, 
    error, 
  } = useUser();

  const handlelogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Erreur logout:", err);
    }
    navigate("/accueil");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  if (!currentUserDetails) {
    return <div>Aucune donnée utilisateur</div>;
  }

  return (
    <div className="contenairp">
      <div className="welcome-message">
       
        <div>
          <h1>Sommaire</h1>

       
          {currentUserDetails ? (
            <div>
              <h2>
                Bonjour {currentUserDetails.prenom} {currentUserDetails.nom}
              </h2>
              <p>Bienvenue sur votre espace personnel</p>
            </div>
          ) : (
            <div>
              <p>Chargement de vos informations...</p>
            </div>
          )}
        </div>
 
      </div>
      <h1>
        Tu veux te déconnecter?
      </h1>
      <button onClick={handlelogout}>déconnecté</button>
    </div>
  );
}
export default Sommaire;
