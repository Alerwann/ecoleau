import { useNavigate,  } from "react-router-dom";
import {useState, useEffect} from 'react'
import Loading from "../../Component/general/Loading";
import Error from "../../Component/general/Error";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { useCurrentUser } from "../../Hook/useCurrentUser";

import { useUsers } from "../../contexts/UsersContext";

import ListUserShow from "../../Component/Listshow";



function It() {
  const navigate = useNavigate();
  const { profilLoading, error, nom , prenom, identifiant, role} = useCurrentUser();
  const { users, fetchAllUsers } = useUsers();
  const [listUser, setListUser] =useState([])
  


 
  // const [listUser, setListUser] = useState();
  const [listUserObtenu, setListUserObtenu]=useState(false)




function ListUser(){
if(listUserObtenu === true&& listUser){
  return(<ListUserShow listUsers={users} />)


}return(null)

}



const OnclicktgeAllUser = async () => {
  if (listUserObtenu === false) {
    try {
      const response = await fetchAllUsers();
      
      // Transformation complète
      const usersArray = response.identifiants.map((identifiant, index) => ({
        identifiant: identifiant,
        userId: response.userId[index],
        role: response.role[index],
        isActive: response.isActive[index] ? "oui" : "non" 
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


  useEffect(() => {
    if (listUserObtenu) {
      OnclicktgeAllUser(); // Recharger la liste
    }
  }, []);

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
        <div className="card profil">
          <h2>{nom} {prenom} </h2>

          <h2>Identifiant : {identifiant}</h2>
          
            <h2>Role : {role}</h2>
        
        </div>

        <div className="card action">
          <div><h2>Actions rapides</h2></div>
          
          <div className="choiceButton">
             <button onClick={() => navigate("/it/create")}>
            Créer un compte
          </button>
          <button onClick={() => OnclicktgeAllUser()}>
            Liste des utilisateurs
          </button>
          </div>
         
        </div>
        <div>
          <ListUser />
        </div>
      </div>
    </PageLayout>
  );
}

export default It;
