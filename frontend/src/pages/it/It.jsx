import {  useNavigate } from "react-router-dom";
import { useProfil } from "../../contexts/ProfilContext";
import Loading from "../../Component/Loading";
import Error from "../../Component/Error";
import PageLayout from "../../Component/PageLayout/PageLayout";
import'./it.css'

function It() {
  const navigate = useNavigate()


  const { profilLoading, error } = useProfil();

  if (profilLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }








  return (
    <PageLayout
      title="Dashboard IT"
      subtitle="Gestion des comptes utilisateurs"
    >
      <div className="dashboard-grid">
        <div className="card">
          <h2>Utilisateurs</h2>
          {/* <p>{users.length} comptes</p> */}
        </div>

        <div className="card">
          <h2>Actions rapides</h2>
          <button onClick={()=>navigate('/it/create')} >Créer un compte</button>
          <button>Réinitialiser mot de passe</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default It;
