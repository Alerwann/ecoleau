import { useNavigate,  } from "react-router-dom";
import {useState} from 'react'
import Loading from "../../Component/Loading";
import Error from "../../Component/Error";
import PageLayout from "../../Component/PageLayout/PageLayout";
import { useCurrentUser } from "../../Hook/profilCurrentUser";

import { useUsers } from "../../contexts/UsersContext";

import ListUserShow from "../../Component/Listshow";



function It() {
  const navigate = useNavigate();
  const { profilLoading, error, nom , prenom, identifiant, role} = useCurrentUser();

  


  const { fetchAllUsers } = useUsers();
  const [listUser, setListUser] = useState();
  const [listUserObtenu, setListUserObtenu]=useState(false)


function ListUser(){
if(listUserObtenu === true){
  return(<ListUserShow listUsers={[listUser]}/>)


}

}



  const OnclicktgeAllUser = async () => {
    console.log(listUserObtenu)
    if(listUserObtenu===false){
       try {
      const liste = await fetchAllUsers();
      setListUser(liste);
    } catch (error) {
      console.error(error, "on va y arriver");
    }finally{setListUserObtenu(true)}
    }
    else setListUserObtenu(false)
   
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
            liste de utilisateur
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
