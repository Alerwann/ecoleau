import "./Sommaire.css";

import { useNavigate } from "react-router-dom";

import Loading from "../../Component/Loading";
import Error from "../../Component/Error";

import { useAuth } from "../../contexts/Authcontext";

import { useProfil} from "../../contexts/ProfilContext";

function Sommaire() {
 
  const { logout,  }= useAuth()

  const navigate = useNavigate();

  const {
    
    currentUserProfil, 
    profilLoading, 
    error, 
  } = useProfil();
  console.log("hello",currentUserProfil)


  const handlelogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Erreur logout:", err);
    }
    navigate("/accueil");
  };

  if (profilLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  if (!currentUserProfil) {
    return <div>Aucune donnée utilisateur</div>;
  }

  return (
    <div className="contenairp">
      <div className="welcome-message">
       
        <div>
          <h1>Sommaire</h1>

       
          {currentUserProfil ? (
            <div>
              <h2>
                Bonjour {currentUserProfil.prenom} {currentUserProfil.nom}
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
