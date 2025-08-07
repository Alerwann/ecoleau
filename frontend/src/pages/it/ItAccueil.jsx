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

  useEffect(() => {
    console.log(listUser, "liste des users jj", );
    console.log(nom, 'identifiant')
  }, [listUser,nom ,prenom]);


  const OnclicktgeAllUser = async () => {
    try {
      const liste = await fetchAllUsers();
      setListUser(liste);
    } catch (error) {
      console.error(error, "on va y arriver");
    }finally{setListUserObtenu(true)}
  };

  function ListUserShow(){
    if(listUserObtenu!==false){
      return (
        <div className="tabusers">
          <div>
          {  listUser.identifiants.map(((identifants
            )=>
                <h1>{identifants}</h1>

            ))}
          </div>
          <div>
           { listUser.role.map(((role
            )=>
                <h1>{role}</h1>

            ))}
          </div>
            
          
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
