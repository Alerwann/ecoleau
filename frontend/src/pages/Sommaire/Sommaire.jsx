
import PageLayout from "../../Component/PageLayout/PageLayout";

import Loading from "../../Component/general/Loading";
import Error from "../../Component/general/Error";

import { useAuth } from "../../contexts/AuthContext";



function Sommaire() {
 
  const {  loading, error }= useAuth()



  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  return(
    <PageLayout
      title="Accueil Conseiller"
      subtitle="Gestion du suivi"
    >
      <h1>En construction</h1>
    </PageLayout>
  );




  // return (
  //   <div className="contenairp">
  //     <div className="welcome-message">
       
  //       <div>
  //         <h1>Sommaire</h1>

       
  //         {currentUserProfil ? (
  //           <div>
  //             <h2>
  //               Bonjour {currentUserProfil.prenom} {currentUserProfil.nom}
  //             </h2>
  //             <p>Bienvenue sur votre espace personnel</p>
  //           </div>
  //         ) : (
  //           <div>
  //             <p>Chargement de vos informations...</p>
  //           </div>
  //         )}
  //       </div>
 
  //     </div>
  //     <h1>
  //       Tu veux te déconnecter?
  //     </h1>
  //     <button onClick={handlelogout}>déconnecté</button>
  //   </div>
  // );
}
export default Sommaire;
