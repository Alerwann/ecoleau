// A refactoriser pour que la liste des profils fonctionne

import { useNavigate } from "react-router-dom";

function ListShow({ listUsers }) {
  const navigate = useNavigate();
  
  if (!listUsers) {
    return <div>Aucune donnée disponible</div>;
  }


  let usersToDisplay = [];
  
  if (Array.isArray(listUsers)) {
   
    usersToDisplay = listUsers;
  } else if (listUsers.identifiants) {
   
    usersToDisplay = listUsers.identifiants.map((identifiant, index) => ({
      identifiant: identifiant,
      userId: listUsers.userId[index],
      role: listUsers.role[index],
      isActive: listUsers.isActive[index] ? "oui" : "non"
    }));
  }


const modification =(user)=>{
  navigate('/it/modification', {state: {userData: user}})
}

  return (
    <div>
      <p>Nombre d'utilisateurs : {usersToDisplay.length}</p>
      {usersToDisplay.map((user, index) => (
        <div key={user.identifiant || index} className="card user">
          <div>
            <h3>Identifiant : {user.identifiant}</h3>
            <h3>Role : {user.role}</h3>
            <h3>Id d'utilisateur : {user.userId}</h3>
          </div>
          <div>
            <h3>Actif : {user.isActive}</h3>
          </div>
          <button 
            onClick={() => modification({
              isActive: user.isActive, 
              identifiant: user.identifiant,
              action:'acces'
            })}
          >
           Modifier l'accès
          </button>
          <button
          onClick={()=>modification({
            identifiant: user.identifiant,
            role: user.role,
            action: 'role'
          })}
          >Modifier le role</button>
        </div>
      ))}
    </div>
  );
}export default ListShow