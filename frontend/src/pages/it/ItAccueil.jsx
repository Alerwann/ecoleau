import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Component/general/Loading";
import Error from "../../Component/general/Error";
import PageLayout from "../../Component/PageLayout/PageLayout";
import ActionCard from "../../Component/ActionCard";
import { useCurrentUser } from "../../Hook/useCurrentUser";

import { useUsers } from "../../contexts/UsersContext";

import ListUserShow from "../../Component/Listshow";
import { getSubtitle } from "../../fonctionUtilitaire/getSubtitle";

function It() {
  const navigate = useNavigate();
  const { profilLoading, error } = useCurrentUser();
  const { users, fetchAllUsers } = useUsers();
  const [listUser, setListUser] = useState([]);

  
  const [listUserObtenu, setListUserObtenu] = useState(false);
  const itButtons = [
    {
      label: "Créer un compte",
      onClick: () => navigate("/it/create"),
    },
    {
      label: "Liste des utilisateurs",
      onClick: () => OnclicktgetAllUser(),
    },
  ];

  function ListUser() {
    if (listUserObtenu === true && listUser) {
      return <ListUserShow listUsers={users} />;
    }
    return null;
  }

  const OnclicktgetAllUser = async () => {
    if (listUserObtenu === false) {
      try {
        const response = await fetchAllUsers();

        // Transformation complète
        const usersArray = response.identifiants.map((identifiant, index) => ({
          identifiant: identifiant,
          rhId: response.rhId[index],
          role: response.role[index],
          isActive: response.isActive[index] ? "oui" : "non",
        }));

        setListUser(usersArray);
      } catch (error) {
        console.error(error);
      } finally {
        setListUserObtenu(true);
      }
    } else {
      setListUserObtenu(false);
    }
  };

  if (profilLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} title="Mon Profil" />;
  }

  return (
    <PageLayout
      title="Dashboard IT"
      subtitle={getSubtitle("gestion")}
      service="Service technique"
      affichenom={true}
     
    >
      <ActionCard title="Actions rapides" buttons={itButtons} />

      <div>
        <ListUser />
      </div>
    </PageLayout>
  );
}

export default It;
