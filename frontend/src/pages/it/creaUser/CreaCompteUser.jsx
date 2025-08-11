import PageLayout from "../../../Component/PageLayout/PageLayout";
import { useProfilsWithoutAccount } from "../../../Hook/userProfilsWithoutAccount";
import{useNavigate} from 'react-router'
import Loading from "../../../Component/Loading";
import Error from "../../../Component/Error";
import ProfilsList from "./ProfilList";

function CreaCompteUser() {
  const { profils, loading, error } = useProfilsWithoutAccount();
  const navigate =useNavigate()

  const onclickRetour =()=>{
    navigate('/it')
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  return (
    <PageLayout
      title="Création de compte"
      subtitle="Basé sur la liste des comptes en attente"
    >
      <div className="corp-contenaire">
        <div className="listeuser">
          {" "}
          <div className="profils-list-section">
            <h2>Profils sans compte</h2>

            <ProfilsList profils={profils} />
          </div>
        </div>

        <div className="bouton-nav">
          <button onClick={onclickRetour}> Retour</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default CreaCompteUser;
