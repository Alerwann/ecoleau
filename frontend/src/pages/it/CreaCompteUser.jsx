import { useState } from "react";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { useProfilsWithoutAccount } from "../../Hook/userProfilsWithoutAccount";
import { useUsers } from "../../contexts/UsersContext";
import Loading from "../../Component/Loading";
import Error from "../../Component/Error";
import ProfilsList from "./ProfilList";

function CreaCompteUser() {
  const { profils, loading, error, refrestch} = useProfilsWithoutAccount();
  const { creatNewUser } = useUsers();

  const [selectedProfil, setSelectedProfil] = useState(null);
  const [isCreating, setIsCreating] = useState(false);



  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }


    const handleCreateAccount = async (accountData) => {
    setIsCreating(true);
    try {
      await creatNewUser({
        ...accountData,
        userId: selectedProfil._id // Liaison avec le profil
      });
      
      // Rafraîchir la liste (le profil créé disparaît de la liste)
      await refrestch;
      setSelectedProfil(null);
      
      alert('Compte créé avec succès !');
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <PageLayout
      title="Création de compte"
      subtitle="Basé sur la liste des comptes en attente"
    >
      <div className="corp-contenaire">
        <div className="listeuser">  <div className="profils-list-section">
          <h2>Profils sans compte</h2>
          <ProfilsList 
            profils={profils}
            selectedProfil={selectedProfil}
            onSelectProfil={setSelectedProfil}
          />
        </div></div>
        <div className="formulaire-contenaire">
          là tu auras directement le formulaire de saisie
        </div>
        <div className="bouton-nav">
          <button>retour</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default CreaCompteUser;
