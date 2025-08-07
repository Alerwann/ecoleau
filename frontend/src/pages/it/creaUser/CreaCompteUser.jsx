import PageLayout from "../../../Component/PageLayout/PageLayout";
import { useProfilsWithoutAccount } from "../../../Hook/userProfilsWithoutAccount";


import Loading from "../../../Component/Loading";
import Error from "../../../Component/Error";
import ProfilsList from "./ProfilList";
import { useEffect, useState } from "react";

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
          <button  >test</button>
        </div>
      </div>
    </PageLayout>
  );
}

export default CreaCompteUser;
