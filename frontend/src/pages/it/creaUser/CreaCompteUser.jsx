import PageLayout from "../../../Component/PageLayout/PageLayout";
import { useProfilsWithoutAccount } from "../../../Hook/userProfilsWithoutAccount";

import Loading from "../../../Component/general/Loading";
import Error from "../../../Component/general/Error";
import ProfilsList from "./ProfilList";
import BackButton from "../../../Component/general/BackButton";

import { getSubtitle } from "../../../fonctionUtilitaire/getSubtitle";
function CreaCompteUser() {
  const { profils, loading, error } = useProfilsWithoutAccount();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  return (
    <PageLayout
      title="Création de compte"
      subtitle={getSubtitle("creationUser")}
      service="Service Technique"
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
          <BackButton chemin="/it" />
        </div>
      </div>
    </PageLayout>
  );
}

export default CreaCompteUser;
