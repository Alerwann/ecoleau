import { useNavigate } from "react-router-dom";

import { useCurrent } from "../../Hook/userCurrent";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { useCurrentUser } from "../../Hook/profilCurrentUser";

function It() {
  const navigate = useNavigate();
  const { profil } = useCurrentUser();
  const { identifiant, Users } = useCurrent();

  console.log("context utilisateur", identifiant, Users, profil);

  // if (profilLoading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <Error message={error} title="Mon Profil" />;
  // }

  return (
    <PageLayout
      title="Dashboard IT"
      subtitle="Gestion des comptes utilisateurs"
    >
      <div className="dashboard-grid">
        <div className="card">
          <h2>Utilisateurs</h2>
          {/* <p>{profils} comptes</p> */}
        </div>

        <div className="card">
          <h2>Actions rapides</h2>
          <button onClick={() => navigate("/it/create")}>
            Créer un compte
          </button>
          {/* <button onClick={()=>getProfils()} >liste de utilisateur</button> */}
        </div>
      </div>
    </PageLayout>
  );
}

export default It;
