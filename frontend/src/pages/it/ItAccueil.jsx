import { useNavigate,  } from "react-router-dom";
import {useState, useEffect} from 'react'
import Loading from "../../Component/Loading";
import Error from "../../Component/Error";

import PageLayout from "../../Component/PageLayout/PageLayout";
import { useCurrentUser } from "../../Hook/profilCurrentUser";

import { useUsers } from "../../contexts/UsersContext";

import './itcss.css'

function It() {
  const navigate = useNavigate();
  const { profilLoading, error, nom , prenom, identifiant, role} = useCurrentUser();

  


  const { fetchAllUsers } = useUsers();
  const [listUser, setListUser] = useState();
  const [listUserObtenu, setListUserObtenu]=useState(false)
  





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

  function ListUserShow(){
    if(listUserObtenu!==false){
      console.log(listUser.count)
      for(let i=0; i<listUser.count; i++){
       console.log(listUser.identifiants[i], listUser.role[i],listUser.isActive[i])
       // tentative de faire un table de chaque [utilisateur1(actif, role), utilisateur2{actif,role}]
      }

      return (
       <div> deplier

            {/* <table>
        <tr>
              <td>
          {  listUser.identifiants.map((identifants
            )=>
                <h1>{identifants}</h1>

            )}
          </td>
          <td>
           { listUser.role.map((role
            )=>
                <h1>{role}</h1>

            )}
          </td>
   
            </tr>
       </table>  */}
       </div>
   
            
          
          

         
            
          
        
     
        
      )
    }



  }


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
          <h2>{nom} {prenom} </h2>
          <p>identifiant : {identifiant}</p>
          <p>Role : {role}</p>
        </div>

        <div className="card">
          <h2>Actions rapides</h2>
          <button onClick={() => navigate("/it/create")}>
            Créer un compte
          </button>
          <button onClick={() => OnclicktgeAllUser()}>
            liste de utilisateur
          </button>
        </div>
        <div>
          <ListUserShow/>
        </div>
      </div>
    </PageLayout>
  );
}

export default It;
